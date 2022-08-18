import { PrismaClient } from "@prisma/client";
import { Express } from "express"
import { IdResponse } from "../../models/IdResponse";
import { Segment } from "../../models/Segment";
import { bigIntToNumber, getUser, userIsAdmin, prismaClient } from "../../utility";

export async function getSegments(app: Express) {
    app.get("/post-segments/:id", async (req, res) => {
        const postId = parseInt(req.params.id)

        const segments = await prismaClient.segment.findMany({
            where: {
                post_idpost: {
                    equals: postId
                }
            }
        })

        const reshapedSegments: Segment[] = segments.map(segment => {
            return {
                idsegment: bigIntToNumber(segment.idsegment),
                postIdpost: bigIntToNumber(segment.post_idpost),
                type: segment.type,
                text: segment.text || "",
                source: segment.source || "",
            }
        })

        res.json(reshapedSegments)
    })
}