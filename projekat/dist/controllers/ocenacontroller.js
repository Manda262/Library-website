"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OcenaController = void 0;
const ocena_1 = __importDefault(require("../models/ocena"));
class OcenaController {
    constructor() {
        this.getAllOcene = (req, res) => {
            ocena_1.default.find({}, (err, rasp) => {
                if (err)
                    console.log(err);
                else
                    res.json(rasp);
            });
        };
        this.dodajOcenu = (req, res) => {
            let ocena = new ocena_1.default({
                username: req.body.username,
                idKnjige: req.body.idKnjige,
                ocena: req.body.ocena,
                komentar: req.body.komentar,
                datum: req.body.datum
            });
            ocena.save((err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.izbrisiOceneKnjige = (req, res) => {
            let idKnjige = req.body.idKnjige;
            ocena_1.default.deleteMany({ 'idKnjige': idKnjige }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.izbrisiOceneCitaoca = (req, res) => {
            let username = req.body.username;
            ocena_1.default.deleteMany({ 'username': username }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
    }
}
exports.OcenaController = OcenaController;
//# sourceMappingURL=ocenaController.js.map