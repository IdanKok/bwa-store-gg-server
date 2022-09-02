//membuat model untuk mongodb
const mongoose = require('mongoose');
let transactionSchema = mongoose.Schema({

historyVoucherTopup : {
    gameName : {type: String, require: [true, 'nama game harus di isi']},
    category : {type: String, require: [true, 'kategori harus di isi']},
    thumbnail : { type : String },
    coinName : {type: String, require: [true, 'nama koin harus di isi']},
    coinQuantity : {type: String, require: [true, 'jumlah koin harus di isi']},
    price : {type: Number},

},



historyPayment : {
    name : {type: String, require: [true, 'nama harus di isi']},
    type : {type: String, require: [true, 'tipe pembayaran harus di isi']},
    bankName : {type: String, require: [true, 'nama bank harus di isi']},
    noRekening : {type: String, require: [true, 'nomor rekening harus di isi']},
},
name : {
    type : String,
    require : [true, 'nama harus diisi'],
    maxLength : [225, 'panjang nama harus sekitar 3 - 225 karakter'],
    minLength : [3, 'panjang nama harus sekitar 3 - 225 karakter']
},
accountUser : {
    type : String,
    require : [true, 'nama akun diisi'],
    maxLength : [225, 'panjang nama harus sekitar 3 - 225 karakter'],
    minLength : [3, 'panjang nama harus sekitar 3 - 225 karakter']
},
type : {
    type : Number,
    default : 0
},
value : {
    type : Number,
    default : 0
},

status: {
    type: String,
    enum: ['pending' , 'succes', 'failed'],
    default: 'pending'
},
player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
},
category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
},
user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
},
historyUser: {
    name : {type: String, require: [true, 'nama player harus di isi']},
   
    phoneNumber : {
        type : Number,
        require : [true, 'nama akun diisi'],
        maxLength : [13, 'panjang nama harus sekitar 3 - 225 karakter'],
        minLength : [9, 'panjang nama harus sekitar 3 - 225 karakter']
    }
},

}, {timestamps: true}) 
module.exports = mongoose.model('Transaction', transactionSchema)   