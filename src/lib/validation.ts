import { z } from "zod";

export const orderSchema = z.object({
  templateSlug: z.string().min(1, "Pick a template"),
  musicOption: z.enum(["with", "without"]),
  customerName: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Enter a valid email"),
  whatsapp: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s-]{10,15}$/, "Enter a valid WhatsApp number"),
  recipientName: z.string().trim().min(2, "Who is this for?").max(80),
  occasionDate: z.string().min(1, "Pick the occasion date"),
  message: z.string().trim().min(5, "Write a short message").max(1500),
  photoLinks: z.string().max(2000).optional(),
  company: z.string().max(0).optional(), // honeypot
});

export type OrderInput = z.infer<typeof orderSchema>;
