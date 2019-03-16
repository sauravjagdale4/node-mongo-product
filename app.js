const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const categoryRoutes = require("./api/routes/category");
const productRoutes = require("./api/routes/products");

mongoose.connect(
    "mongodb://saurav:sauravpass@mycluster-shard-00-00-kssdk.mongodb.net:27017,mycluster-shard-00-01-kssdk.mongodb.net:27017,mycluster-shard-00-02-kssdk.mongodb.net:27017/User?ssl=true&replicaSet=MyCluster-shard-0&authSource=admin&retryWrites=true", {
        useMongoClient: true
    }
);
mongoose.Promise = global.Promise;

//logging the url call
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Routes which should handle requests
app.use("/category", categoryRoutes);
app.use("/products", productRoutes);
app.use((req, res, next) => {
    const error = new Error("URL Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;