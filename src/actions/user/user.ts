'use server';

import prisma from '@/lib/prisma';
import { SignUpType, UserType } from '@/types/user.type';
import bcrypt from 'bcrypt'
import nodemailer from "nodemailer"
import { randomUUID } from "crypto"
import { NextResponse } from 'next/server';

export const createUser = async (values: UserType) => {
    try {
        const urole = "USER"
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(values.password, saltRounds)

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
                firstname: values.firstname,
                lastname: values.lastname,
                cid: values.cid,
                email: values.email,
                tel: values.tel,
                role: urole,
            }
        })

        return result;
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const updateUser = async (id: any, values: UserType) => {
    try {
        const hashedPassword = await bcrypt.hash(values.password, 10)

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

        const updateResult = await prisma.arh_user.update({
            where: {
                id: id
            },
            data: {
                username: values.username,
                password: hashedPassword,
                firstname: values.firstname,
                lastname: values.lastname,
                cid: values.cid,
                email: values.email,
                tel: values.tel,
            }
        })
        return updateResult
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const deleteUser = async (id: number) => {
    try {
        const userpost = await userPost(id)
        if (userpost) {
            throw new Error('ไม่สามารถลบได้ เนื่องจากมีการใช้งานอยู่')
        }

        const deleteResult = await prisma.arh_user.delete({
            where: {
                id: id
            },
        })
        return deleteResult
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const getUser = async () => {
    try {
        const getResult = await prisma.arh_user.findMany({
            orderBy: {
                id: "asc"
            }
        })

        return getResult
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const getAdmin = async () => {
    try {
        const getAdminResult = await prisma.arh_user.findMany({
            where: {
                role: "ADMIN"
            },
            orderBy: {
                id: "asc"
            }
        })

        return getAdminResult
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const getUserbyId = async (id: any) => {
    try {
        const getbyIdResult = await prisma.arh_user.findMany({
            where: {
                id: id
            }
        })

        if (getbyIdResult.length > 0) {
            return getbyIdResult
        } else {
            throw new Error('No Data Found')
        }

    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const getUserbyUsername = async (username: string) => {
    try {
        const getUsername = await prisma.arh_user.findUnique({
            where: {
                username: username
            },
        })
        return getUsername;
    } catch (error: any) {
        console.log(error.message)
        throw new Error(error.message)
    }
}

export const getUserbyEmail = async (email: string) => {
    try {
        const getEmail = await prisma.arh_user.findUnique({
            where: {
                email: email
            },
        })
        return getEmail;
    } catch (error: any) {
        console.log(error.message)
        throw new Error(error.message)
    }
}

export const getUserbyCid = async (cid: string) => {
    try {
        const getCid = await prisma.arh_user.findUnique({
            where: {
                cid: cid
            },
        })
        return getCid;
    } catch (error: any) {
        console.log(error.message)
        throw new Error(error.message)
    }
}

export const userPost = async (id: number) => {
    try {
        const getPost = await prisma.arh_content.findMany({
            where: {
                userId: id
            }
        })
        console.log(getPost)
        return getPost;
    } catch (error: any) {
        console.log(error.message)
        throw new Error(error.message)
    }
}