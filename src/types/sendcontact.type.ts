import { z } from 'zod';

export const SendcontactSchema = z.object({
    name: z.string().min(1, { message: "กรุณากรอกชื่อ" }).trim(),
    subject: z.string().min(1, { message: "กรุณากรอกชื่อเรื่อง" }).trim(),
    message: z.string().min(1, { message: "กรุณากรอกรายละเอียด" }).trim(),
    email: z.string().email("กรุณากรอกอีเมลให้ถูกต้อง").trim().toLowerCase().max(50, { message: "กรุณากรอกอีเมล ไม่เกิน 50 ตัวอักษร" }),
    tel: z
        .string()
        .min(10, { message: "กรุณากรอกเบอร์โทรศัพท์ให้ครบถ้วน" })
        .max(10, { message: "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง" })
        .regex(/^[0-9]+$/, { message: "กรุณากรอกเฉพาะ ตัวเลข [0-9]" })
        .trim(),
});

export interface SendcontactType {
    id: string;
    name: string;
    subject: string;
    email: string;
    tel: string;
    message: string;
}

export const defaultSendcontact = {
    name: "",
    subject: "",
    email: "",
    tel: "",
    message: "",
  };

