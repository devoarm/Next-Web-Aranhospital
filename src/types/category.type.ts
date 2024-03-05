import { z } from "zod";

export const CategorySchema = z.object({
    name: z.string().min(1, { message: "กรุณากรอกประเภทข่าว" }).trim(),
    active: z.boolean(),
});

export type CategoryType = z.infer<typeof CategorySchema>

export const defaultCategory : CategoryType = {
    name: "",
    active: true,
  };