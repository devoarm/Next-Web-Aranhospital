
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: {
            id: number;
            username?: string | null;
            password: string;
            firstname: string;
            lastname: string;
            cid: string;
            email: string;
            tel: string;
            role: string,
            isActive: boolean,
            prefixId: string,
            positionId: string,
            accessToken: string,
            accessTokenExpiry: string,
            refreshToken: string,
        } & DefaultSession["user"]
    }

    interface User extends DefaultUser {
        id: number;
        username?: string | null;
        password: string;
        firstname: string,
        lastname: string,
        cid: string;
        email: string;
        tel: string;
        role: string,
        isActive: boolean,
        prefixId: string,
        positionId: string,
        accessToken: string,
        accessTokenExpiry: string,
        refreshToken: string,
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        idToken?: string
        id: number;
        username?: string | null;
        password: string;
        firstname: string,
        lastname: string,
        cid: string;
        email: string;
        tel: string;
        role: string,
        isActive: boolean,
        prefixId: string,
        positionId: string,
        accessToken: string,
        accessTokenExpiry: string,
        refreshToken: string,
    }
}