// 'use server'

// import prisma from "@/lib/prisma"
// import bcrypt from 'bcrypt'
// import jwt from 'jsonwebtoken'
// import { getUserbyUsername } from "@/actions/user/user"

// const jwtsecret = process.env.JWT_SECRET

// export const generateToken = async (username: string, password: string) => {
//     try {

//         const user = await getUserbyUsername(username);

//         if (!user || !(await bcrypt.compare(password, user.password))) {
//             throw new Error("Invalid Credentials.")
//         }

//         const token = jwt.sign({ userId: user.id, username: user.username, email: user.email, role: user.role }, "secret",
//             { expiresIn: '24hr' });

//         await prisma.arh_authtoken.create({
//             data: {
//                 token,
//                 userId: user.id
//             }
//         })

//         return token

//     } catch (error: any) {
//         console.log(error.message)
//         throw new Error(error.message)
//     }
// }