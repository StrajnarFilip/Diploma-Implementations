import { PrismaClient } from "@prisma/client";
import { Express } from "express"
import { UserInfo } from "../../models/UserInfo";
import { bigIntToNumber, getUser } from "../../utility";

export async function getUserInformation(app: Express) {
    app.get("/user-information", async (req, res) => {
        const user = await getUser(req)

        if (user) {
            res.json(user)
        }
        else {
            res.status(404).json({ error: "Entity not found" })
        }
    })
}