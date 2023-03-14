import  express  from 'express';
import multer from 'multer';
import { CitalacController } from '../controllers/citalacController'; 

const citalacRouter = express.Router();

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


citalacRouter.route('/login').post(
    (req, res)=> new CitalacController().login(req, res)
)

citalacRouter.post('/register', upload.single('slikafajl'),
    (req, res)=> new CitalacController().register(req, res)
)

citalacRouter.route('/getAllCitaoce').get(
    (req, res)=> new CitalacController().getAllCitaoce(req, res)
)

citalacRouter.post('/azurirajSliku', upload.single('slikafajl'),
  (req, res) => new CitalacController().azurirajSliku(req, res)
)

citalacRouter.route('/promeniSifru').post(
    (req, res) => new CitalacController().promeniSifru(req, res)
)

citalacRouter.route('/updateCitaoca').post(
  (req, res) => new CitalacController().updateCitaoca(req, res)
)

citalacRouter.route('/izbrisiCitaoca').post(
  (req, res) => new CitalacController().izbrisiCitaoca(req, res)
)

/*citalacRouter.post("/register", upload.single("file"), function (req, res, next) {
    const file = req.file;
    if (file) {
      res.json(req.file);
    } else throw "error";
  });*/

export default citalacRouter;