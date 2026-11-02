"use client";
import { useTransition } from "react";
import { updateOrderStatus } from "@/app/actions/admin";
import { ORDER_STATUSES, type OrderStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const TONE: Record<OrderStatus, string> = {
  New: "bg-butter",
  "In progress": "bg-lilac",
  Delivered: "bg-sage",
};

export function StatusSelect({ id, status }: { id: string; status: OrderStatus }) {
  const [pending, start] = useTransition();
  return (
    <select
      defaultValue={status}
      disabled={pending}
      aria-label="Order status"
      onChange={(e) => start(() => updateOrderStatus(id, e.target.value as OrderStatus))}
      className={cn("rounded-full px-3 py-1.5 text-xs font-medium outline-none", TONE[status], pending && "opacity-60")}
    >
      {ORDER_STATUSES.map((s) => <option key={s}>{s}</option>)}
    </select>
  );
}
