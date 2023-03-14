import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Ocena = new Schema({
    username:{
        type: String
    },
    idKnjige:{
        type: Number
    },
    ocena:{
        type: Number
    },
    komentar:{
        type: String
    },
    datum:{
        type: String
    }
})

export default mongoose.model('OcenaModel', Ocena, 'ocena')