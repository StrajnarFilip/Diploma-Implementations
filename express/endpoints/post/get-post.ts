import { PrismaClient } from "@prisma/client";
import { Express } from "express"
import { Post } from "../../models/Post";
import { bigIntToNumber ,prismaClient} from "../../utility";

export async function getPost(app: Express) {
    app.get("/post/:id", async (req, res) => {
        const postId = parseInt(req.params.id)
        const post = await prismaClient.post.findFirst({
            where: {
                idpost: {
                    equals: postId
                }
            }
        })

        if (post && post.title) {
            const reshapedPost: Post = {
                idpost: bigIntToNumber(post.idpost),
                title: post.title
            }

            res.json(reshapedPost)
        }
        else {
            res.status(404).json({ error: "Entity not found" })
        }
    })
}