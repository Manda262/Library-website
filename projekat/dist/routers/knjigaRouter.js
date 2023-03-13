"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const knjigaController_1 = require("../controllers/knjigaController");
const knjigaRouter = express_1.default.Router();
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
knjigaRouter.route('/getAllKnjige').get((req, res) => new knjigaController_1.KnjigaController().getAllKnjige(req, res));
knjigaRouter.route('/searchKnjigePoNazivu').post((req, res) => new knjigaController_1.KnjigaController().searchKnjigePoNazivu(req, res));
knjigaRouter.post('/dodajKnjigu', upload.single('slikafajl'), (req, res) => new knjigaController_1.KnjigaController().dodajKnjigu(req, res));
knjigaRouter.route('/dodajOstalo').post((req, res) => new knjigaController_1.KnjigaController().dodajOstalo(req, res));
knjigaRouter.post('/azurirajSliku', upload.single('slikafajl'), (req, res) => new knjigaController_1.KnjigaController().azurirajSliku(req, res));
knjigaRouter.route('/azurirajKnjigu').post((req, res) => new knjigaController_1.KnjigaController().azurirajKnjigu(req, res));
knjigaRouter.route('/izbrisiKnjigu').post((req, res) => new knjigaController_1.KnjigaController().izbrisiKnjigu(req, res));
exports.default = knjigaRouter;
//# sourceMappingURL=knjigaRouter.js.map