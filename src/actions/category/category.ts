'use server';

import prisma from '@/lib/prisma';
import { CategoryType } from '@/types/category.type';

export const createCategory = async (contentData: CategoryType) => {
    try {
        const { name, active = true } = contentData;

        const existing = await existingCategorybyName(name)
        if (existing) {
            throw new Error("มีข้อมูลนี้แล้วในระบบ")
        } 

        const createPositionResult = await prisma.arh_category.create({
            data: {
                name,
                active,
            }
        })
        return createPositionResult;


    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const getCategory = async () => {
    try {
        const getPositionResult = await prisma.arh_category.findMany({
            where: {
                active: true
            },
            orderBy: {
                id: "asc"
            }
        })

        return getPositionResult
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const getAllCategory = async () => {
    try {
        const getCategoryResult = await prisma.arh_category.findMany({
            orderBy: {
                id: "asc"
            }
        })

        return getCategoryResult
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const getCategorybyId = async (id: any) => {
    try {
        const getCategorybyIdResult = await prisma.arh_category.findMany({
            where: {
                id: id
            }
        })

        if (getCategorybyIdResult.length > 0) {
            return getCategorybyIdResult
        } else {
            throw new Error('No Data Found')
        }

    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const existingCategorybyName = async (name: string) => {
    try {
        const getContentbyNameResult = await prisma.arh_category.findMany({
            where: {
                name: name
            }
        })

        if (getContentbyNameResult.length > 0) {
            return getContentbyNameResult
        } 

    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const updateCategory = async (id: any, contentData: CategoryType) => {
    try {
        const { name, active } = contentData
        const updateResult = await prisma.arh_category.update({
            where: {
                id: id
            },
            data: {
                name: name,
                active: active,
            }
        })
        return updateResult
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const deleteCategory = async (id: number) => {
    try {
        const deleteResult = await prisma.arh_category.delete({
            where: {
                id: id
            },
        })
        return deleteResult
    } catch (error: any) {
        throw new Error(error.message)
    }
}