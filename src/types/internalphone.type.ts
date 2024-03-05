import { z } from "zod";

export const internalphoneSchema = z.object({
    id: z.number(),
    department: z.string().min(1, { message: "กรุณากรอกชื่อแผนก" }).trim(),
    phone: z.string().min(1, { message: "กรุณากรอกเบอร์" }).trim(),
    building: z.string().min(1, { message: "กรุณากรอกตึก" }).trim(),
    floor: z.string().min(1, { message: "กรุณากรอกชั้น" }).trim(),
});

export type internalphoneType = {
    id: number;
    department: string;
    phone: string;
    building: string;
    floor: string;
    // createdAt: Date;
    // updatedAt: Date;
}

export const defaultinternalphone = {
    id: 0,
    department: "",
    phone: "",
    building: "",
    floor: "",
    // createdAt: "",
    // updatedAt: "",
};
