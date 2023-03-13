"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controllers/adminController");
const adminRouter = express_1.default.Router();
adminRouter.route('/login').post((req, res) => new adminController_1.AdminController().login(req, res));
adminRouter.route('/promeniBrDana').post((req, res) => new adminController_1.AdminController().promeniBrDana(req, res));
exports.default = adminRouter;
//# sourceMappingURL=adminRouter.js.map