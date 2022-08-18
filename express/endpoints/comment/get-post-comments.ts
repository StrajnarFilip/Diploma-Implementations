import { PrismaClient } from "@prisma/client";
import { Express } from "express"
import { TextComment } from "../../models/TextComment";
import { bigIntToNumber,prismaClient } from "../../utility";

export async function getPostComments(app: Express) {
    app.get("/post-comments/:id", async (req, res) => {
        const postId = parseInt(req.params.id)
        const comments = await prismaClient.comment.findMany({
            where: {
                post_idpost: {
                    equals: postId
                }
            }
        })

        const reshapedComments: TextComment[] = comments.map(comment => {
            if (comment.idcomment !== null &&
                comment.post_idpost !== null &&
                comment.user_iduser !== null) {
                return {
                    idcomment: bigIntToNumber(comment.idcomment),
                    content: comment.content,
                    postIdpost: bigIntToNumber(comment.post_idpost),
                    userIduser: bigIntToNumber(comment.user_iduser)
                }
            } else {
                throw new Error("Entity cannot be processed.")
            }
        })

        res.json(reshapedComments)
    })
}