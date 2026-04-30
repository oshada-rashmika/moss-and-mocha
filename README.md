# Moss & Mocha: A Biophilic E-Commerce Experience

Moss & Mocha is a high-fidelity, full-stack e-commerce platform for a botanical cafe, blending a passion for artisanal coffee with indoor greenery. Built using a modern "Vibe-First" development stack, it features a nature-inspired biophilic design and a secure backend architecture tailored for the Sri Lankan market.

![Moss & Mocha Hero Section](placeholder-hero-screenshot.png)

## 🌿 The Stack

* **Frontend:** Next.js & Tailwind CSS (UI/UX architected via Google Stitch).
* **Backend:** NestJS (Structured logic via Claude).
* **ORM/Database:** Prisma & PostgreSQL.
* **Payments:** PayHere API integration with MD5 signature verification.

## ✨ Key Features

* **Biophilic UI:** A sage-green and terracotta design system featuring leaf-overlay hero sections and a floating cart drawer.
    * ![Biophilic UI / Cart Drawer](placeholder-ui-screenshot.png)
* **Dual-Category Menu:** Integrated CRUD operations for "Brews" (coffee) and "Botanicals" (plants).
    * ![Dual-Category Menu](placeholder-menu-screenshot.png)
* **Secure Checkout:** MD5-hashed transaction security ensuring tamper-proof payment processing.
* **Webhook Integration:** Automated order status updates via PayHere's `notify_url` for real-time payment validation.
* **Order Tracking:** A "Success" page featuring plant-care tips and a live "Brewing" status tracker.
    * ![Order Tracking & Success Page](placeholder-tracking-screenshot.png)