import express from 'express'
import  AdminModel  from '../models/admin'

export class AdminController{

    login = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;

        AdminModel.findOne({'username' : username, 'password': password}, (err, admin)=>{
            if(err) console.log(err);
            else res.json(admin);
        })
    }

    promeniBrDana = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let brDana = req.body.brDana;

        AdminModel.updateOne({'username': username}, {$set: {'brDana':brDana}}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'})
        })
    }
}