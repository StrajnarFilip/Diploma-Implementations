import { PrismaClient } from "@prisma/client";
import { Express } from "express"
import { IdResponse } from "../../models/IdResponse";
import { bigIntToNumber, getUser, userIsAdmin, prismaClient } from "../../utility";

export async function deleteSegment(app: Express) {
    app.delete("/segment/:id", async (req, res) => {
        if (!userIsAdmin(req)) {
            res.status(401).json({ error: "User is not admin." })
            return
        }

        const segmentId = parseInt(req.params.id)

        const toDelete = await prismaClient.segment.delete({
            where: {
                idsegment: segmentId
            }
        })

        res.json({ id: segmentId })
    })
}