import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Raspolozivost = new Schema({
    idKnjige:{
        type: Number
    },
    raspolozivost:{
        type: Number
    }
})

export default mongoose.model('RaspolozivostModel', Raspolozivost, 'raspolozivost')