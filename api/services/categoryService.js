const mongoose = require("mongoose");
const Category = require("../models/category");

class CategoryService {
    static getCategory(categoryName) {
        return Category.findOne({
                categoryName: categoryName
            })
            .select("categoryName parentId ancestors")
            .exec();
    }

    static getAllCategory(categoryName) {
        return Category.find()
            .select("categoryName parentId ancestors")
            .exec();
    }

    static saveCategory(categoryJson) {
        let category = new Category(categoryJson);
        return category.save();
    }
}

module.exports = CategoryService;