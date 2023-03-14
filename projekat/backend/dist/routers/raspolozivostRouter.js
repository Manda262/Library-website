"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const raspolozivostController_1 = require("../controllers/raspolozivostController");
const raspolozivostRouter = express_1.default.Router();
raspolozivostRouter.route('/getAllRaspolozivost').get((req, res) => new raspolozivostController_1.RaspolozivostController().getAllRaspolozivost(req, res));
raspolozivostRouter.route('/updateRaspolozivost').post((req, res) => new raspolozivostController_1.RaspolozivostController().updateRaspolozivost(req, res));
raspolozivostRouter.route('/dodajRaspolozivost').post((req, res) => new raspolozivostController_1.RaspolozivostController().dodajRaspolozivost(req, res));
raspolozivostRouter.route('/izbrisiRaspolozivost').post((req, res) => new raspolozivostController_1.RaspolozivostController().izbrisiRaspolozivost(req, res));
exports.default = raspolozivostRouter;
//# sourceMappingURL=raspolozivostRouter.js.map