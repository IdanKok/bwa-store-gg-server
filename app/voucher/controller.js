const Voucher = require("./model");
const Category = require("../category/model");
const Nominal = require("../nominal/model");
const path = require("path");
const fs = require("fs");
const config = require("../../config");
const mongoose = require("mongoose");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };
      const voucher = await Voucher.find()
        .populate("category")
        .populate("nominals");

      res.render("admin/voucher/view_voucher", {
        voucher,
        alert,
        name : req.session.user.name,
        title : 'Halaman Voucher'
      });
      console.log(voucher);
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
      console.log(error);
    }
  },
  //     //form tambah data
  viewCreate: async (req, res) => {
    try {
      const category = await Category.find();
      const nominal = await Nominal.find();

      res.render("admin/voucher/create", {
        category,
        nominal,
        name : req.session.user.name,
        title : 'Halaman Tambah Nominal'
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
      console.log(error);
    }
  },
  //     // //memasukan data ke database
  actionCreate: async (req, res) => {
    try {
      const { name, category, nominals } = req.body;
      var Data = require("mongoose").Types.ObjectId;
      let categoryValidation = "";
    //   const categoryNew = Data.isValid(category) === true ? category : categoryValidation
    //   let ctr = new Data(categoryNew)
      if (req.file) {
        let tmp_path = req.file.path;
        let originalExt =
          req.file.originalname.split(".")[
            req.file.originalname.split(".").length - 1
          ];
        let filename = req.file.filename + "." + originalExt;
        let target_path = path.resolve(
          config.roothPath,
          `public/uploads/${filename}`
        );

        
        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);
     

        console.log(categoryValidation);
        console.log(`ctrnya ${categoryValidation}`);
        src.pipe(dest);

        src.on("end", async () => {
          try {
            // const voucher = new Voucher({
            //     name,
            //     ctr,
            //     nominals,
            //     thumbnail: filename,
            //   });
            //   console.log(`categorynya ${ctr}`)
            //   await voucher.save();
              
            
            if (Data.isValid(category) === true) {
              const voucher = new Voucher({
                name,
                category,
                nominals,
                thumbnail: filename,
              });
              console.log(`crtnya nya ${category}`);
              await voucher.save();
            } else {
              const voucher = new Voucher({
                name,
                categoryValidation,
                nominals,
                thumbnail: filename,
              });
              console.log(`crtnya nya ${categoryValidation}`);
              await voucher.save();
            }

         
            req.flash("alertMessage", "Berhasil tambah Voucher");
            req.flash("alertStatus", "succes");
            res.redirect("/voucher");
          } catch (error) {
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/voucher");
          }
        });
      } else {
        // const voucher = new Voucher({
        //     name,
        //     categoryValidation,
        //     nominals,
        // })

        // await voucher.save()
        if (Data.isValid(category) === true) {
          const voucher = new Voucher({
            name,
            category,
            nominals,
          });

          await voucher.save();
        } else {
          const voucher = new Voucher({
            name,
            categoryValidation,
            nominals,
          });
          console.log(categoryValidation);
          await voucher.save();
        }

        req.flash("alertMessage", "Berhasil tambah Voucher");
        req.flash("alertStatus", "succes");

        res.redirect("/voucher");
      }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
      console.log(error);
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.find();
      const nominal = await Nominal.find();
      const voucher = await Voucher.findOne({ _id: id })
        .populate("category")
        .populate("nominals");
      res.render("admin/voucher/edit", {
        voucher,
        nominal,
        category,
        name : req.session.user.name,
        title : 'Halaman Ubah Nominal'
      });
    } catch (error) {
      req.flash("alertMessage", `$(error.message)`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
    }
  },

  actionEditStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const voucher = await Voucher.findOne({ _id: id });
      const status = voucher.status === "Y" ? "N" : "Y";
      const name = voucher.name  
      await Voucher.findOneAndUpdate(
        {
          _id: id,
        },
        { status }
      );

      req.flash("alertMessage", `Berhasil ubah Status ${name}`);
      req.flash("alertStatus", "success");

      res.redirect("/voucher");
    } catch (error) {
      req.flash("alertMessage", `$(error.message)`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
      console.log(error);
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, category, nominals } = req.body;
   
      const voucher = await Voucher.findOne({ _id: id });
  
      var Data = require("mongoose").Types.ObjectId;
      let categoryValidation = "";
     

      if (req.file) {
        let tmp_path = req.file.path;
        let originalExt =
          req.file.originalname.split(".")[
            req.file.originalname.split(".").length - 1
          ];
        let filename = req.file.filename + "." + originalExt;
        let target_path = path.resolve(
          config.roothPath,
          `public/uploads/${filename}`
        );


        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);

        src.on("end", async () => {
          try {
            const voucher = await Voucher.findOne({ _id: id });

            let currentImage = `${config.roothPath}/public/uploads/${voucher.thumbnail}`;
            if (fs.existsSync(currentImage)) {
              fs.unlinkSync(currentImage);
            }

            if (Data.isValid === true) {
              await Voucher.findOneAndUpdate(
                {
                  _id: id,
                },
                {
                  name,
                  category,
                  nominals,
                  thumbnail: filename,
                }
              );
            } else {
              await Voucher.findOneAndUpdate(
                {
                  _id: id,
                },
                {
                  name,
                  categoryValidation,
                  nominals,
                  thumbnail: filename,
                }
              );
            }

            // await Voucher.findOneAndUpdate({
            //     _id : id
            // }, {
            //     name,
            //     category,
            //     nominals,
            //     thumbnail: filename
            // })
            req.flash("alertMessage", "Berhasil tambah Voucher");
            req.flash("alertStatus", "succes");
            res.redirect("/voucher");
          } catch (error) {
            // res.status(400).json({ error : ""})
            // res.redirect('/voucher')

            req.flash("alertMessage", `${error.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/voucher");
          }
        });
      } else {
      
      
        if (Data.isValid(category) === true) {
          await Voucher.findOneAndUpdate(
            {
              _id: id,
            },
            {
              name,
              category,
              nominals,
            }
          );
        } else {
          await Voucher.findOneAndUpdate(
            {
              _id: id,
            },
            {
              name,
              categoryValidation,
              nominals,
            }
          );
        }

        // await Voucher.findOneAndUpdate({
        //     _id : id
        // }, {
        //     name,
        //     category,
        //     nominals,

        // })
        req.flash("alertMessage", "Berhasil tambah Voucher");
        req.flash("alertStatus", "succes");

        res.redirect("/voucher");
      }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
      console.log(error);
    }
  },

  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      const voucher = await Voucher.findOneAndRemove({
        _id: id,
      });

      let currentImage = `${config.roothPath}/public/uploads/${voucher.thumbnail}`;
      if (fs.existsSync(currentImage)) {
        fs.unlinkSync(currentImage);
      }

      req.flash("alertMessage", "Berhasil hapus Voucher");
      req.flash("alertStatus", "success");

      res.redirect("/voucher");
    } catch (error) {
      req.flash("alertMessage", `$(error.message)`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
      console.log(error);
    }
  },
};
