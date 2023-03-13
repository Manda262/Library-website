"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Adresa = new Schema({
    id: {
        type: Number
    },
    ulica: {
        type: String
    },
    broj: {
        type: Number
    },
    grad: {
        type: String
    }
});
exports.default = mongoose_1.default.model('AdresaModel', Adresa, 'adresa');
//# sourceMappingURL=adresa.js.map