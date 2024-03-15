"use strict";

require("express-async-errors");

const passwordEncrypt = require("../helpers/passwordEncrypt");
const User = require("../models/userModel");

module.exports = {
  list: async (req, res) => {
    const data = await User.find();
    res.status(200).send({
      error: false,
      data: data,
    });
  },

  create: async (req, res) => {
    const data = await User.create(req.body);
    res.status(201).send({
      error: false,
      body: req.body,
      data: data,
    });
  },
  read: async (req, res) => {
    const data = await User.findOne({ _id: req.params.UserId });
    res.status(202).send({
      error: false,
      data: data,
    });
  },

  update: async (req, res) => {
    const data = await User.updateOne({ _id: req.params.UserId }, req.body);
    const newData = await User.findOne({ _id: req.params.UserId });
    res.status(202).send({
      error: false,
      body: req.body,
      data: data,
      newData: newData,
    });
  },

  delete: async (req, res) => {
    const data = await User.deleteOne({ _id: req.params.userId });
    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
      const user = await User.findOne({ email });

      if (user && user.password == passwordEncrypt(password)) {
        req.session.id = user.id;
        req.session.password = user.password;

        if (req.body?.remindMe) {
          req.session.remindMe = req.body.remindMe;
          req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * 3;
        }
        res.status(200).send({
          error: false,
          message: "Login OK",
          user,
        });
      } else {
        res.errorStatusCode = 401;
        throw new Error("Login parameters are not true.");
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("Email and password are required");
    }
  },
  logout: async (req,res)=>{
    req.session = null 
    res.status(200).send({
        error:false,
        message:'Logout Ok'
    })
  }
};
