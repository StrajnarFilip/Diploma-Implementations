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
exports.prismaClient = exports.userIsAdmin = exports.getUser = exports.randomToken = exports.computeHash = exports.bigIntToNumber = void 0;
const node_crypto_1 = require("node:crypto");
const client_1 = require("@prisma/client");
function bigIntToNumber(bigInt) {
    return parseInt(bigInt.toString());
}
exports.bigIntToNumber = bigIntToNumber;
function computeHash(password) {
    const buffer = Buffer.from(password, 'utf8');
    const hash = (0, node_crypto_1.createHash)('sha256');
    hash.update(buffer);
    return hash.digest('hex').toUpperCase();
}
exports.computeHash = computeHash;
function randomToken() {
    return new Promise((resolve, reject) => {
        (0, node_crypto_1.randomBytes)(32, (err, buf) => {
            if (err)
                throw err;
            resolve(buf.toString('hex').toUpperCase());
        });
    });
}
exports.randomToken = randomToken;
function getUser(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const userToken = req.headers.authorization;
        if (userToken === undefined || userToken.length != 64) {
            return null;
        }
        const user = yield exports.prismaClient.user.findFirst({
            where: {
                cookie: { equals: userToken }
            }
        });
        if (user !== null) {
            return {
                id: parseInt(user.iduser.toString()),
                email: user.email,
                role: user.role || ""
            };
        }
        else {
            return null;
        }
    });
}
exports.getUser = getUser;
function userIsAdmin(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield getUser(req);
        if (user === null) {
            return false;
        }
        else {
            return user.role === "admin";
        }
    });
}
exports.userIsAdmin = userIsAdmin;
exports.prismaClient = new client_1.PrismaClient();
