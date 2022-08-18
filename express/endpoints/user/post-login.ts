import { PrismaClient } from "@prisma/client";
import { Express } from "express"
import { computeHash, randomToken,prismaClient } from "../../utility"

export interface LoginRequest {
    email?: string | null;
    password?: string | null;
}


export async function postLogin(app: Express) {
    app.post("/login", async (req, res) => {
        const requestBody: LoginRequest | undefined = req.body
        if (requestBody && requestBody.password && requestBody.email) {
            const userHashedPassword = await passwordFromDb(requestBody.email)
            if (computeHash(requestBody.password) === userHashedPassword) {
                const newToken = await randomToken();
                saveNewToken(requestBody.email, newToken)
                res.json({ text: newToken })
            }
        }
        else {
            res.status(400).json({ error: "Login request is invalid." })
        }
    })
}

async function saveNewToken(userEmail: string, token: string) {
    await prismaClient.user.updateMany({
        data: {
            cookie: token
        }, where: {
            email: userEmail
        }
    })
}

async function passwordFromDb(userEmail: string): Promise<string | undefined> {
    const user = await prismaClient.user.findFirst({
        select: {
            password: true,
        },
        where: {
            email: {
                equals: userEmail
            }
        }
    })
    return user?.password
}


