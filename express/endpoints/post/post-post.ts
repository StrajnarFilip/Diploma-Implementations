import { PrismaClient } from "@prisma/client";
import { Express } from "express"
import { IdResponse } from "../../models/IdResponse";
import { TextNode } from "../../models/Text";
import { bigIntToNumber, userIsAdmin ,prismaClient} from "../../utility";

export async function postPost(app: Express) {
    app.post("/post", async (req, res) => {
        if (!userIsAdmin(req)) {
            res.status(401).json({ error: "User is not admin." })
            return
        }

        const newPost: { title: string } = req.body

        const createdPost = await prismaClient.post.create({
            data: {
                title: newPost.title
            }
        })

        if (createdPost) {
            const response: IdResponse = {
                id: bigIntToNumber(createdPost.idpost)
            }

            res.json(response)
        }
        else {
            res.status(409).json({ error: "Failed to create new post" })
        }
    })

}