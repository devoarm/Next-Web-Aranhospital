import { z } from "zod";

export const ContentSchema = z.object({
    title: z.string().min(1, { message: "กรุณากรอกชื่อเรื่อง" }),
    description: z.string(),
    files: z.string(),
    images: z.string(),
    categoryId: z.number(),
    published: z.boolean(),
}).strict();

export interface ContentType {
    id: number
    title: string
    description: string
    files: string
    images: string
    published: boolean
    viewCount: number
    userId: number
    user: any
    categoryId: number
    category: any
    createdAt: string
    updatedAt: string
}

export const defaultContent = {
    title: "",
    description: "",
    files: "",
    images: "",
    // userId: ,
    categoryId: 1,
    published: true,
    // createdAt: "",
    // updatedAt: "",
};