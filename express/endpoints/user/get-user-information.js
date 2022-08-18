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
exports.getUserInformation = void 0;
const utility_1 = require("../../utility");
function getUserInformation(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.get("/user-information", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = yield (0, utility_1.getUser)(req);
            if (user) {
                res.json(user);
            }
            else {
                res.status(404).json({ error: "Entity not found" });
            }
        }));
    });
}
exports.getUserInformation = getUserInformation;
