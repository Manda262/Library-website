"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zahtevController_1 = require("../controllers/zahtevController");
const multer_1 = __importDefault(require("multer"));
const zahtevRouter = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png") {
        cb(null, true);
    }
    else {
        cb(new Error("Slika nije u odgovarajucem formatu"), false);
    }
};
const upload = (0, multer_1.default)({ storage: storage, fileFilter: fileFilter });
zahtevRouter.route('/getAllZahtevi').get((req, res) => new zahtevController_1.ZahtevController().getAllZahtevi(req, res));
zahtevRouter.post('/dodajZahtev', upload.single('slikafajl'), (req, res) => new zahtevController_1.ZahtevController().dodajZahtev(req, res));
zahtevRouter.route('/ukloniZahtev').post((req, res) => new zahtevController_1.ZahtevController().ukloniZahtev(req, res));
exports.default = zahtevRouter;
//# sourceMappingURL=zahtevRouter.js.map