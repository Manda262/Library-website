import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Knjiga = new Schema({
    id:{
        type: Number
    },
    naziv:{
        type: String
    },
    autori:{
        type: Array
    },
    zanrovi:{
        type: Array
    },
    izdavac:{
        type: String
    },
    godina:{
        type: String
    },
    jezik:{
        type: String
    },
    slika:{
        type: String
    }
})

export default mongoose.model('KnjigaModel', Knjiga, 'knjiga')

