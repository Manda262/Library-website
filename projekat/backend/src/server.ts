import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import citalacRouter from './routers/citalacRouter';
import zahtevRouter from './routers/zahtevRouter';
import adminRouter from './routers/adminRouter';
import knjigaRouter from './routers/knjigaRouter';
import raspolozivostRouter from './routers/raspolozivostRouter';
import zaduzenjeRouter from './routers/zaduzenjeRouter';
import ocenaRouter from './routers/ocenaRouter';
import bodyParser from 'body-parser'
import path from 'path'

const app = express();
app.use(cors())
app.use(express.json())
app.use(bodyParser.json({limit:'100mb'}))

mongoose.connect('mongodb://localhost:27017/projekat')
const connection = mongoose.connection
connection.once('open', ()=>{
    console.log('db connected')
})

const router = express.Router();
router.use('/citalac', citalacRouter);
router.use('/zahtev', zahtevRouter);
router.use('/admin', adminRouter);
router.use('/knjiga', knjigaRouter);
router.use('/raspolozivost', raspolozivostRouter);
router.use('/zaduzenje', zaduzenjeRouter);
router.use('/ocena',ocenaRouter)

router.use(express.static('public'))
router.use('/uploads', express.static(__dirname + '/public'));

app.use('/', router)
app.listen(4000, () => console.log(`Express server running on port 4000`));