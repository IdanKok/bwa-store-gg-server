//membuat model untuk mongodb
const mongoose = require('mongoose');
let nominalSchema = mongoose.Schema({
    coinQuantity :{
    type : Number,
    default: 0
},
coinName: {
    type: String,
    require: [true, 'Nama Koin harus diisi']
},
price: {
    type: Number,
    default: 0
}

}, {timestamps: true})
module.exports = mongoose.model('Nominal', nominalSchema)  