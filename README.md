# nodejs-test

## API 1 - Add a category
* Request URL - POST localhost:3000/category
* Request Payload - 
{
    "categoryName":"Men's Clothing",
    "parent":"Clothing"
}
* Response Payload :
{
  "_id": "5c8d1055c1716d57080f3120",
  "categoryName": "Men's Clothing",
  "parentId": "5c8d0ffdc1716d57080f311f",
  "createdDate": "2019-03-16T15:03:49.345Z",
  "ancestors": [
    {
      "categoryName": "Clothing",
      "_id": "5c8d0ffdc1716d57080f311f"
    }
  ]
}

## API 2 - add a product and its mapping to categories
* Request URL - localhost:3000/products
* Request Payload - {
    "productName":"PepeJean Slim Jeans",
    "productPrice":980,
    "categories" : ["Men's Jeans"]
}
* Response Payload - {
    "_id": "5c8d13c2c1716d57080f3127",
    "productName": "PepeJean Slim Jeans",
    "productPrice": 980,
    "createdDate": "2019-03-16T15:18:26.596Z",
    "allCategories": [
        "Men's Jeans",
        "Clothing",
        "Men's Clothing"
    ],
    "categories": [
        "Men's Jeans"
    ],
    "id": "5c8d13c2c1716d57080f3127"
}

## API 3 - get all categories
* Request URL - GET localhost:3000/category
* Response Payload :
[
    {
        "id": "5c8d0ffdc1716d57080f311f",
        "categoryName": "Clothing",
        "childCategories": [
            "Men's Clothing",
            "Woman's Clothing",
            "Men's Shoes",
            "Men's Jeans",
            "Men's Shirt"
        ]
    },
    {
        "id": "5c8d1055c1716d57080f3120",
        "categoryName": "Men's Clothing",
        "childCategories": [
            "Men's Shoes",
            "Men's Jeans",
            "Men's Shirt"
        ]
    },
    {
        "id": "5c8d11d3c1716d57080f3121",
        "categoryName": "Woman's Clothing",
        "childCategories": []
    },
    {
        "id": "5c8d1200c1716d57080f3122",
        "categoryName": "Men's Shoes",
        "childCategories": []
    },
    {
        "id": "5c8d120ec1716d57080f3123",
        "categoryName": "Men's Jeans",
        "childCategories": []
    },
    {
        "id": "5c8d1216c1716d57080f3124",
        "categoryName": "Men's Shirt",
        "childCategories": []
    }
]

## API 4 - get all product for given category
* Request Api - localhost:3000/products/Men's Clothing
* Response Payload -
[
    {
        "_id": "5c8d13b0c1716d57080f3126",
        "productName": "PepeJean Slim Jeans",
        "productPrice": 980,
        "id": "5c8d13b0c1716d57080f3126"
    },
    {
        "_id": "5c8d147dc1716d57080f3128",
        "productName": "US Polo Shirt",
        "productPrice": 1552,
        "id": "5c8d147dc1716d57080f3128"
    }
]

## API 5- Update product detail or mapping to categories
* Request API- PUT localhost:3000/products/5c8d147dc1716d57080f3128
* Request Payload-
{
    "productName":"US Polo T-Shirt",
    "productPrice": 1100
}
* Response Payload-
{
    "message": "SuccessFully updated.",
    "product": {
        "_id": "5c8d147dc1716d57080f3128",
        "productName": "US Polo T-Shirt",
        "productPrice": 1100,
        "createdDate": "2019-03-16T15:21:33.670Z",
        "allCategories": [
            "Men's Shirt",
            "Clothing",
            "Men's Clothing"
        ],
        "categories": [
            "Men's Shirt"
        ],
        "id": "5c8d147dc1716d57080f3128"
    }
}
