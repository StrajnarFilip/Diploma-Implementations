import { PrismaClient } from "@prisma/client";
import { Express } from "express"
import { computeHash, randomToken, prismaClient } from "../../utility"

export interface RegisterRequest {
    email: string,
    password: string
}


export async function postRegister(app: Express) {
    app.post("/register", async (req, res) => {
        const requestBody: RegisterRequest | undefined = req.body
        if (requestBody && requestBody.password && requestBody.email) {
            const created = await prismaClient.user.create({
                data: {
                    email: requestBody.email,
                    password: computeHash(requestBody.password)
                }
            })
            res.json({ text: created.email })
        }
        else {
            res.status(400).json({ error: "Login request is invalid." })
        }
    })
}