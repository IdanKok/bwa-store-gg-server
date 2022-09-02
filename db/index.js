const mongoose = require('mongoose');
const {urlDb} = require('../config')

mongoose.connect(urlDb, {
    useUnifiedTopology: true,
    //code dibawah ini bikin error
    //  useFindAndModify: true,
    // useCreateIndex: true,
    // useNewUrlParser: true 

})

const db = mongoose.connection

module.exports = db