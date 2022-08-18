import { PrismaClient } from "@prisma/client";
import { Express, json } from "express"
import { IdResponse } from "../../models/IdResponse";
import { TextNode } from "../../models/Text";
import { bigIntToNumber, userIsAdmin, prismaClient } from "../../utility";

export async function deletePost(app: Express) {
    app.delete("/post/:id", async (req, res) => {
        if (!userIsAdmin(req)) {
            res.status(401).json({ error: "User is not admin." })
            return
        }

        try {

            const postId = parseInt(req.params.id)

            await prismaClient.comment.deleteMany({
                where: {
                    post_idpost: postId
                }
            })

            await prismaClient.segment.deleteMany({
                where: {
                    post_idpost: postId
                }
            })

            await prismaClient.post.delete({
                where: {
                    idpost: postId
                }
            })

            res.json({ id: postId })
        }
        catch {
            res.status(409).json({ error: "Failed to create new post" })
        }
    })

}