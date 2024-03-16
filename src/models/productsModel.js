"use strict";

const mongoose = require("mongoose");

//! URL doğruluğunu kontrol eden fonksiyon
function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (error) {
    return false;
  }
}
const productCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    collection: "productCategory",
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    productCategoryId: {
      type: mongoose.Schema.Types.ObjectId, // ForeignKey, RelationalID
      ref: 'ProductCategory',
      required: true,
  },
    title: {
      type: String,
      trim: true,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Description is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    discountPercentage: {
      type: Number,
      required: false,
    },
    rating: {
      type: Number,
      required: false,
    },
    stock: {
      type: Number,
      required: true,
    },
    brand: {
      type: String,
      trim: true,
      required: true,
    },
    
    thumbnail: {
      type: String,
      required: true,
      validate: [isValidUrl, "Please enter a valid URL"],
    },
    images: [
      {
        type: String,
        validate: [isValidUrl, "Please enter a valid URL"],
      },
    ],
  },
  {
    collection: "products",
    timestamps: true,
  }
);



module.exports = {
  Product: mongoose.model("Product", productSchema),
  ProductCategory: mongoose.model("ProductCategory", productCategorySchema),
};
