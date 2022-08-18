import { PrismaClient } from "@prisma/client";
import { Express } from "express"
import { IdResponse } from "../../models/IdResponse";
import { bigIntToNumber, getUser, userIsAdmin ,prismaClient} from "../../utility";

export async function deleteComment(app: Express) {
    app.delete("/comment/:id", async (req, res) => {
        const user = await getUser(req)

        const commentId = parseInt(req.params.id)

        if (!user) {
            res.status(404).json({ error: "User not found." })
            return
        }

        const toDelete = await prismaClient.comment.findFirst({
            where: {
                user_iduser: user.id,
                idcomment: commentId
            }
        })

        if (toDelete && toDelete.user_iduser &&
            user.id == bigIntToNumber(toDelete.user_iduser)) {
            const deleted = await prismaClient.comment.delete({
                where: {
                    idcomment: toDelete.idcomment
                }
            })

            const response: IdResponse = {
                id: bigIntToNumber(deleted.idcomment)
            }

            res.json(response)
        }
    })
}