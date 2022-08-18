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
exports.getSegments = void 0;
const utility_1 = require("../../utility");
function getSegments(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.get("/post-segments/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const postId = parseInt(req.params.id);
            const segments = yield utility_1.prismaClient.segment.findMany({
                where: {
                    post_idpost: {
                        equals: postId
                    }
                }
            });
            const reshapedSegments = segments.map(segment => {
                return {
                    idsegment: (0, utility_1.bigIntToNumber)(segment.idsegment),
                    postIdpost: (0, utility_1.bigIntToNumber)(segment.post_idpost),
                    type: segment.type,
                    text: segment.text || "",
                    source: segment.source || "",
                };
            });
            res.json(reshapedSegments);
        }));
    });
}
exports.getSegments = getSegments;
