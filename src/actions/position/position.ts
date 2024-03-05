'use server';

import prisma from '@/lib/prisma';
import { PositionType } from '@/types/position.type';

export const createPosition = async (values: PositionType) => {
    try {
        const isActive = true
        const existingName = await getPositionbyName(values.name)
        if (existingName) {
            throw new Error("มีข้อมูลนี้แล้วในระบบ")
        }
        const createPositionResult = await prisma.arh_position.create({
            data: {
                name: values.name,
                active: isActive,
            }
        })
        return createPositionResult;
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const getPosition = async () => {
    try {
        const getPositionResult = await prisma.arh_position.findMany({
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

export const getAllPosition = async () => {
    try {
        const getPositionResult = await prisma.arh_position.findMany({
            orderBy: {
                id: "asc"
            }
        })

        return getPositionResult
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const getPositionbyId = async (id: any) => {
    try {
        const getContentbyIdResult = await prisma.arh_position.findMany({
            where: {
                id: id
            }
        })

        if (getContentbyIdResult.length > 0) {
            return getContentbyIdResult
        } else {
            throw new Error('No Data Found')
        }

    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const getPositionbyName = async (name: any) => {
    try {
        const getContentbyIdResult = await prisma.arh_position.findMany({
            where: {
                name: name
            }
        })

        if (getContentbyIdResult.length > 0) {
            return getContentbyIdResult
        } 

    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const updatePosition = async (id: any, values: PositionType) => {
    try {
        const existingName = await getPositionbyName(values.name)
        if (existingName) {
            throw new Error("มีข้อมูลนี้แล้วในระบบ")
        }
        const updateResult = await prisma.arh_position.update({
            where: {
                id: id
            },
            data: {
                name: values.name,
                active: values.active,
            }
        })
        return updateResult
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const deletePosition = async (id: number) => {
    try {
        const deleteResult = await prisma.arh_position.delete({
            where: {
                id: id
            },
        })
        return deleteResult
    } catch (error: any) {
        throw new Error(error.message)
    }
}