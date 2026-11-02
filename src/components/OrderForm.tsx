"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { orderSchema, type OrderInput } from "@/lib/validation";
import { createOrder } from "@/app/actions/order";
import { AnimatedPrice } from "./AnimatedPrice";

export type OrderTemplate = {
  slug: string;
  title: string;
  with_music_price: number;
  without_music_price: number;
};

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="label">{label}</label>
      {children}
      {error && <p role="alert" className="mt-1 text-xs text-maroon">{error}</p>}
    </div>
  );
}

export function OrderForm({
  templates,
  defaultSlug,
  defaultMusic,
}: {
  templates: OrderTemplate[];
  defaultSlug: string;
  defaultMusic: "with" | "without";
}) {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<OrderInput>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      templateSlug: defaultSlug,
      musicOption: defaultMusic,
      customerName: "",
      email: "",
      whatsapp: "",
      recipientName: "",
      occasionDate: "",
      message: "",
      photoLinks: "",
      company: "",
    },
  });

  const slug = watch("templateSlug");
  const music = watch("musicOption");
  const t = templates.find((x) => x.slug === slug);
  const price = t ? (music === "with" ? t.with_music_price : t.without_music_price) : 0;

  const onSubmit = async (values: OrderInput) => {
    setServerError("");
    const res = await createOrder(values);
    if (res.ok) router.push(`/order/success?id=${res.id}`);
    else setServerError(res.error);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card space-y-5 p-5 sm:p-8" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Template" error={errors.templateSlug?.message}>
          <select className="input" {...register("templateSlug")}>
            {templates.map((x) => <option key={x.slug} value={x.slug}>{x.title}</option>)}
          </select>
        </Field>
        <Field label="Music option" error={errors.musicOption?.message}>
          <select className="input" {...register("musicOption")}>
            <option value="with">With Music</option>
            <option value="without">Without Music</option>
          </select>
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your name" error={errors.customerName?.message}>
          <input className="input" autoComplete="name" {...register("customerName")} />
        </Field>
        <Field label="Your email" error={errors.email?.message}>
          <input className="input" type="email" autoComplete="email" inputMode="email" {...register("email")} />
        </Field>
        <Field label="WhatsApp number" error={errors.whatsapp?.message}>
          <input className="input" type="tel" autoComplete="tel" inputMode="tel" placeholder="+91 98765 43210" {...register("whatsapp")} />
        </Field>
        <Field label="Who is it for?" error={errors.recipientName?.message}>
          <input className="input" placeholder="Their name" {...register("recipientName")} />
        </Field>
        <Field label="Occasion date" error={errors.occasionDate?.message}>
          <input className="input" type="date" {...register("occasionDate")} />
        </Field>
      </div>

      <Field label="Your message for them" error={errors.message?.message}>
        <textarea className="input min-h-[130px]" placeholder="Write what you would say to them in person." {...register("message")} />
      </Field>

      <Field label="Photo links (optional, one per line)" error={errors.photoLinks?.message}>
        <textarea className="input min-h-[90px]" placeholder="Google Drive or Instagram links" {...register("photoLinks")} />
      </Field>

      {/* honeypot: hidden from people, bots fill it */}
      <input type="text" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" {...register("company")} />

      {serverError && <p role="alert" className="rounded-xl bg-coral/15 px-4 py-3 text-sm text-maroon">{serverError}</p>}

      <div className="flex items-center justify-between gap-4 border-t border-charcoal/5 pt-5">
        <div>
          <div className="text-xs text-charcoal/60">Total</div>
          <AnimatedPrice value={price} className="font-display text-3xl" />
        </div>
        <button type="submit" disabled={isSubmitting} className="btn-dark px-8 py-4">
          {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Placing order</> : "Place order"}
        </button>
      </div>
      <p className="text-center text-xs text-charcoal/50">No payment now. We will share payment details after confirming your order.</p>
    </form>
  );
}
