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
exports.postPost = void 0;
const utility_1 = require("../../utility");
function postPost(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.post("/post", (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (!(0, utility_1.userIsAdmin)(req)) {
                res.status(401).json({ error: "User is not admin." });
                return;
            }
            const newPost = req.body;
            const createdPost = yield utility_1.prismaClient.post.create({
                data: {
                    title: newPost.title
                }
            });
            if (createdPost) {
                const response = {
                    id: (0, utility_1.bigIntToNumber)(createdPost.idpost)
                };
                res.json(response);
            }
            else {
                res.status(409).json({ error: "Failed to create new post" });
            }
        }));
    });
}
exports.postPost = postPost;
