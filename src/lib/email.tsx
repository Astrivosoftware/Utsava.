import nodemailer from "nodemailer";
import { render } from "@react-email/components";
import { AdminOrderEmail } from "@/components/emails/AdminOrderEmail";
import { CustomerEmail } from "@/components/emails/CustomerEmail";

export type OrderEmailData = {
  orderId: string;
  templateTitle: string;
  musicLabel: string;
  amount: number;
  customerName: string;
  email: string;
  whatsapp: string;
  recipientName: string;
  occasionDate: string;
  message: string;
  photoLinks: string[];
};

const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

/** Sends the admin + customer emails through Gmail SMTP (server only, free). */
export async function sendOrderEmails(d: OrderEmailData) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    console.warn("GMAIL_USER / GMAIL_APP_PASSWORD missing: order saved, emails skipped.");
    return;
  }

  const transporter = nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
  const from = process.env.EMAIL_FROM ?? `Utsava <${user}>`;
  const admin = process.env.ADMIN_EMAIL ?? user;

  const [adminHtml, customerHtml] = await Promise.all([
    render(<AdminOrderEmail {...d} />),
    render(<CustomerEmail {...d} />),
  ]);

  const results = await Promise.allSettled([
    transporter.sendMail({
      from,
      to: admin,
      replyTo: d.email,
      subject: oneLine(`New order: ${d.templateTitle} from ${d.customerName}`),
      html: adminHtml,
    }),
    transporter.sendMail({
      from,
      to: d.email,
      replyTo: admin,
      subject: "Your Utsava order is confirmed",
      html: customerHtml,
    }),
  ]);

  results.forEach((r, i) => {
    if (r.status === "rejected") console.error(`Email to ${i === 0 ? "admin" : "customer"} failed`, r.reason);
  });
}