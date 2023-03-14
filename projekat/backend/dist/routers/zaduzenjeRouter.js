"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zaduzenjeController_1 = require("../controllers/zaduzenjeController");
const zaduzenjeRouter = express_1.default.Router();
zaduzenjeRouter.route('/getAllZaduzenja').get((req, res) => new zaduzenjeController_1.ZaduzenjeController().getAllZaduzenja(req, res));
zaduzenjeRouter.route('/dodajZaduzenje').post((req, res) => new zaduzenjeController_1.ZaduzenjeController().dodajZaduzenje(req, res));
zaduzenjeRouter.route('/razduziKnjigu').post((req, res) => new zaduzenjeController_1.ZaduzenjeController().razduziKnjigu(req, res));
zaduzenjeRouter.route('/izbrisiZaduzenjeKnjige').post((req, res) => new zaduzenjeController_1.ZaduzenjeController().izbrisiZaduzenjeKnjige(req, res));
zaduzenjeRouter.route('/izbrisiZaduzenjeCitaoca').post((req, res) => new zaduzenjeController_1.ZaduzenjeController().izbrisiZaduzenjeCitaoca(req, res));
exports.default = zaduzenjeRouter;
//# sourceMappingURL=zaduzenjeRouter.js.map