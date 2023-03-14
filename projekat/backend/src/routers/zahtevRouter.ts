import express from 'express'
import { ZahtevController } from '../controllers/zahtevController';
import multer from 'multer';

const zahtevRouter = express.Router();

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


zahtevRouter.route('/getAllZahtevi').get(
    (req,res)=> new ZahtevController().getAllZahtevi(req,res)
)

zahtevRouter.post('/dodajZahtev',upload.single('slikafajl'),
    (req, res)=>new ZahtevController().dodajZahtev(req, res)
)

zahtevRouter.route('/ukloniZahtev').post(
    (req, res)=> new ZahtevController().ukloniZahtev(req, res)
)

export default zahtevRouter