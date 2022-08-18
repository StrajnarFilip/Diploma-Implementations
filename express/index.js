"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const delete_comment_1 = require("./endpoints/comment/delete-comment");
const get_post_comments_1 = require("./endpoints/comment/get-post-comments");
const post_comment_1 = require("./endpoints/comment/post-comment");
const delete_post_1 = require("./endpoints/post/delete-post");
const get_post_1 = require("./endpoints/post/get-post");
const get_posts_1 = require("./endpoints/post/get-posts");
const post_post_1 = require("./endpoints/post/post-post");
const delete_segment_1 = require("./endpoints/segment/delete-segment");
const get_post_segments_1 = require("./endpoints/segment/get-post-segments");
const post_segment_1 = require("./endpoints/segment/post-segment");
const get_user_information_1 = require("./endpoints/user/get-user-information");
const post_login_1 = require("./endpoints/user/post-login");
const post_logout_1 = require("./endpoints/user/post-logout");
const post_register_1 = require("./endpoints/user/post-register");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
});
// Comments
(0, get_post_comments_1.getPostComments)(app);
(0, post_comment_1.postComment)(app);
(0, delete_comment_1.deleteComment)(app);
// Posts
(0, get_posts_1.getPosts)(app);
(0, get_post_1.getPost)(app);
(0, post_post_1.postPost)(app);
(0, delete_post_1.deletePost)(app);
// Segments
(0, get_post_segments_1.getSegments)(app);
(0, post_segment_1.postSegment)(app);
(0, delete_segment_1.deleteSegment)(app);
// User
(0, post_login_1.postLogin)(app);
(0, post_register_1.postRegister)(app);
(0, get_user_information_1.getUserInformation)(app);
(0, post_logout_1.postLogout)(app);
app.listen(7000, () => { console.log("Listening on http://localhost:7000/"); });
