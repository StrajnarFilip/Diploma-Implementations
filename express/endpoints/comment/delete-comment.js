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
exports.deleteComment = void 0;
const utility_1 = require("../../utility");
function deleteComment(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.delete("/comment/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = yield (0, utility_1.getUser)(req);
            const commentId = parseInt(req.params.id);
            if (!user) {
                res.status(404).json({ error: "User not found." });
                return;
            }
            const toDelete = yield utility_1.prismaClient.comment.findFirst({
                where: {
                    user_iduser: user.id,
                    idcomment: commentId
                }
            });
            if (toDelete && toDelete.user_iduser &&
                user.id == (0, utility_1.bigIntToNumber)(toDelete.user_iduser)) {
                const deleted = yield utility_1.prismaClient.comment.delete({
                    where: {
                        idcomment: toDelete.idcomment
                    }
                });
                const response = {
                    id: (0, utility_1.bigIntToNumber)(deleted.idcomment)
                };
                res.json(response);
            }
        }));
    });
}
exports.deleteComment = deleteComment;
