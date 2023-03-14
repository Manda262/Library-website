import express from 'express'
import RaspolozivostModel from '../models/raspolozivost'

export class RaspolozivostController{
    getAllRaspolozivost = (req: express.Request, res: express.Response)=>{
        RaspolozivostModel.find({}, (err, rasp)=>{
            if(err) console.log(err);
            else res.json(rasp);
        })
    }

    updateRaspolozivost = (req: express.Request, res: express.Response)=>{
        let idKnjige = req.body.idKnjige;
        let raspolozivost = req.body.raspolozivost;

        RaspolozivostModel.updateOne({'idKnjige' : idKnjige}, {$set : {'raspolozivost' : raspolozivost}}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'})
        })
    }

    dodajRaspolozivost = (req: express.Request, res: express.Response) => {
        let raspolozivost = new RaspolozivostModel({
            idKnjige : req.body.idKnjige,
            raspolozivost: req.body.raspolozivost
        })

        raspolozivost.save((err, resp)=>{
            if(err) console.log(err);
            else res.json({'message' : 'ok'})
        })
    }

    izbrisiRaspolozivost = (req: express.Request, res: express.Response)=>{
        let idKnjige = req.body.idKnjige;

        RaspolozivostModel.deleteOne({'idKnjige': idKnjige}, (err, resp) =>{
            if(err) console.log(err);
            else res.json({'message': 'ok'})
        })
    }
}