import express from 'express'
import KnjigaModel from '../models/knjiga'

export class KnjigaController{
    getAllKnjige = (req: express.Request, res: express.Response) => {
        KnjigaModel.find({}, (err, knjige)=>{
            if(err) console.log(err);
            else res.json(knjige);
        })
    }

    searchKnjigePoNazivu = (req : express.Request, res: express.Response) => {
        let param = req.body.param;

        KnjigaModel.find({'naziv' : {$regex : param}}, (err, knjige)=>{
            if(err) console.log(err);
            else res.json(knjige);
        })
    }

    /*searchKnjigePoAutoru = (req : express.Request, res: express.Response) => {
        let param = req.body.param;

        KnjigaModel.find({'naziv' : {$regex : param}}, (err, knjige)=>{
            if(err) console.log(err);
            else res.json(knjige);
        })
    }*/

    dodajKnjigu = (req: express.Request, res: express.Response)=>{
        let knjiga = new KnjigaModel({
            id: req.body.id,
            naziv: req.body.naziv,
            autori: req.body.autori,
            zanrovi: req.body.zanrovi,
            izdavac: req.body.izdavac,
            godina: req.body.godina,
            jezik: req.body.jezik,
            slika: 'http://localhost:4000/uploads/' + req.body.slika
        })

        knjiga.save((err, resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'})
        })
    }

    dodajOstalo = (req: express.Request, res: express.Response)=>{
        let id = req.body.id;
        let autori = req.body.autori;
        let zanrovi = req.body.zanrovi;
        KnjigaModel.updateOne({'id': id}, {$set : {'autori': autori, 'zanrovi': zanrovi}}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'})
        })
    }

    azurirajSliku = (req: express.Request, res: express.Response) => {
        let id = req.body.id;
        let slika = 'http://localhost:4000/uploads/' + req.body.slika
        KnjigaModel.updateOne({'id': id}, {$set :{'slika':slika}}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'})
        })
    }

    azurirajKnjigu = (req: express.Request, res: express.Response)=>{
        let id = req.body.id;
        let naziv = req.body.naziv;
        let autori = req.body.autori;
        let zanrovi = req.body.zanrovi;
        let izdavac = req.body.izdavac;
        let godina = req.body.godina;
        let jezik = req.body.jezik;

        KnjigaModel.updateOne({'id': id}, {$set :{'naziv': naziv, 'autori':autori, 'zanrovi': zanrovi, 'izdavac':izdavac, 'godina': godina, 'jezik':jezik}}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'})
        })
    }

    izbrisiKnjigu = (req: express.Request, res: express.Response) => {
        let id = req.body.id;

        KnjigaModel.deleteOne({'id': id}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'})
        })
    }
}