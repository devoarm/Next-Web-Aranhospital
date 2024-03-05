import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import { randomUUID } from "crypto"
import { z } from "zod"
import nodemailer from "nodemailer"


const ForgetPasswordSchema = z.object({
    email: z.string().email().refine(value => !!value, {
        message: "Email is mandatory and should be a valid email address",
    })
})

export async function POST(request: Request) {
    const data = await request.json()
    const { email } = data
    if (ForgetPasswordSchema.safeParse(data).success === false) {
        return NextResponse.json({ status: 401, results: "อีเมลไม่ถูกต้อง" })
    }

    const userExist = await prisma.arh_user.findUnique({
        where: {
            email
        }
    })

    if (!userExist) {
        return NextResponse.json({ status: 400, results: "ไม่พบผลลัพธ์ใดๆ จากการค้นหาของคุณ โปรดลองอีกครั้ง" })
    }


    // const transport = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: process.env.USER_MAIL,
    //         pass: process.env.USER_PASSWORD
    //     }
    // })

    // const transporter = nodemailer.createTransport({
    //     service: 'hotmail',
    //     auth: {
    //         user: process.env.USER_MAIL,
    //         pass: process.env.USER_PASSWORD
    //     }
    // });

    try {
        const forgetPasswordToken = await prisma.arh_user.update({
            where: {
                email
            },
            data: {
                forgetpasswordtoken: `${randomUUID()}${randomUUID()}`.replace(/-/g, ''),
            }
        })

        // const mailOptions = {
        //     from: process.env.USER_MAIL,
        //     to: userExist.email as string,
        //     subject: "Password change request",
        //     html: `<a href="${process.env.NEXT_URL}/passwordchange/${forgetPasswordToken.forgetpasswordtoken}">Click here to change your password</a>`
        // }

        // transport.verify(function (error, success) {
        //     if (error) {
        //         console.log(error)
        //     } else {
        //         console.log("Server is good to send email")
        //     }
        // })

        // transporter.verify(function (error, success) {
        //     if (error) {
        //         console.log(error)
        //     } else {
        //         console.log("Server is good to send email")
        //     }
        // })

        // await transport.sendMail(mailOptions)
        // await transporter.sendMail(mailOptions)

        return NextResponse.json({ status: 200, results: "ส่งรีเซ็ตรหัสผ่านไปยังอีเมลของคุณแล้ว" })
    } catch (error: any) {
        return NextResponse.json({ status: 500, results: "ไม่สำเร็จ" })
    }
}

export async function PATCH(request: Request) {
    const { token, newpassword } = await request.json()
    
    try {
        const userExist = await prisma.arh_user.findFirst({
            where: {
                forgetpasswordtoken: token
            }
        })

        if (!userExist) {
            return NextResponse.json({ status: 400, results: "ข้อมูลไม่ถูกต้องกรุณาส่งคำขออีกครั้ง" })
        }
        
        const saltRounds = 10;
        const hashednewpassword = await bcrypt.hash(newpassword, saltRounds)

        const changedpassword = await prisma.arh_user.update({
            where: {
                id: userExist.id
            },
            data: {
                password: hashednewpassword,
                forgetpasswordtoken: null
            }
        })

        return NextResponse.json({ status: 200, results: "รีเซ็ตรหัสผ่านสำเร็จ" })
    } catch (error: any) {
        return NextResponse.json({ status: 500, results: "พบข้อผิดพลาดภายในเซิฟเวอร์" })
    }
}
