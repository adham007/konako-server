const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const laserSchema = new Schema({
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
    descriptionEN: {
        type: String,
        required: true
    },
    descriptionTR: {
        type: String,
        required: true
    },
    descriptionAR: {
        type: String,
        required: true
    },
    imgFront: {
        type: String,
        required: true
    },
    imgBack: {
        type: String,
        required: true
    },
    imgRight: {
        type: String,
        required: true
    },
},{
    timestamps: true
});

var Lasers = mongoose.model('Laser', laserSchema);

module.exports = Lasers;