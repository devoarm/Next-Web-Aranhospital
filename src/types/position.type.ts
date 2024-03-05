import { z } from "zod";

export const positionSchema = z.object({
    name: z.string().min(1, { message: "กรุณากรอกตำแหน่ง" }).trim(),
    active: z.boolean(),
});

export interface PositionType {
    name: string;
    active: boolean;
}

export const defaultPosition: PositionType = {
    name: "",
    active: true,
};
