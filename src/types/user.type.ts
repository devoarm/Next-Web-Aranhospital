import { z } from "zod";

export interface UserType {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  cid: string;
  email: string;
  tel: string;
  role: string;
  // positionId: number;
  // prefixId: number;
  // birthdate: string;
  // isActive: boolean;
  // createdAt: string;
  // updatedAt: string;
}

export const defaultUser: UserType = {
  username: "",
  password: "",
  firstname: "",
  lastname: "",
  cid: "",
  email: "",
  tel: "",
  role: "",
  // positionId: 0,
  // prefixId: 0,
  // birthdate: "",
  // isActive: true,
  // createdAt: "",
  // updatedAt: "",
};

export const defaultSignIn: SignInType = {
  username: "",
  password: "",
};

export const defaultSignUp: SignUpType = {
  username: "",
  password: "",
  confirmpassword: "",
  cid: "",
  email: ""
};

export interface StatePassword {
  password: string;
  showPassword: boolean;
}

export const UserSchema = z.object({
  username: z.string().min(3, { message: "กรุณากรอกชื่อผู้ใช้" }).trim(),
  password: z
    .string()
    .min(4, { message: "กรุณากรอกรหัสผ่าน 4 ตัว" })
    .max(50, { message: "รหัสผ่านต้องไม่เกิน 50 ตัว" })
    .trim(),
  firstname: z.string().min(1, { message: "กรุณากรอกชื่อ" }).trim(),
  lastname: z.string().min(1, { message: "กรุณากรอกนามสกุล" }).trim(),
  cid: z
    .string()
    .min(13, { message: "กรุณากรอกเลขบัตรประชาชน 13 หลัก" })
    .max(13, { message: "กรุณากรอกเลขบัตรประชาชน 13 หลักให้ถูกต้อง" })
    .regex(/^[0-9]+$/, { message: "กรุณากรอกเฉพาะ ตัวเลข [0-9]" })
    .trim(),
  email: z
    .string()
    .email("กรุณากรอกอีเมลให้ถูกต้อง")
    .trim()
    .toLowerCase()
    .max(50, { message: "กรุณากรอกอีเมล ไม่เกิน 50 ตัวอักษร" }),
  tel: z
    .string()
    .min(10, { message: "กรุณากรอกเบอร์โทรศัพท์ให้ครบถ้วน" })
    .max(10, { message: "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง" })
    .regex(/^[0-9]+$/, { message: "กรุณากรอกเฉพาะ ตัวเลข [0-9]" })
    .trim(),
  role: z.string(),
});

export const SignUpSchema = z.object({
  username: z.string()
  .min(3, {message: "กรุณาใส่ชื่อผู้ใช้งาน"})
  .max(50, { message: "ชื่อผู้ใช้งานต้องไม่เกิน 50 ตัวอักษร" }),
  email: z.string().email().refine(value => !!value, {
    message: "Email is mandatory and should be a valid email address"
  }),
  cid: z
    .string()
    .min(13, { message: "กรุณากรอกเลขบัตรประชาชน 13 หลัก" })
    .max(13, { message: "กรุณากรอกเลขบัตรประชาชน 13 หลักให้ถูกต้อง" })
    .regex(/^[0-9]+$/, { message: "กรุณากรอกเฉพาะ ตัวเลข [0-9]" }),
  password: z.string()
    .min(4, { message: "Password must be at least 4 characters" })
    .max(50, { message: "Password must not be more than 50 charaters" })
    .refine(value => !!value, {
      message: "Password is Mandatory"
    }),
  confirmpassword: z.string()
    .min(4, { message: "Password must be at least 4 characters" })
    .max(50, { message: "Password must not be more than 50 charaters" })
    .refine(value => !!value, {
      message: "Password is Mandatory"
    })
}).refine((data) => data.password === data.confirmpassword, {
  message: "Password did not match",
  path: ["confirmpassword"]
})

export const SignInSchema = z.object({
  username: z.string()
    .min(1, { message: "กรุณาใส่ชื่อผู้ใช้งาน" })
    .max(50, { message: "ชื่อผู้ใช้งานต้องไม่เกิน 50 ตัวอักษร" }),
  password: z.string()
    .min(1, { message: "กรุณาใส่รหัสผ่าน" })
    .max(50, { message: "รหัสผ่านต้องไม่เกิน 50 ตัวอักษร" })
    .refine(value => !!value, {
      message: "Password is Mandatory"
    })
})

export const PasswordSchema = z.object({
  password: z.string()
    .min(4, { message: "กรุณากรอกรหัสผ่าน 4 ตัว" })
    .max(50, { message: "รหัสผ่านต้องไม่เกิน 50 ตัว" })
    // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/, 
    // 'Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character (@$!%*?&) and be between 8 to 15 characters long.'
    // )
    .refine(value => !!value, {
      message: "Password is Mandatory"
    }),
  newpassword: z.string()
    .min(4, { message: "กรุณากรอกรหัสผ่าน 4 ตัว" })
    .max(50, { message: "รหัสผ่านต้องไม่เกิน 50 ตัว" })
    // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/, 
    // 'Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character (@$!%*?&) and be between 8 to 15 characters long.'
    // )
    .refine(value => !!value, {
      message: "Password is Mandatory"
    })
}).refine((data) => data.password === data.newpassword, {
  message: "รหัสผ่านไม่ตรงกัน",
  path: ["newpassword"]
})

export type UserSchemaType = z.infer<typeof UserSchema>
export type SignUpType = z.infer<typeof SignUpSchema>
export type SignInType = z.infer<typeof SignInSchema>
export type PasswordType = z.infer<typeof PasswordSchema>
