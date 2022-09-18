//membuat model untuk mongodb
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const HASH_ROUND = 10
// const path = require("path");
// const fs = require("fs");
// const config = require("../../config");
let playerSchema = mongoose.Schema({

email :{
    type : String,
    require: [true, 'Email harus diisi']
},
name :{
    type : String,
    require: [true, 'Nama harus diisi'],
    maxLength : [225, 'panjang nama harus sekitar 3 - 225 karakter'],
    minLength : [3, 'panjang nama harus sekitar 3 - 225 karakter']
},
userName :{
    type : String,
    require: [true, 'Nama harus diisi'],
    maxLength : [225, 'panjang username harus sekitar 3 - 225 karakter'],
    minLength : [3, 'panjang username harus sekitar 3 - 225 karakter']
},
password :{
    type : String,
    require: [true, 'Kata sandi harus diisi'],
    maxLength : [225, 'panjang karakter maksimal 225 karakter'],
},
role :{
    type : String,
    enum : ['admin','user'],
    default : 'user'
},
status: {
    type: String,
    enum: ['Y' , 'N'],
    default: 'Y'
},
avatar : { 
    type: String
},
fileName : {
    type : String
},

phoneNumber :{
    type : String,
    require: [true, 'Nomor telepon  harus diisi'],
    maxLength : [13, 'panjang nomor telepon harus antara 9 - 13 karakter'],
    minLength : [9, 'panjang nomor telepon harus antara 9 - 13 karakter']
},

favorite: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
},


}, {timestamps: true})


//function untuk mengecek apakah email baru yg didaftarkan sudah ada/sama dengan sebelumnya
playerSchema.path('email').validate(async function (value) {
   try {
        const count = await this.model('Player').countDocuments({ email : value})
        return !count
    } catch (error) {
        throw(error)
    }
}, attr => `${attr.value} sudah terdaftar` )

playerSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, HASH_ROUND)
    next()
})

module.exports = mongoose.model('Player', playerSchema)  