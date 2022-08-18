"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPost = void 0;
const utility_1 = require("../../utility");
function getPost(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.get("/post/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const postId = parseInt(req.params.id);
            const post = yield utility_1.prismaClient.post.findFirst({
                where: {
                    idpost: {
                        equals: postId
                    }
                }
            });
            if (post && post.title) {
                const reshapedPost = {
                    idpost: (0, utility_1.bigIntToNumber)(post.idpost),
                    title: post.title
                };
                res.json(reshapedPost);
            }
            else {
                res.status(404).json({ error: "Entity not found" });
            }
        }));
    });
}
exports.getPost = getPost;
