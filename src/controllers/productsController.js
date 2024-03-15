"use strict";

require("express-async-errors");

const { Product, ProductCategory } = require("../models/productsModel");

module.exports.ProductCategory = {
  list: async (req, res) => {
    const data = await ProductCategory.find();
    res.status(200).send({
      error: false,
      data: data,
    });
  },
  create: async (req, res) => {
    const data = await ProductCategory.create(req.body);
    res.status(201).send({
      error: false,
      body: req.body,
      data: data,
    });
  },
  read: async (req, res) => {
    const data = await ProductCategory.find({ _id: req.params.categoryId });
    res.status(202).send({
      error: false,
      data: data,
    });
  },
  update: async (req, res) => {
    const data = await ProductCategory.updateOne(
      { _id: req.params.categoryId },
      req.body
    );
    const newdata = await ProductCategory.find({ _id: req.params.categoryId });
    res.status(202).send({
      error: false,
      body: req.body,
      data: data,

      newdata: newdata,
    });
  },
  delete: async (req, res) => {
    const data = await ProductCategory.deleteOne({
      _id: req.params.categoryId,
    });
    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },
};

module.exports.Product = {
  list: async (req, res) => {
    // const data= await Product.find();
    const data = await res.getQueryList(Product);
    res.status(200).send({
      error: false,
      data: data,
      details: await res.getQueryListDetails(Product),
    });
  },
  create: async (req, res) => {
    const data = await Product.create(req.body);
    res.status(201).send({
      error: false,
      body: req.body,
      data: data,
    });
  },

  read: async (req, res) => {
    const data = await Product.find({ _id: req.params.productId });
    res.status(202).send({
      error: false,
      data: data,
    });
  },

  update: async (req, res) => {
    const data = await Product.updateOne(
      { _id: req.params.productId },
      req.body
    );
    const newData = await Product.find({ _id: req.params.productId });
    res.status(202).send({
      error: false,
      body: req.body,
      data: data,
      newData: newData,
    });
  },

  delete: async (req, res) => {
    const data = await Product.deleteOne({ _id: req.params.productId });

    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },
};
