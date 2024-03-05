'use server';

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ContentSchema } from "@/types/content.type";
import { getCurrentUser, getUserId } from "@/lib/session";
import { z } from "zod";

function validateSchema(data: z.infer<typeof ContentSchema>) {
    try {
        const parseData = ContentSchema.parse(data);
        return parseData;
    } catch (error: any) {
        if (error.issues && error.issues.length > 0) {
            const validationErrors = error.issues.map((issue: any) => ({
                path: issue.path.join('.'),
                message: issue.message
            }))
            throw new Error(JSON.stringify(validationErrors, null, 2))
        } else {
            throw new Error("Invalid Schema")
        }
    }
}

export const createContents = async (userId: any, values: z.infer<typeof ContentSchema>) => {
    const session = await getCurrentUser()
    // let userId = await getUserId()
    try {
        if (!session?.user.username) {
            return NextResponse.json({ message: 'Not Authenticated!' }, { status: 401 })
        }

        const { title, description, files, images, published, categoryId } = values;

        const createdContent = await prisma.arh_content.create({
            data: {
                title,
                description,
                files,
                images,
                categoryId,
                userId,
                published,
            }
        })

        return createdContent
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const getAllContent = async () => {
    try {
        const getContentResult = await prisma.arh_content.findMany({
            where: {
                published: true,
            },
            orderBy: {
                createdAt: "desc"
            },
            include: {
                user: {
                    select: {
                        firstname: true,
                        lastname: true,
                    }
                },
                category: {
                    select: {
                        id: true,
                        name: true,
                    },
                }
            }
        })

        return getContentResult
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const getContentPagination = async (request: Request) => {
    try {
        const url = new URL(request.url)
        const pgnum = +(url.searchParams.get("pgnum") ?? 0)
        const pgsize = +(url.searchParams.get("pgsize") ?? 3)

        const result = await prisma.arh_content.findMany({
            where: {
                published: true
            },
            orderBy: {
                createdAt: "desc"
            },
            skip: pgnum * pgsize,
            take: pgsize,
        })

        return result
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const getIndexContent = async (limit: any) => {
    try {
        const getContentResult = await prisma.arh_content.findMany({
            take: 3,
            where: {
                published: true,
            },
            orderBy: {
                createdAt: "desc"
            },
            include: {
                user: {
                    select: {
                        firstname: true,
                        lastname: true,
                    }
                },
                category: {
                    select: {
                        id: true,
                        name: true,
                    },
                }
            }
        })

        return getContentResult
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const ViewCount = async (id: any) => {
    try {
        await prisma.arh_content.update({
            where: {
                id: id,
                published: true
            },
            data: {
                viewCount: {
                    increment: 1,
                },
            },
        });
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const getContentbyId = async (id: any) => {
    try {
        const getContentbyIdResult = await prisma.arh_content.findMany({
            where: {
                id: id,
                published: true
            },
            include: {
                user: {
                    select: {
                        username: true,
                        firstname: true,
                        lastname: true,
                    },
                },
                category: {
                    select: {
                        id: true,
                        name: true,
                    },
                }
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

export const getContentCategorybyId = async (id: any) => {
    try {
        const getContentCategorybyIdResult = await prisma.arh_content.findMany({
            where: {
                categoryId: id,
                published: true,
            },
            orderBy: {
                createdAt: "desc"
            },
            include: {
                user: {
                    select: {
                        username: true,
                        firstname: true,
                        lastname: true,
                    },
                },
                category: {
                    select: {
                        id: true,
                        name: true,
                    },
                }
            }
        })

        if (getContentCategorybyIdResult.length > 0) {
            return getContentCategorybyIdResult
        } else {
            throw new Error('No Data Found')
        }

    } catch (error: any) {
        throw new Error(error.message)
    }
}


export const updateContent = async (id: any, userId: any, data: z.infer<typeof ContentSchema>) => {
    try {
        const { title, description, published, files, images } = data
        const update_content = await prisma.arh_content.update({
            where: {
                id: id,
                userId: userId,
            },
            data: {
                title: title,
                description: description ? description : null,
                published: published,
                files: files ? files : null,
                images: images ? images : null,
            }
        })

        return update_content


    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const deleteContent = async (id: number, userId: number) => {
    try {
        const deleteResult = await prisma.arh_content.delete({
            where: {
                id: id,
                userId: userId,
            },
        })
        return deleteResult
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const deleteCon = async (id: number, userId: number) => {

    await prisma.arh_content.delete({
        where: {
            id: id,
            userId: userId,
        },
    })
    revalidatePath(`/content/${userId}`)

}
