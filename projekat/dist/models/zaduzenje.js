"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Zaduzenje = new Schema({
    username: {
        type: String
    },
    idKnjige: {
        type: Number
    },
    datumZaduzenja: {
        type: String
    },
    rokVracanja: {
        type: String
    },
    datumVracanja: {
        type: String
    }
});
exports.default = mongoose_1.default.model('ZaduzenjeModel', Zaduzenje, 'zaduzenje');
//# sourceMappingURL=zaduzenje.js.map