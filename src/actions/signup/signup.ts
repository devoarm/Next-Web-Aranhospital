'use server';

import prisma from '@/lib/prisma';
import { SignUpType, UserType } from '@/types/user.type';
import bcrypt from 'bcrypt'
import nodemailer from "nodemailer"
import { randomUUID } from "crypto"
import { NextResponse } from 'next/server';
import { getUserbyCid, getUserbyEmail, getUserbyUsername } from '../user/user';

export const signUp = async (values: SignUpType) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(values.password, saltRounds)
        const urole = "USER"

        // var transport = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         user: process.env.USER_MAIL,
        //         pass: process.env.USER_PASSWORD
        //     }
        // })

        const existingUsername = await getUserbyUsername(values.username)

        if (existingUsername) {
            throw new Error('ชื่อผู้ใช้งานนี้ถูกใช้งานแล้ว')
        }

        const existingEmail = await getUserbyEmail(values.email)

        if (existingEmail) {
            throw new Error('อีเมลนี้ถูกใช้งานแล้ว')
        }

        const existingCid = await getUserbyCid(values.cid)

        if (existingCid) {
            throw new Error('เลขบัตรประชาชนนี้ถูกใช้งานแล้ว')
        }

        const result = await prisma.arh_user.create({
            data: {
                username: values.username,
                password: hashedPassword,
                cid: values.cid,
                email: values.email,
                // firstname: values.firstname,
                // lastname: values.lastname,
                // tel: values.tel,
                // role: urole,
            }
        })

        // const verificationtoken = await prisma.arh_activateToken.create({
        //     data: {
        //         token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ''),
        //         userId: result.id
        //     }
        // })

        // const options = {
        //     from: process.env.USER_MAIL,
        //     to: result.email as string,
        //     subject: "Verify you email",
        //     html: `<a href="${process.env.NEXT_URL}/api/activate/${verificationtoken.token}">Click here to verify your email</a>`
        // }

        // transport.verify(function (error, success) {
        //     if (error) {
        //         console.log(error)
        //     } else {
        //         console.log("Server is good to send email")
        //     }
        // })

        // await transport.sendMail(options)

        return result;
    } catch (error: any) {
        throw new Error(error.message)
    }
}
