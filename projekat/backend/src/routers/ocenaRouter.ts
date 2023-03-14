import express from "express";
import { OcenaController } from "../controllers/ocenaController";

const ocenaRouter = express.Router();

ocenaRouter.route('/getAllOcene').get(
    (req, res) => new OcenaController().getAllOcene(req, res)
)

ocenaRouter.route('/dodajOcenu').post(
    (req, res)=> new OcenaController().dodajOcenu(req, res)
)

ocenaRouter.route('/izbrisiOceneKnjige').post(
    (req, res) => new OcenaController().izbrisiOceneKnjige(req, res) 
)

ocenaRouter.route('/izbrisiOceneCitaoca').post(
    (req, res) => new OcenaController().izbrisiOceneCitaoca(req, res) 
)

export default ocenaRouter