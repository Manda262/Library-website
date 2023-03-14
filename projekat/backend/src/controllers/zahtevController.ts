import express from 'express'
import ZahtevModel from '../models/zahtev'

export class ZahtevController{
    getAllZahtevi = (req: express.Request, res: express.Response)=>{
        ZahtevModel.find({}, (err, zahtevi)=>{
            if(err) console.log(err);
            else res.json(zahtevi);
        })
    }

    dodajZahtev = async (req: express.Request, res: express.Response)=>{
        let zahtev = new ZahtevModel({
            username: req.body.username,
            password: req.body.password,
            ime: req.body.ime,
            prezime: req.body.prezime,
            adresa: req.body.adresa,
            telefon: req.body.telefon,
            email: req.body.email,
            tip: req.body.tip,
            slika: 'http://localhost:4000/uploads/' + req.body.slika
        })

        zahtev.save((err, resp)=>{
            if(err) console.log(err);
            else res.json({"message" : "ok"})
        })
    }

    ukloniZahtev = (req: express.Request, res:express.Response)=>{
        let username = req.body.username;

        ZahtevModel.deleteOne({'username': username}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'})
        })
    }
}