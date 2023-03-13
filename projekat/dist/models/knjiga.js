"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Knjiga = new Schema({
    id: {
        type: Number
    },
    naziv: {
        type: String
    },
    autori: {
        type: Array
    },
    zanrovi: {
        type: Array
    },
    izdavac: {
        type: String
    },
    godina: {
        type: String
    },
    jezik: {
        type: String
    },
    slika: {
        type: String
    }
});
exports.default = mongoose_1.default.model('KnjigaModel', Knjiga, 'knjiga');
//# sourceMappingURL=knjiga.js.map