"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZahtevController = void 0;
const zahtev_1 = __importDefault(require("../models/zahtev"));
class ZahtevController {
    constructor() {
        this.getAllZahtevi = (req, res) => {
            zahtev_1.default.find({}, (err, zahtevi) => {
                if (err)
                    console.log(err);
                else
                    res.json(zahtevi);
            });
        };
        this.dodajZahtev = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let zahtev = new zahtev_1.default({
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
            zahtev.save((err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "message": "ok" });
            });
        });
        this.ukloniZahtev = (req, res) => {
            let username = req.body.username;
            zahtev_1.default.deleteOne({ 'username': username }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
    }
}
exports.ZahtevController = ZahtevController;
//# sourceMappingURL=zahtevController.js.map