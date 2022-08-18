import { createHash, randomBytes } from "node:crypto"
import { Express } from "express"
import { PrismaClient } from "@prisma/client";
import { UserInfo } from "./models/UserInfo";

export function bigIntToNumber(bigInt: BigInt): number {
    return parseInt(bigInt.toString())
}

export function computeHash(password: string): string {
    const buffer = Buffer.from(password, 'utf8');
    const hash = createHash('sha256');
    hash.update(buffer)
    return hash.digest('hex').toUpperCase()
}

export function randomToken(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        randomBytes(32, (err, buf) => {
            if (err) throw err;
            resolve(buf.toString('hex').toUpperCase())
        });
    })
}

export async function getUser(req: { headers: any }): Promise<UserInfo | null> {
    const userToken = req.headers.authorization
    if (userToken === undefined || userToken.length != 64) {
        return null
    }
    const user = await prismaClient.user.findFirst({
        where: {
            cookie: { equals: userToken }
        }
    })

    if (user !== null) {
        return {
            id: parseInt(user.iduser.toString()),
            email: user.email,
            role: user.role || ""
        }
    } else {
        return null
    }
}

export async function userIsAdmin(req: { headers: any }): Promise<boolean> {
    const user = await getUser(req)
    if (user === null) {
        return false
    }
    else {
        return user.role === "admin"
    }
}

export const prismaClient=new PrismaClient()