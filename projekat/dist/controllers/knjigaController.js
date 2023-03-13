"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnjigaController = void 0;
const knjiga_1 = __importDefault(require("../models/knjiga"));
class KnjigaController {
    constructor() {
        this.getAllKnjige = (req, res) => {
            knjiga_1.default.find({}, (err, knjige) => {
                if (err)
                    console.log(err);
                else
                    res.json(knjige);
            });
        };
        this.searchKnjigePoNazivu = (req, res) => {
            let param = req.body.param;
            knjiga_1.default.find({ 'naziv': { $regex: param } }, (err, knjige) => {
                if (err)
                    console.log(err);
                else
                    res.json(knjige);
            });
        };
        /*searchKnjigePoAutoru = (req : express.Request, res: express.Response) => {
            let param = req.body.param;
    
            KnjigaModel.find({'naziv' : {$regex : param}}, (err, knjige)=>{
                if(err) console.log(err);
                else res.json(knjige);
            })
        }*/
        this.dodajKnjigu = (req, res) => {
            let knjiga = new knjiga_1.default({
                id: req.body.id,
                naziv: req.body.naziv,
                autori: req.body.autori,
                zanrovi: req.body.zanrovi,
                izdavac: req.body.izdavac,
                godina: req.body.godina,
                jezik: req.body.jezik,
                slika: 'http://localhost:4000/uploads/' + req.body.slika
            });
            knjiga.save((err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.dodajOstalo = (req, res) => {
            let id = req.body.id;
            let autori = req.body.autori;
            let zanrovi = req.body.zanrovi;
            knjiga_1.default.updateOne({ 'id': id }, { $set: { 'autori': autori, 'zanrovi': zanrovi } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.azurirajSliku = (req, res) => {
            let id = req.body.id;
            let slika = 'http://localhost:4000/uploads/' + req.body.slika;
            knjiga_1.default.updateOne({ 'id': id }, { $set: { 'slika': slika } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.azurirajKnjigu = (req, res) => {
            let id = req.body.id;
            let naziv = req.body.naziv;
            let autori = req.body.autori;
            let zanrovi = req.body.zanrovi;
            let izdavac = req.body.izdavac;
            let godina = req.body.godina;
            let jezik = req.body.jezik;
            knjiga_1.default.updateOne({ 'id': id }, { $set: { 'naziv': naziv, 'autori': autori, 'zanrovi': zanrovi, 'izdavac': izdavac, 'godina': godina, 'jezik': jezik } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.izbrisiKnjigu = (req, res) => {
            let id = req.body.id;
            knjiga_1.default.deleteOne({ 'id': id }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
    }
}
exports.KnjigaController = KnjigaController;
//# sourceMappingURL=knjigaController.js.map