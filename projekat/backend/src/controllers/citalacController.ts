import express from 'express'
import CitalacModel from '../models/citalac'

export class CitalacController{
    login = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;

        CitalacModel.findOne({'username' : username, 'password': password}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user);
        })
    }

    register = (req: express.Request, res: express.Response)=>{
        let citalac = new CitalacModel({
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

        citalac.save((err, resp)=>{
            if(err) console.log(err);
            else res.json({"message" : "ok"})
        })

    }

    azurirajSliku = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let slika = 'http://localhost:4000/uploads/' + req.body.slika
        CitalacModel.updateOne({'username': username}, {$set:{'slika': slika}}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'})
        })
    }

    getAllCitaoce = (req: express.Request, res: express.Response)=>{
        CitalacModel.find({}, (err, citaoci)=>{
            if(err) console.log(err);
            else res.json(citaoci);
        })
    }

    promeniSifru = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let newPassword = req.body.password;
        CitalacModel.updateOne({'username' : username}, {$set: {'password': newPassword}}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message' : 'ok'});
        })
    }

    updateCitaoca = (req: express.Request, res: express.Response)=>{
        let username = req.body.username
        let password = req.body.password
        let ime = req.body.ime
        let prezime = req.body.prezime
        let adresa = req.body.adresa
        let telefon = req.body.telefon
        let email = req.body.email
        let tip = req.body.tip

        CitalacModel.updateOne({'username': username}, {$set : {'password': password, 'ime': ime, 'prezime': prezime, 'adresa' : adresa, 'telefon': telefon, 'email': email, 'tip': tip}}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message' : 'ok'});
        })
    }

    izbrisiCitaoca = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;

        CitalacModel.deleteOne({'username': username}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'})
        })
    }
}