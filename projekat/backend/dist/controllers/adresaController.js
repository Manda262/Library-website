"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdresaController = void 0;
const adresa_1 = __importDefault(require("../models/adresa"));
class AdresaController {
    constructor() {
        this.getAllAdrese = (req, res) => {
            adresa_1.default.find({}, (err, adrese) => {
                if (err)
                    console.log(err);
                else
                    res.json(adrese);
            });
        };
        this.dodajAdresu = (req, res) => {
            let adresa = new adresa_1.default({
                id: req.body.id,
                ulica: req.body.ulica,
                broj: req.body.broj,
                grad: req.body.grad
            });
            adresa.save((err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
    }
}
exports.AdresaController = AdresaController;
//# sourceMappingURL=adresaController.js.map