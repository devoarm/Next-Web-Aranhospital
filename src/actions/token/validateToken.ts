import jwt from "jsonwebtoken";


export const validateToken = async (token: any) => {
    try {
        const jwtsecret: any = process.env.JWT_SECRET
        let errorMessage;
        const decodedToken = jwt.verify(token, jwtsecret,
        function (err: any, decoded: any) {
            if (err) {
                throw new Error(err.message)
            } else {
                return decoded
            }

        });

        return decodedToken
        
    } catch (error: any) {
        throw new Error(error.message)
    }
}