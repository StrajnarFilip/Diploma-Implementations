import { PrismaClient } from "@prisma/client";
import { Express } from "express"
import { TextComment } from "../../models/TextComment";
import { bigIntToNumber, getUser, prismaClient } from "../../utility";

export async function postComment(app: Express) {
    app.post("/comment", async (req, res) => {
        const newComment: {
            postId: number,
            content: string,
        } = req.body

        const user = await getUser(req)
        if (user) {
            const createdComment = await prismaClient.comment.create({
                data: {
                    content: newComment.content,
                    user_iduser: user.id,
                    post_idpost: newComment.postId,
                }
            })

            if (createdComment.post_idpost !== null && createdComment.user_iduser !== null) {
                const reshapedComment: TextComment = {
                    idcomment: bigIntToNumber(createdComment.idcomment),
                    content: createdComment.content,
                    postIdpost: bigIntToNumber(createdComment.post_idpost),
                    userIduser: bigIntToNumber(createdComment.user_iduser)
                }
                res.json(reshapedComment)
            }
            else {
                res.status(400).json({ error: "Created comment is invalid" })
            }
        }
        else {
            res.status(400).json({ error: "User not found" })
        }
    })

}