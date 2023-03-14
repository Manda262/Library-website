import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Citalac = new Schema({
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
    tip: {
        type: String
    },
    slika:{
        type: String
    }
})

export default mongoose.model('CitalacModel', Citalac, 'citalac')