import { PrismaClient } from "@prisma/client";
import { Express } from "express"
import { IdResponse } from "../../models/IdResponse";
import { NewSegment } from "../../models/NewSegment";
import { Segment } from "../../models/Segment";
import { bigIntToNumber, getUser, userIsAdmin, prismaClient } from "../../utility";

export async function postSegment(app: Express) {
    app.post("/segment", async (req, res) => {
        if (!userIsAdmin(req)) {
            res.status(401).json({ error: "User is not admin." })
            return
        }

        const newSegment: NewSegment = req.body

        const generatedSegment = await prismaClient.segment.create({
            data: {
                post_idpost: newSegment.postIdpost,
                type: newSegment.type,
                text: newSegment.text,
                source: newSegment.source
            }
        })

        const reshapedSegment: Segment = {
            idsegment: bigIntToNumber(generatedSegment.idsegment),
            postIdpost: bigIntToNumber(generatedSegment.post_idpost),
            type: generatedSegment.type,
            text: generatedSegment.text || "",
            source: generatedSegment.source || ""
        }

        res.json(reshapedSegment)
    })
}