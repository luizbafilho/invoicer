import { z } from "zod/v4";

const PartySchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
});

const ItemSchema = z.object({
  description: z.string().min(1, "Description is required"),
  quantity: z.number().positive("Quantity must be positive"),
  unit_price: z.number().nonnegative("Unit price must be non-negative"),
});

export const InvoiceConfigSchema = z.object({
  from: PartySchema,
  bill_to: PartySchema,
  items: z.array(ItemSchema).min(1, "At least one item is required"),
  due_days: z.number().int().positive("Due days must be a positive integer"),
  notes: z.string().optional(),
});

export type InvoiceConfig = z.infer<typeof InvoiceConfigSchema>;
export type Party = z.infer<typeof PartySchema>;
export type Item = z.infer<typeof ItemSchema>;
