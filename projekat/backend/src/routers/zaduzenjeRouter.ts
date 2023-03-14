import express from 'express'
import { ZaduzenjeController } from '../controllers/zaduzenjeController';

const zaduzenjeRouter = express.Router();

zaduzenjeRouter.route('/getAllZaduzenja').get(
    (req, res)=> new ZaduzenjeController().getAllZaduzenja(req, res)
)

zaduzenjeRouter.route('/dodajZaduzenje').post(
    (req, res) => new ZaduzenjeController().dodajZaduzenje(req, res)
)

zaduzenjeRouter.route('/razduziKnjigu').post(
    (req, res) => new ZaduzenjeController().razduziKnjigu(req, res)
)

zaduzenjeRouter.route('/izbrisiZaduzenjeKnjige').post(
    (req, res) => new ZaduzenjeController().izbrisiZaduzenjeKnjige(req, res)
)

zaduzenjeRouter.route('/izbrisiZaduzenjeCitaoca').post(
    (req, res) => new ZaduzenjeController().izbrisiZaduzenjeCitaoca(req, res)
)

export default zaduzenjeRouter