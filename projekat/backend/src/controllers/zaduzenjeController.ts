import express from 'express'
import ZaduzenjeModel from '../models/zaduzenje'

export class ZaduzenjeController{
    getAllZaduzenja = (req: express.Request, res: express.Response)=>{
        ZaduzenjeModel.find({}, (err, zaduzenja)=>{
            if(err)console.log(err);
            else res.json(zaduzenja);
        })
    }
    dodajZaduzenje = (req: express.Request, res: express.Response)=>{
        let zaduzenje = new ZaduzenjeModel({
            username: req.body.username,
            idKnjige: req.body.idKnjige,
            datumZaduzenja: req.body.datumZaduzenja,
            rokVracanja: req.body.rokVracanja,
            datumVracanja: req.body.datumVracanja,
        })

        zaduzenje.save((err, resp)=>{
            if(err) console.log(err);
            else res.json({"message" : "ok"})
        })
    }

    razduziKnjigu = (req : express.Request, res: express.Response)=>{
        let idKnjige = req.body.idKnjige;
        let username = req.body.username;
        let datumVracanja = req.body.datumVracanja;

        ZaduzenjeModel.updateOne({'idKnjige': idKnjige, 'username': username}, {$set:{'datumVracanja':datumVracanja}}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message' : "ok"})
        })
    }

    izbrisiZaduzenjeKnjige = (req : express.Request, res: express.Response)=>{
        let idKnjige = req.body.idKnjige;

        ZaduzenjeModel.deleteMany({'idKnjige':idKnjige}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'})
        })
    }

    izbrisiZaduzenjeCitaoca = (req : express.Request, res: express.Response)=>{
        let username = req.body.username;

        ZaduzenjeModel.deleteMany({'username':username}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'})
        })
    }
}