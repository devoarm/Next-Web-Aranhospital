'use server';

import prisma from '@/lib/prisma';
import { internalphoneType } from '@/types/internalphone.type';

export const createInternalphone = async (phoneData: internalphoneType) => {
    try {
        const { department, phone, building, floor } = phoneData;
        
        const existingDepartment = await existingInternalphonebyDepartment(department)
        if (existingDepartment) {
            throw new Error("มีแผนกนี้แล้วในระบบ")
        }

        const existingPhone = await existingInternalphonebyPhone(phone)
        if (existingPhone) {
            throw new Error("มีเบอร์นี้แล้วในระบบ")
        }

        const createResult = await prisma.arh_internalphone.create({
            data: {
                department,
                phone,
                building,
                floor,
            }
        })
        return createResult;
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const getInternalphone = async () => {
    try {
        const getResult = await prisma.arh_internalphone.findMany({
            orderBy: {
                createdAt: "asc"
            }
        })

        return getResult
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const getInternalphonebyId = async (id: any) => {
    try {
        const getbyIdResult = await prisma.arh_internalphone.findMany({
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

export const existingInternalphonebyDepartment = async (department: string) => {
    try {
        const getResult = await prisma.arh_internalphone.findMany({
            where: {
                department: department
            }
        })

        if (getResult.length > 0) {
            return getResult
        }

    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const existingInternalphonebyPhone = async (phone: string) => {
    try {
        const getResult = await prisma.arh_internalphone.findMany({
            where: {
                phone: phone
            }
        })

        if (getResult.length > 0) {
            return getResult
        }

    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const updateInternalphone = async (id: any, contentData: internalphoneType) => {
    try {
        const { department, phone, building, floor } = contentData
        const updateResult = await prisma.arh_internalphone.update({
            where: {
                id: id
            },
            data: {
                department,
                phone,
                building,
                floor
            }
        })
        return updateResult
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const deleteInternalphone = async (id: number) => {
    try {
        const deleteResult = await prisma.arh_internalphone.delete({
            where: {
                id: id
            },
        })
        return deleteResult
    } catch (error: any) {
        throw new Error(error.message)
    }
}
