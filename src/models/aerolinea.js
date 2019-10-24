const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

const aerolineaSchema = new Schema({
    idAerolinea:{
        type: String,
        required: true, 
        trim: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    paises:{
        type: Array,
        requeried: true
    },
    idAeropuerto:{
        type: String,
        requeried: true
    }
});

module.exports = mongoose.model("aerolinea",aerolineaSchema)