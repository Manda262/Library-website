import express from 'express'
import { RaspolozivostController } from '../controllers/raspolozivostController';

const raspolozivostRouter = express.Router();

raspolozivostRouter.route('/getAllRaspolozivost').get(
    (req, res) => new RaspolozivostController().getAllRaspolozivost(req, res)
)

raspolozivostRouter.route('/updateRaspolozivost').post(
    (req, res) => new RaspolozivostController().updateRaspolozivost(req, res)
)

raspolozivostRouter.route('/dodajRaspolozivost').post(
    (req, res) => new RaspolozivostController().dodajRaspolozivost(req, res)
)

raspolozivostRouter.route('/izbrisiRaspolozivost').post(
    (req, res) => new RaspolozivostController().izbrisiRaspolozivost(req, res)
)

export default raspolozivostRouter