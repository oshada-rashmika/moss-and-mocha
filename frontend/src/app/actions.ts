"use server";

import { query } from "@/lib/db";
import { Resend } from "resend";
import { z } from "zod";

export interface FeaturedProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  subCategory: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
}

export async function getFeaturedProducts(): Promise<FeaturedProduct[]> {
  try {
    const result = await query(
      `SELECT id, name, price, image, "subCategory" 
       FROM "Product" 
       WHERE "isSpecial" = true 
       ORDER BY "createdAt" DESC 
       LIMIT 3;`
    );
    return result.rows;
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}

export async function getReviews(): Promise<Review[]> {
  try {
    const result = await query(
      `SELECT id, name, rating, comment FROM "Review" ORDER BY "createdAt" DESC;`
    );
    return result.rows;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
}

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.email("Please enter a valid email address."),
  message: z.string().trim().min(10, "Please share a little more detail."),
});

export type ContactActionState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function submitContactInquiry(
  _prevState: ContactActionState,
  formData: FormData
): Promise<ContactActionState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Please review the form fields.",
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Missing RESEND_API_KEY.");
    return {
      status: "error",
      message: "Messaging is temporarily unavailable. Please try again shortly.",
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { name, email, message } = parsed.data;

    await resend.emails.send({
      from: "Moss & Mocha <onboarding@resend.dev>",
      to: "damien.desilvar@gmail.com",
      replyTo: email,
      subject: `New Moss & Mocha Inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Georgia, serif; color: #1A1A1A; line-height: 1.6;">
          <h2 style="margin-bottom: 8px;">New Inquiry - Moss & Mocha</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p style="margin-top: 16px;"><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br />")}</p>
        </div>
      `,
    });

    return {
      status: "success",
      message: "Message sent. We will be in touch soon.",
    };
  } catch (error) {
    console.error("Failed to send contact inquiry:", error);
    return {
      status: "error",
      message: "Could not send your message. Please try again in a moment.",
    };
  }
}
