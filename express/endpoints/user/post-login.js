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
exports.postLogin = void 0;
const utility_1 = require("../../utility");
function postLogin(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.post("/login", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const requestBody = req.body;
            if (requestBody && requestBody.password && requestBody.email) {
                const userHashedPassword = yield passwordFromDb(requestBody.email);
                if ((0, utility_1.computeHash)(requestBody.password) === userHashedPassword) {
                    const newToken = yield (0, utility_1.randomToken)();
                    saveNewToken(requestBody.email, newToken);
                    res.json({ text: newToken });
                }
            }
            else {
                res.status(400).json({ error: "Login request is invalid." });
            }
        }));
    });
}
exports.postLogin = postLogin;
function saveNewToken(userEmail, token) {
    return __awaiter(this, void 0, void 0, function* () {
        yield utility_1.prismaClient.user.updateMany({
            data: {
                cookie: token
            }, where: {
                email: userEmail
            }
        });
    });
}
function passwordFromDb(userEmail) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield utility_1.prismaClient.user.findFirst({
            select: {
                password: true,
            },
            where: {
                email: {
                    equals: userEmail
                }
            }
        });
        return user === null || user === void 0 ? void 0 : user.password;
    });
}
