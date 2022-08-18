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
exports.getPostComments = void 0;
const utility_1 = require("../../utility");
function getPostComments(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.get("/post-comments/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const postId = parseInt(req.params.id);
            const comments = yield utility_1.prismaClient.comment.findMany({
                where: {
                    post_idpost: {
                        equals: postId
                    }
                }
            });
            const reshapedComments = comments.map(comment => {
                if (comment.idcomment !== null &&
                    comment.post_idpost !== null &&
                    comment.user_iduser !== null) {
                    return {
                        idcomment: (0, utility_1.bigIntToNumber)(comment.idcomment),
                        content: comment.content,
                        postIdpost: (0, utility_1.bigIntToNumber)(comment.post_idpost),
                        userIduser: (0, utility_1.bigIntToNumber)(comment.user_iduser)
                    };
                }
                else {
                    throw new Error("Entity cannot be processed.");
                }
            });
            res.json(reshapedComments);
        }));
    });
}
exports.getPostComments = getPostComments;
