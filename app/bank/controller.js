const Bank = require('./model')

module.exports ={
    index: async(req,res)=>{
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")
            const alert = {message : alertMessage, status : alertStatus}
            const bank = await Bank.find();
          
            res.render('admin/bank/view_bank',{
                bank,
                alert,
                name : req.session.user.name,
                title : 'Halaman Bank'
                
            })
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
            console.log(error)
        }
    },
    //form tambah data
    viewCreate : async(req, res) =>
    {
        try {
           res.render('admin/bank/create', {
            name : req.session.user.name,
            title : 'Halaman Tambah Bank'
           }) 
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
            console.log(error)
        }
    },
    // // //memasukan data ke database
    actionCreate : async(req,res)=>{
        try {
            const { name, nameBank, noRekening } = req.body
            let bank = await Bank({ name, nameBank, noRekening  })
            await bank.save();
            console.log(bank)
            req.flash('alertMessage',"Berhasil tambah bank" )
            req.flash('alertStatus',"success")

            res.redirect('/bank')
            



        } catch (err) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
            console.log(err)
        }
    },
    viewEdit: async(req,res)=>{
        try {
            const {id}= req.params
            
            const bank = await Bank.findOne({ _id : id })
            res.render('admin/bank/edit', {
                bank,
                name : req.session.user.name,
                title : 'Halaman Ubah Bank'
            })
        } catch (error) {
            req.flash('alertMessage', `$(error.message)`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
        }
    },
    actionEdit: async(req,res)=>{
        try {
            const {id} = req.params;
            const {name, nameBank, noRekening} = req.body;
            await Bank.findOneAndUpdate({
                _id : id
            }, {name, nameBank, noRekening})

            req.flash('alertMessage',"Berhasil ubah Nominal" )
            req.flash('alertStatus',"success")

            res.redirect('/bank')
        } catch (error) {
            req.flash('alertMessage', `$(error.message)`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
            console.log(error)
            
        }
    },
    actionDelete: async(req,res)=>{
        try {
            const {id} = req.params
            await Bank.findOneAndRemove({
                _id : id
            })

            req.flash('alertMessage',"Berhasil Edit nominal" )
            req.flash('alertStatus',"success")

            res.redirect('/bank')

        } catch (error) {
            req.flash('alertMessage', `$(error.message)`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
            console.log(error)
        }
    }
}