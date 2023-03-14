"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZaduzenjeController = void 0;
const zaduzenje_1 = __importDefault(require("../models/zaduzenje"));
class ZaduzenjeController {
    constructor() {
        this.getAllZaduzenja = (req, res) => {
            zaduzenje_1.default.find({}, (err, zaduzenja) => {
                if (err)
                    console.log(err);
                else
                    res.json(zaduzenja);
            });
        };
        this.dodajZaduzenje = (req, res) => {
            let zaduzenje = new zaduzenje_1.default({
                username: req.body.username,
                idKnjige: req.body.idKnjige,
                datumZaduzenja: req.body.datumZaduzenja,
                rokVracanja: req.body.rokVracanja,
                datumVracanja: req.body.datumVracanja,
            });
            zaduzenje.save((err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "message": "ok" });
            });
        };
        this.razduziKnjigu = (req, res) => {
            let idKnjige = req.body.idKnjige;
            let username = req.body.username;
            let datumVracanja = req.body.datumVracanja;
            zaduzenje_1.default.updateOne({ 'idKnjige': idKnjige, 'username': username }, { $set: { 'datumVracanja': datumVracanja } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': "ok" });
            });
        };
        this.izbrisiZaduzenjeKnjige = (req, res) => {
            let idKnjige = req.body.idKnjige;
            zaduzenje_1.default.deleteMany({ 'idKnjige': idKnjige }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.izbrisiZaduzenjeCitaoca = (req, res) => {
            let username = req.body.username;
            zaduzenje_1.default.deleteMany({ 'username': username }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
    }
}
exports.ZaduzenjeController = ZaduzenjeController;
//# sourceMappingURL=zaduzenjeController.js.map