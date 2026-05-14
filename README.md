# Week 3 - MongoDB & REST API

## MongoDB Operations
CRUD operations on a `users` collection using operators like `$in`, `$and`, `$set`, `$unset`, `deleteOne`, `deleteMany`.

Array manipulation with `$push`, `$pull`, `$pop`, `$addToSet`, and `$each`.

ex-
db.users.find({ age: { $in: [19, 21] } })

db.users.updateOne({ name: "lexus" }, { $set: { contact: 777777 } })

db.users.updateOne({ name: "lexus" }, { $push: { skills: "Angular" } })

db.users.deleteMany({ age: 19 })


## REST API (Express + Mongoose)
Built a product CRUD API connected to MongoDB. Two Express apps running on ports 3030 (users) and 4040 (products).

Routes: `GET`, `POST`, `PUT`, `DELETE` on `/product-api/products` and `/product-api/products/:id`

Mongoose schema with validation — required fields, min/max on price, timestamps.
