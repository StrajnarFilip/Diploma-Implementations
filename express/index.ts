import { PrismaClient, Prisma } from "@prisma/client"
import express from "express"
import { deleteComment } from "./endpoints/comment/delete-comment"
import { getPostComments } from "./endpoints/comment/get-post-comments"
import { postComment } from "./endpoints/comment/post-comment"
import { deletePost } from "./endpoints/post/delete-post"
import { getPost } from "./endpoints/post/get-post"
import { getPosts } from "./endpoints/post/get-posts"
import { postPost } from "./endpoints/post/post-post"
import { deleteSegment } from "./endpoints/segment/delete-segment"
import { getSegments } from "./endpoints/segment/get-post-segments"
import { postSegment } from "./endpoints/segment/post-segment"
import { getUserInformation } from "./endpoints/user/get-user-information"
import { postLogin } from "./endpoints/user/post-login"
import { postLogout } from "./endpoints/user/post-logout"
import { postRegister } from "./endpoints/user/post-register"

const app = express()

app.use(express.json())
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Methods", "*")
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "*")
    next()
})

// Comments
getPostComments(app)
postComment(app)
deleteComment(app)

// Posts
getPosts(app)
getPost(app)
postPost(app)
deletePost(app)

// Segments
getSegments(app)
postSegment(app)
deleteSegment(app)

// User
postLogin(app)
postRegister(app)
getUserInformation(app)
postLogout(app)

app.listen(7000, () => { console.log("Listening on http://localhost:7000/") })