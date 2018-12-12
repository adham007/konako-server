const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const strasSchema = new Schema({
    nameEN: {
        type: String,
        required: true
    },
    nameTR: {
        type: String,
        required: true
    },
    nameAR: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true   
    },
    typeTR: {
        type: String,
        required: true   
    },
    typeEN: {
        type: String,
        required: true   
    },
    typeAR: {
        type: String,
        required: true   
    },
    colorEN: {
        type: String,
        required: true   
    },
    colorTR: {
        type: String,
        required: true   
    },
    colorAR: {
        type: String,
        required: true   
    },
    image: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

var Stras = mongoose.model('Stras', strasSchema);

module.exports = Stras;