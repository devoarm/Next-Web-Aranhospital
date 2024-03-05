import { type NextAuthOptions } from "next-auth";
import { randomBytes, randomUUID } from "crypto";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import prisma from "@/lib/prisma";

export const options: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {},
                password: {},
            },
            async authorize(credentials, req) {

                if (!credentials?.username || !credentials?.password) {
                    throw new Error('กรุณากรอกชื่อผู้ใช้งาน กับ รหัสผ่าน')
                }

                const user: any = await prisma.arh_user.findUnique({
                    where: {
                        username: credentials.username,
                        isActive: true
                    }
                });

                if (!user || user?.password === '') {
                    throw new Error('ไม่มีผู้ใช้งานนี้ในระบบ')
                }

                const isValidPassword = await bcrypt.compare(credentials.password, user.password);

                if (!isValidPassword) {
                    throw new Error('รหัสผ่านไม่ถูกต้อง')
                }

                if (user) {
                    return user
                }

                return null
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
        maxAge: 3600, // 60 min
        updateAge: 3600, // 60 min
        // maxAge: 30 * 24 * 60 * 60, // 30 days
        // updateAge: 24 * 60 * 60, // 24 hours

        generateSessionToken: () => {
            return randomUUID?.() ?? randomBytes(32).toString("hex")
        }
    },
    jwt: {
        maxAge: 60 * 60 * 24 * 30,
        async encode({ secret, token }) {
            if (!token) {
                throw new Error('No token to encode');
            }
            return jwt.sign(token, secret);
        },
        async decode({ secret, token }) {
            if (!token) {
                throw new Error('No token to decode');
            }
            const decodedToken = jwt.verify(token, secret);
            if (typeof decodedToken === 'string') {
                return JSON.parse(decodedToken);
            } else {
                return decodedToken;
            }
        }
    },
    pages: {
        signIn: '/signin',
        signOut: '/signout',
        error: '/error',
        // verifyRequest: '/verify-request',
        // newUser: '/signup'
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            const isAllowedToSignIn = true
            if (isAllowedToSignIn) {
                return true
            } else {
                return false
            }
        },
        async redirect({ url, baseUrl }) {
            if (url.startsWith("/")) return `${baseUrl}${url}`
            else if (new URL(url).origin === baseUrl) return url
            console.log('JWT Callback', { baseUrl, url })
            return baseUrl
        },
        async jwt({ token, user }) {
            if (user?.id) {
                token.id = user.id as number
                token.username = user.username
                token.firstname = user.firstname
                token.lastname = user.lastname
                token.cid = user.cid
                token.email = user.email as string
                token.tel = user.tel
                token.isActive = user.isActive
                token.positionId = user.positionId
                token.role = user.role
                token.accessToken = user.accessToken;
                token.accessTokenExpiry = user.accessTokenExpiry;
                token.refreshToken = user.refreshToken;

            }
            // console.log('JWT Callback', {token, user})
            return Promise.resolve(token);
        },
        async session({ session, token, user }) {
            if (session?.user) {
                session.user.id = token.id
                session.user.username = token.username
                session.user.firstname = token.firstname
                session.user.lastname = token.lastname
                session.user.cid = token.cid
                session.user.email = token.email
                session.user.tel = token.tel
                session.user.isActive = token.isActive
                session.user.positionId = token.positionId
                session.user.role = token.role
                session.user.accessToken = token.accessToken;
                session.user.accessTokenExpiry = token.accessTokenExpiry;

            }
            // console.log('Session Callback', {session, token})
            return Promise.resolve(session);
        },
    },
    debug: process.env.NODE_ENV === "production", //"developer", "production", "test"
}
