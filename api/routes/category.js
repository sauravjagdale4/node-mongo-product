const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const CategoryService = require("../services/CategoryService")

//get specific category by name
router.get("/:categoryName", async (req, res, next) => {
    const categoryName = req.params.categoryName;
    try {
        let doc = await CategoryService.getCategory(categoryName);
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({
                error: {
                    message: "Category not found."
                }
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
});

// API -2 get all categories and childcategories
router.get("/", async (req, res, next) => {
    try {
        let categories = await CategoryService.getAllCategory();
        if (categories) {
            let map = {}
            categories.forEach(category => {
                category.ancestors.forEach(ancestor => {
                    if (ancestor.categoryName in map) {
                        let childCategories = map[ancestor.categoryName];
                        childCategories.add(category.categoryName);
                        map[ancestor.categoryName] = childCategories;
                    } else {
                        let childCategories = new Set();
                        childCategories.add(category.categoryName);
                        map[ancestor.categoryName] = childCategories;
                    }
                })
            });
            let result = [];
            categories.forEach(category => {
                let cat = {
                    id: category._id,
                    categoryName: category.categoryName
                };
                if (category.categoryName in map) {
                    cat.childCategories = Array.from(map[category.categoryName]);
                    console.log(category);
                } else {
                    cat.childCategories = [];
                }
                result.push(cat);
            });
            res.status(200).json(result);
        }

    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
});

//API 1- add category
router.post("/", async (req, res, next) => {
    try {
        if (!req.body.categoryName || req.body.categoryName.trim() === "") {
            res.status(400).json({
                error: "Category Name is required and should not be empty."
            });
        }
        let category = {
            _id: new mongoose.Types.ObjectId(),
            categoryName: req.body.categoryName.trim(),
            ancestors: []
        };
        if (req.body.parent) {
            if (req.body.parent.trim() === "") {
                res.status(400).json({
                    error: "Parent Name should not be empty."
                });
            }
            let parentCategory = await CategoryService.getCategory(req.body.parent.trim());
            if (parentCategory) {
                let ancestors = parentCategory.ancestors;
                ancestors.push({
                    _id: parentCategory._id,
                    categoryName: parentCategory.categoryName
                });
                category.parentId = parentCategory._id;
                category.ancestors = ancestors;
            }
        }
        let result = await CategoryService.saveCategory(category);
        if (result) {
            res.status(201).json(result);
        }
    } catch (err) {
        if (err.code && err.code == 11000) {
            res.status(400).json({
                error: "Category Name is should be unique."
            });
        }
        res.status(500).json({
            error: err
        });
    }
});

module.exports = router;