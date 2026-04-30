"use client";

import React from "react";
import { StitchCartProvider } from "@/context/stitch-cart-context";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <StitchCartProvider>{children}</StitchCartProvider>;
}
