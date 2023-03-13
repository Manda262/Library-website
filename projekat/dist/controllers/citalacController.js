"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CitalacController = void 0;
const citalac_1 = __importDefault(require("../models/citalac"));
class CitalacController {
    constructor() {
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            citalac_1.default.findOne({ 'username': username, 'password': password }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.register = (req, res) => {
            let citalac = new citalac_1.default({
                username: req.body.username,
                password: req.body.password,
                ime: req.body.ime,
                prezime: req.body.prezime,
                adresa: req.body.adresa,
                telefon: req.body.telefon,
                email: req.body.email,
                tip: req.body.tip,
                slika: 'http://localhost:4000/uploads/' + req.body.slika
            });
            citalac.save((err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "message": "ok" });
            });
        };
        this.azurirajSliku = (req, res) => {
            let username = req.body.username;
            let slika = 'http://localhost:4000/uploads/' + req.body.slika;
            citalac_1.default.updateOne({ 'username': username }, { $set: { 'slika': slika } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.getAllCitaoce = (req, res) => {
            citalac_1.default.find({}, (err, citaoci) => {
                if (err)
                    console.log(err);
                else
                    res.json(citaoci);
            });
        };
        this.promeniSifru = (req, res) => {
            let username = req.body.username;
            let newPassword = req.body.password;
            citalac_1.default.updateOne({ 'username': username }, { $set: { 'password': newPassword } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.updateCitaoca = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            let ime = req.body.ime;
            let prezime = req.body.prezime;
            let adresa = req.body.adresa;
            let telefon = req.body.telefon;
            let email = req.body.email;
            let tip = req.body.tip;
            citalac_1.default.updateOne({ 'username': username }, { $set: { 'password': password, 'ime': ime, 'prezime': prezime, 'adresa': adresa, 'telefon': telefon, 'email': email, 'tip': tip } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.izbrisiCitaoca = (req, res) => {
            let username = req.body.username;
            citalac_1.default.deleteOne({ 'username': username }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
    }
}
exports.CitalacController = CitalacController;
//# sourceMappingURL=citalacController.js.map