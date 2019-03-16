const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ProductService = require("../services/productService");
const CategoryService = require("../services/CategoryService");

// API-4 get product for given category
router.get("/:categoryName", async (req, res, next) => {
    const categoryName = req.params.categoryName;
    try {
        let products = await ProductService.getProductByCategory(categoryName);
        if (products) {
            res.status(200).json(products);
        } else {
            res
                .status(404)
                .json({
                    error: "No valid entry found for provided ID"
                });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
});

//APi 2 - add a product along with categories
router.post("/", async (req, res, next) => {
    try {
        if (!req.body.productName || req.body.productName.trim() === "") {
            res.status(400).json({
                error: "Product Name is required and should not be empty."
            });
        }
        if (!req.body.productPrice || typeof req.body.productPrice != "number") {
            res.status(400).json({
                error: "Product price is required and should be number."
            });
        }
        let product = {
            _id: new mongoose.Types.ObjectId(),
            productName: req.body.productName,
            productPrice: req.body.productPrice
        };
        let allCategories = [];
        let categories = [];
        if (req.body.categories) {
            // This code is to get all ancestors of given categories.
            let allCategoriesSet = new Set();
            for (var i = 0; i < req.body.categories.length; i++) {
                let categoryName = req.body.categories[i];
                allCategoriesSet.add(categoryName);
                categories.push(categoryName);
                let doc = await CategoryService.getCategory(categoryName);
                console.log(doc);
                if (doc) {
                    let ancestors = doc.ancestors;
                    ancestors.forEach(ancestor => {
                        allCategoriesSet.add(ancestor.categoryName);
                    });
                }
            }
            allCategoriesSet.forEach(category => {
                allCategories.push(category);
            });
        }
        product.allCategories = allCategories;
        product.categories = categories;
        let response = await ProductService.save(product);
        if (response) {
            res.status(201).json(response);
        }
    } catch (err) {
        console.log(err);
        if (err.code && err.code == 11000) {
            res.status(400).json({
                error: "Product Name is should be unique."
            });
        }
        res.status(500).json({
            error: err
        });
    }

});

//API-5 Update the product name, price , categories
router.put("/:id", async (req, res, next) => {
    const id = req.params.id;
    try {
        if (!req.body.productName || req.body.productName.trim() === "") {
            res.status(400).json({
                error: "Product Name is required and should not be empty."
            });
        }
        if (!req.body.productPrice) {
            res.status(400).json({
                error: "Product price is required and should be number."
            });
        }
        let product = {
            _id: id,
            productName: req.body.productName,
            productPrice: req.body.productPrice
        };
        if (req.body.categories) {
            // This code is to get all ancestors of given categories.
            let allCategories = [];
            let categories = [];
            let allCategoriesSet = new Set();
            for (var i = 0; i < req.body.categories.length; i++) {
                let categoryName = req.body.categories[i];
                allCategoriesSet.add(categoryName);
                categories.push(categoryName);
                let doc = await CategoryService.getCategory(categoryName);
                console.log(doc);
                if (doc) {
                    let ancestors = doc.ancestors;
                    ancestors.forEach(ancestor => {
                        allCategoriesSet.add(ancestor.categoryName);
                    });
                }
            }
            allCategoriesSet.forEach(category => {
                allCategories.push(category);
            });
            product.allCategories = allCategories;
            product.categories = categories;
        }

        let response = await ProductService.update(product);
        if (response) {
            res.status(200).json({
                message: "SuccessFully updated.",
                product: response
            });
        }
    } catch (err) {
        console.log(err);
        if (err.code && err.code == 11000) {
            res.status(400).json({
                error: "Product Name is should be unique."
            });
        }
        res.status(500).json({
            error: err
        });
    }

});

module.exports = router;