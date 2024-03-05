import { z } from "zod";

export const PrefixSchema = z.object({
    name: z.string().min(1, { message: "กรุณากรอกคำนำหน้า" }).trim(),
    active: z.boolean(),
});

export interface PrefixType {
    id: number;
    name: string;
    active: boolean;
}

export const defaultPrefix = {
    name: "",
    active: "",
  };