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
exports.postSegment = void 0;
const utility_1 = require("../../utility");
function postSegment(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.post("/segment", (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (!(0, utility_1.userIsAdmin)(req)) {
                res.status(401).json({ error: "User is not admin." });
                return;
            }
            const newSegment = req.body;
            const generatedSegment = yield utility_1.prismaClient.segment.create({
                data: {
                    post_idpost: newSegment.postIdpost,
                    type: newSegment.type,
                    text: newSegment.text,
                    source: newSegment.source
                }
            });
            const reshapedSegment = {
                idsegment: (0, utility_1.bigIntToNumber)(generatedSegment.idsegment),
                postIdpost: (0, utility_1.bigIntToNumber)(generatedSegment.post_idpost),
                type: generatedSegment.type,
                text: generatedSegment.text || "",
                source: generatedSegment.source || ""
            };
            res.json(reshapedSegment);
        }));
    });
}
exports.postSegment = postSegment;
