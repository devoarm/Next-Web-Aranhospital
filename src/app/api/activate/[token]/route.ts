import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function GET (request: NextRequest, {params}: {params : {token:string}}){
    const {token} = params

    const user = await prisma.arh_user.findFirst({
        where:{
            arh_activateToken:{
                some:{
                    AND:[
                        {
                            activatedAt:null
                        },
                        {createdAt:{
                            gte:new Date(Date.now() - 24*60*60*1000)
                        }},
                        {
                            token
                        }
                    ]
                }
            }
        }
    })


    if(!user){
        throw new Error('Invalid Token')
    }


    await prisma.arh_user.update({
        where:{
            id:user.id
        },
        data:{
            verified_user:true
        }
    })
    
    await prisma.arh_activateToken.update({
        where:{
            token
        },
        data:{
            activatedAt:new Date()
        }
    })

    redirect('/')

    return NextResponse.json('Successfuly verified user')
}