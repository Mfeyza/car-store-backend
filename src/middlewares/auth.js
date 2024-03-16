"use strict";

const User = require("../models/userModel");

module.exports = async (req, res, next) => {
  if (req?.session?.id) {
    const { id, password } = req.session;

    const user = await User.findOne({ _id: id });

    if (user && user.password === password) {
      req.user = user;
      req.isLogin = true;

      if (user.email === "admin@admin.com") {
        req.isAdmin = true;
      } else {
        req.isAdmin = false;

        if (req.method !== "GET") {
          return res.status(403).send({
            error: true,
            message: "Bu işlemi yapabilmek için yetkiniz yok.",
          });
        }
      }
    } else {
      req.session = null;
      req.isLogin = false;
      req.isAdmin = false;
    }
  }
  next();
};
