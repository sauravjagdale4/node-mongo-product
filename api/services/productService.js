const mongoose = require("mongoose");
const Product = require("../models/product");

class ProductService {
    //get product by category id 
    static getProductByCategory(categoryId) {
        return Product.find({
                $or: [{
                    category: categoryId
                }, {
                    allCategories: categoryId
                }]
            })
            .select("productName productPrice")
            .exec()
    }

    //save a product
    static save(productJson) {
        const product = new Product(productJson);
        return product.save();
    }
    //update a product
    static update(productJson) {
        return Product.findByIdAndUpdate({
            _id: productJson._id
        }, productJson, {
            new: true
        });
    }
}

module.exports = ProductService;