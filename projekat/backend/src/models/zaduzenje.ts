import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Zaduzenje = new Schema({
    username:{
        type: String
    },
    idKnjige:{
        type:Number
    },
    datumZaduzenja:{
        type:String
    },
    rokVracanja:{
        type: String
    },
    datumVracanja:{
        type: String
    }
})

export default mongoose.model('ZaduzenjeModel', Zaduzenje, 'zaduzenje')