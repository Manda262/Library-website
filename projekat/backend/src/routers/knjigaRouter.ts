import express from "express";
import multer from "multer";
import { KnjigaController } from "../controllers/knjigaController";

const knjigaRouter = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    
    filename: function (req: any, file: any, cb: any) {
        cb(null, file.originalname)
    }
});
const fileFilter = (req: any,file: any,cb: any) => {
    if(file.mimetype === "image/jpg"  || 
       file.mimetype ==="image/jpeg"  || 
       file.mimetype ===  "image/png"){
     
    cb(null, true);
   }else{
      cb(new Error("Slika nije u odgovarajucem formatu"),false);
}}

const upload = multer({storage: storage, fileFilter : fileFilter});


knjigaRouter.route('/getAllKnjige').get(
    (req, res) => new KnjigaController().getAllKnjige(req, res)
)

knjigaRouter.route('/searchKnjigePoNazivu').post(
    (req, res)=> new KnjigaController().searchKnjigePoNazivu(req, res)
)

knjigaRouter.post('/dodajKnjigu' , upload.single('slikafajl'),
    (req, res) => new KnjigaController().dodajKnjigu(req, res)
)

knjigaRouter.route('/dodajOstalo').post(
    (req, res) => new KnjigaController().dodajOstalo(req, res)
)

knjigaRouter.post('/azurirajSliku', upload.single('slikafajl'),
    (req, res) => new KnjigaController().azurirajSliku(req, res)
)

knjigaRouter.route('/azurirajKnjigu').post(
    (req, res)=> new KnjigaController().azurirajKnjigu(req, res)
)

knjigaRouter.route('/izbrisiKnjigu').post(
    (req, res) => new KnjigaController().izbrisiKnjigu(req, res)
)

export default knjigaRouter