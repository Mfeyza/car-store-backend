"use strict"

const User = require('./models/userModel')
const { Product,ProductCategory } = require('./models/productsModel')

module.exports = async () => {


     if (ProductCategory) {
        Product.updateMany({ 
             "ProductCategory": { $exists: false }
     }, { 
             "ProductCategoryId": ProductCategory._id 
       }).catch(err => console.log(err))
    }
    console.log('* Synchronized *')
}
