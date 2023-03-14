"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ocenaController_1 = require("../controllers/ocenaController");
const ocenaRouter = express_1.default.Router();
ocenaRouter.route('/getAllOcene').get((req, res) => new ocenaController_1.OcenaController().getAllOcene(req, res));
ocenaRouter.route('/dodajOcenu').post((req, res) => new ocenaController_1.OcenaController().dodajOcenu(req, res));
ocenaRouter.route('/izbrisiOceneKnjige').post((req, res) => new ocenaController_1.OcenaController().izbrisiOceneKnjige(req, res));
ocenaRouter.route('/izbrisiOceneCitaoca').post((req, res) => new ocenaController_1.OcenaController().izbrisiOceneCitaoca(req, res));
exports.default = ocenaRouter;
//# sourceMappingURL=ocenaRouter.js.map