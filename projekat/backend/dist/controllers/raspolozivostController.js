"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RaspolozivostController = void 0;
const raspolozivost_1 = __importDefault(require("../models/raspolozivost"));
class RaspolozivostController {
    constructor() {
        this.getAllRaspolozivost = (req, res) => {
            raspolozivost_1.default.find({}, (err, rasp) => {
                if (err)
                    console.log(err);
                else
                    res.json(rasp);
            });
        };
        this.updateRaspolozivost = (req, res) => {
            let idKnjige = req.body.idKnjige;
            let raspolozivost = req.body.raspolozivost;
            raspolozivost_1.default.updateOne({ 'idKnjige': idKnjige }, { $set: { 'raspolozivost': raspolozivost } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.dodajRaspolozivost = (req, res) => {
            let raspolozivost = new raspolozivost_1.default({
                idKnjige: req.body.idKnjige,
                raspolozivost: req.body.raspolozivost
            });
            raspolozivost.save((err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.izbrisiRaspolozivost = (req, res) => {
            let idKnjige = req.body.idKnjige;
            raspolozivost_1.default.deleteOne({ 'idKnjige': idKnjige }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
    }
}
exports.RaspolozivostController = RaspolozivostController;
//# sourceMappingURL=raspolozivostController.js.map