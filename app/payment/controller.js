const Payment = require('./model')
const Bank = require('../bank/model')
module.exports ={
    index: async(req,res)=>{
        try {

            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")
            const alert = {message : alertMessage, status : alertStatus}
            const payment = await Payment.find().populate('banks')
          
            res.render('admin/payment/view_payment',{
                payment,
                alert,
                name : req.session.user.name,
                title : 'Halaman Payment'
            })
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/payment')
            console.log(error)
        }
    },
    //form tambah data
    viewCreate : async(req, res) =>
    {
        try {
            const banks = await Bank.find()
           res.render('admin/payment/create',{ 
            banks,
            name : req.session.user.name,
            title : 'Halaman Tambah Nominal' }) 
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/payment')
            console.log(error)
        }
    },
    // //memasukan data ke database
    actionCreate : async(req,res)=>{
        try {
            const { banks, type } = req.body
            let payment = await Payment({banks, type })
            await payment.save();

            req.flash('alertMessage',"Berhasil tambah nominal" )
            req.flash('alertStatus',"success")

            res.redirect('/payment')
            



        } catch (err) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/payment')
            console.log(err)
        }
    },
    viewEdit: async(req,res)=>{
        try {
            const {id}= req.params
            
            const payment = await Payment.findOne({ _id : id }).populate('banks')
            const banks = await Bank.find()
            res.render('admin/payment/edit', {
                payment,
                banks,
                name : req.session.user.name,
                title : 'Halaman Rubah Nominal'
            })   
        } catch (error) {
            req.flash('alertMessage', `$(error.message)`)
            req.flash('alertStatus', 'danger')
            res.redirect('/nominal')
        }
    },
    actionEdit: async(req,res)=>{
        try {
            const {id} = req.params;
            const {type, banks} = req.body;
            await Payment.findOneAndUpdate({
                _id : id
            }, {type, banks})

            req.flash('alertMessage',"Berhasil ubah Nominal" )
            req.flash('alertStatus',"success")

            res.redirect('/payment')
        } catch (error) {
            req.flash('alertMessage', `$(error.message)`)
            req.flash('alertStatus', 'danger')
            res.redirect('/payment')
            console.log(error)
            
        }
    },
    actionDelete: async(req,res)=>{
        try {
            const {id} = req.params
            await Payment.findOneAndRemove({
                _id : id
            })

            req.flash('alertMessage',"Berhasil hapus Payment" )
            req.flash('alertStatus',"success")

            res.redirect('/payment')

        } catch (error) {
            req.flash('alertMessage', `$(error.message)`)
            req.flash('alertStatus', 'danger')
            res.redirect('/payment')
            console.log(error)
        }
    }
}