import express from 'express'
import OcenaModel from '../models/ocena'

export class OcenaController{
    getAllOcene = (req: express.Request, res: express.Response)=>{
        OcenaModel.find({}, (err, rasp)=>{
            if(err) console.log(err);
            else res.json(rasp);
        })
    }
    dodajOcenu = (req: express.Request, res: express.Response)=>{
        let ocena = new OcenaModel({
            username: req.body.username,
            idKnjige: req.body.idKnjige,
            ocena: req.body.ocena,
            komentar: req.body.komentar,
            datum: req.body.datum
        })
        ocena.save((err, resp)=>{
            if(err) console.log(err);
            else res.json({'message' : 'ok'})
        })
    }

    izbrisiOceneKnjige = (req : express.Request, res: express.Response)=>{
        let idKnjige = req.body.idKnjige;

        OcenaModel.deleteMany({'idKnjige':idKnjige}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'})
        })
    }

    izbrisiOceneCitaoca = (req : express.Request, res: express.Response)=>{
        let username = req.body.username;

        OcenaModel.deleteMany({'username':username}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'})
        })
    }
}