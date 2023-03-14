import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Admin = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    adresa: {
        type: String
    },
    telefon: {
        type: String
    },
    email: {
        type: String
    },
    brDana: {
        type: Number
    },
    slika:{
        type: String
    }

})

export default mongoose.model('AdminModel', Admin, 'admin')