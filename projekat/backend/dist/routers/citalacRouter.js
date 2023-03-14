"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const citalacController_1 = require("../controllers/citalacController");
const citalacRouter = express_1.default.Router();
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
citalacRouter.route('/login').post((req, res) => new citalacController_1.CitalacController().login(req, res));
citalacRouter.post('/register', upload.single('slikafajl'), (req, res) => new citalacController_1.CitalacController().register(req, res));
citalacRouter.route('/getAllCitaoce').get((req, res) => new citalacController_1.CitalacController().getAllCitaoce(req, res));
citalacRouter.post('/azurirajSliku', upload.single('slikafajl'), (req, res) => new citalacController_1.CitalacController().azurirajSliku(req, res));
citalacRouter.route('/promeniSifru').post((req, res) => new citalacController_1.CitalacController().promeniSifru(req, res));
citalacRouter.route('/updateCitaoca').post((req, res) => new citalacController_1.CitalacController().updateCitaoca(req, res));
citalacRouter.route('/izbrisiCitaoca').post((req, res) => new citalacController_1.CitalacController().izbrisiCitaoca(req, res));
/*citalacRouter.post("/register", upload.single("file"), function (req, res, next) {
    const file = req.file;
    if (file) {
      res.json(req.file);
    } else throw "error";
  });*/
exports.default = citalacRouter;
//# sourceMappingURL=citalacRouter.js.map