"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adresaController_1 = require("../controllers/adresaController");
const adresaRouter = express_1.default.Router();
adresaRouter.route('/getAllAdrese').get((req, res) => new adresaController_1.AdresaController().getAllAdrese(req, res));
adresaRouter.route('/dodajAdresu').post((req, res) => new adresaController_1.AdresaController().dodajAdresu(req, res));
exports.default = adresaRouter;
//# sourceMappingURL=adresaRouter.js.map