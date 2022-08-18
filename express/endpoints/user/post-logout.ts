import { PrismaClient } from "@prisma/client";
import { Express } from "express"
import { computeHash, getUser, randomToken,prismaClient } from "../../utility"

export async function postLogout(app: Express) {
    app.post("/logout", async (req, res) => {
        const user = await getUser(req)
        if (user && user.id) {
            const newToken = await randomToken();
            await prismaClient.user.update({
                where: {
                    iduser: user.id
                },
                data: {
                    cookie: ''
                }
            })

            res.json({ text: "OK" })

        }
        else {
            res.status(400).json({ error: "Logout request is invalid." })
        }
    })
}