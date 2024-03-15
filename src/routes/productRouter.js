'use strict'

const router=require("express").Router()
const {Product,ProductCategory}=require("../controllers/productsController")

router.route('/')
    .get(Product.list) 
    .post(Product.create)


router.route('/:productId')
    .get(Product.read) 
    .put(Product.update) 
    .patch(Product.update) 
    .delete(Product.delete);
    router.route('/categories')
    .get(ProductCategory.list)
    .post(ProductCategory.create)
    
router.route('/categories/:categoryId')
    .get(ProductCategory.read)
    .put(ProductCategory.update) 
    .patch(ProductCategory.update)
    .delete(ProductCategory.delete)
module.exports = router; 
