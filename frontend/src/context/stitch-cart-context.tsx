"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CART_STORAGE_KEY = "stitch-cart:v1";
const FEEDBACK_AUTO_DISMISS_MS = 2600;

type FeedbackTone = "success" | "info" | "warning";
type FeedbackPlacement = "inline" | "floating";
type ViewportSize = "tiny" | "regular" | "ultraWide";

export interface StitchCartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface StitchCartFeedback {
  id: string;
  message: string;
  tone: FeedbackTone;
  placement: FeedbackPlacement;
  viewport: ViewportSize;
}

interface AddToCartInput {
  id: string;
  name: string;
  price: number;
  quantity?: number;
}

interface StitchCartContextValue {
  items: StitchCartItem[];
  itemCount: number;
  subtotal: number;
  feedback: StitchCartFeedback | null;
  addToCart: (item: AddToCartInput) => void;
  removeFromCart: (itemId: string) => void;
  setItemQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  dismissFeedback: () => void;
}

const StitchCartContext = createContext<StitchCartContextValue | undefined>(undefined);

const getViewportSize = (): ViewportSize => {
  if (typeof window === "undefined") {
    return "regular";
  }

  if (window.innerWidth <= 360) {
    return "tiny";
  }

  if (window.innerWidth >= 1800) {
    return "ultraWide";
  }

  return "regular";
};

const buildFeedback = (
  message: string,
  tone: FeedbackTone,
  viewport: ViewportSize
): StitchCartFeedback => ({
  id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
  message,
  tone,
  viewport,
  placement: viewport === "tiny" ? "inline" : "floating",
});

const getInitialItems = (): StitchCartItem[] => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored) as StitchCartItem[];
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((item) => item.quantity > 0);
  } catch (error) {
    console.error("Unable to restore cart from localStorage:", error);
    return [];
  }
};

export function StitchCartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<StitchCartItem[]>(getInitialItems);
  const [feedback, setFeedback] = useState<StitchCartFeedback | null>(null);
  const [viewport, setViewport] = useState<ViewportSize>(getViewportSize);

  useEffect(() => {
    const handleResize = () => setViewport(getViewportSize());
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (!feedback) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setFeedback(null);
    }, FEEDBACK_AUTO_DISMISS_MS);

    return () => window.clearTimeout(timeout);
  }, [feedback]);

  const dismissFeedback = useCallback(() => {
    setFeedback(null);
  }, []);

  const addToCart = useCallback(
    ({ id, name, price, quantity = 1 }: AddToCartInput) => {
      const safeQuantity = Math.max(1, quantity);

      setItems((currentItems) => {
        const existing = currentItems.find((item) => item.id === id);
        if (existing) {
          return currentItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + safeQuantity } : item
          );
        }

        return [...currentItems, { id, name, price, quantity: safeQuantity }];
      });

      setFeedback(buildFeedback(`${name} added to cart`, "success", viewport));
    },
    [viewport]
  );

  const removeFromCart = useCallback(
    (itemId: string) => {
      setItems((currentItems) => {
        const removedItem = currentItems.find((item) => item.id === itemId);
        if (removedItem) {
          setFeedback(buildFeedback(`${removedItem.name} removed`, "info", viewport));
        }
        return currentItems.filter((item) => item.id !== itemId);
      });
    },
    [viewport]
  );

  const setItemQuantity = useCallback(
    (itemId: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(itemId);
        return;
      }

      setItems((currentItems) =>
        currentItems.map((item) => (item.id === itemId ? { ...item, quantity } : item))
      );
      setFeedback(buildFeedback("Cart updated", "info", viewport));
    },
    [removeFromCart, viewport]
  );

  const clearCart = useCallback(() => {
    setItems([]);
    setFeedback(buildFeedback("Cart cleared", "warning", viewport));
  }, [viewport]);

  const itemCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items]
  );

  const value = useMemo<StitchCartContextValue>(
    () => ({
      items,
      itemCount,
      subtotal,
      feedback,
      addToCart,
      removeFromCart,
      setItemQuantity,
      clearCart,
      dismissFeedback,
    }),
    [
      items,
      itemCount,
      subtotal,
      feedback,
      addToCart,
      removeFromCart,
      setItemQuantity,
      clearCart,
      dismissFeedback,
    ]
  );

  return <StitchCartContext.Provider value={value}>{children}</StitchCartContext.Provider>;
}

export const useStitchCart = (): StitchCartContextValue => {
  const context = useContext(StitchCartContext);

  if (!context) {
    throw new Error("useStitchCart must be used within a StitchCartProvider");
  }

  return context;
};
