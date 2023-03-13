"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Ocena = new Schema({
    username: {
        type: String
    },
    idKnjige: {
        type: Number
    },
    ocena: {
        type: Number
    },
    komentar: {
        type: String
    },
    datum: {
        type: String
    }
});
exports.default = mongoose_1.default.model('OcenaModel', Ocena, 'ocena');
//# sourceMappingURL=ocena.js.map