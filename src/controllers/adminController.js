// "use strict";

// require("express-async-errors");

// const passwordEncrypt = require("../helpers/passwordEncrypt");
// const Admin = require("../models/userModel");

// module.exports = {
//   list: async (req, res) => {
//     const data = await Admin.find();
//     res.status(200).send({
//       error: false,
//       data: data,
//     });
//   },

//   create: async (req, res) => {
//     const data = await Admin.create(req.body);
//     res.status(201).send({
//       error: false,
//       body: req.body,
//       data: data,
//     });
//   },
//   read: async (req, res) => {
//     const data = await Admin.findOne({ _id: req.params.AdminId });
//     res.status(202).send({
//       error: false,
//       data: data,
//     });
//   },

//   update: async (req, res) => {
//     const data = await Admin.updateOne({ _id: req.params.AdminId }, req.body);
//     const newData = await Admin.findOne({ _id: req.params.AdminId });
//     res.status(202).send({
//       error: false,
//       body: req.body,
//       data: data,
//       newData: newData,
//     });
//   },

//   delete: async (req, res) => {
//     const data = await Admin.deleteOne({ _id: req.params.AdminId });
//     res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
//   },

//   login: async (req, res) => {
//     const { email, password } = req.body;

//     if (email && password) {
//       const Admin = await Admin.findOne({ email });

//       if (Admin && Admin.password == passwordEncrypt(password)) {
//         req.session.id = Admin.id;
//         req.session.password = Admin.password;

//         if (req.body?.remindMe) {
//           req.session.remindMe = req.body.remindMe;
//           req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * 3;
//         }
//         res.status(200).send({
//           error: false,
//           message: "Login OK",
//           Admin,
//         });
//       } else {
//         res.errorStatusCode = 401;
//         throw new Error("Login parameters are not true.");
//       }
//     } else {
//       res.errorStatusCode = 401;
//       throw new Error("Email and password are required");
//     }
//   },
//   logout: async (req,res)=>{
//     req.session = null 
//     res.status(200).send({
//         error:false,
//         message:'Logout Ok'
//     })
//   }
// };
