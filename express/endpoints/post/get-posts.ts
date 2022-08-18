import { PrismaClient } from "@prisma/client";
import { Express } from "express"
import { bigIntToNumber,prismaClient } from "../../utility";
import { Post } from "../../models/Post";

export function getPosts(app: Express) {
    app.get("/posts", async (req, res) => {
        const allPosts = await prismaClient.post.findMany({})

        const selected: Post[] = allPosts.map(post => {
            return {
                idpost: bigIntToNumber(post.idpost),
                title: post.title
            }
        })

        res.json(selected)
    })
}