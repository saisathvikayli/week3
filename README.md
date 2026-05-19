Week 3 - MongoDB Operations & Production REST API
This repository covers two major topics: hands-on MongoDB shell practice with CRUD and advanced query operations, and building a production-style REST API using Express.js and Mongoose.

1. MongoDB Operations (mongodb ops/practice.txt)
All queries were practiced live in the MongoDB shell against a users collection in the merndb2 database. The file contains the commands alongside their actual output.
Querying
$in — Match documents where a field value is any one of the listed values:
jsdb.users.find({ age: { $in: [19, 21] } })
$and — Match documents satisfying multiple conditions simultaneously:
jsdb.users.find({ $and: [{ age: 19 }, { name: "lexus" }] })
$all — Match documents where an array field contains all specified values (order-independent):
jsdb.users.find({ skills: { $all: ["React", "Mongo", "Express"] } })
Exact array match — Match documents where the array field is exactly equal (order-sensitive):
jsdb.users.find({ skills: ["React", "Express", "Mongo"] })
Projection — Control which fields are returned in results:
jsdb.users.find({}, { name: 1 })                          // only name
db.users.find({ name: "lexus" }, { name: 1, skills: 1 }) // name and skills

Updating
$set — Add a new field or update an existing one:
jsdb.users.updateOne({ name: "Hexus" }, { $set: { name: "Texas", id: 104 } })
db.users.updateOne({ name: "lexus" }, { $set: { contact: 777777 } })
Nested field update using dot notation:
jsdb.users.updateOne({ name: "lexus" }, { $set: { "address.city": "LA" } })
$unset — Remove a field from a document:
jsdb.users.updateOne({ name: "lexus" }, { $unset: { "address.city": "" } })

Deleting
jsdb.users.deleteOne({ id: 103 })        // deletes first matching document
db.users.deleteMany({ age: 19 })       // deletes all matching documents

Array Operators
OperatorDescription$pushAppends a single element to an array$pullRemoves all occurrences of a specific value$popRemoves the first (-1) or last (+1) element$addToSetAdds an element only if it doesn't already exist$eachUsed with $push or $addToSet to insert multiple values at once
Examples:
jsdb.users.updateOne({ name: "lexus" }, { $push: { skills: "Angular" } })
db.users.updateOne({ name: "lexus" }, { $addToSet: { skills: "Angular" } })
db.users.updateOne({ name: "lexus" }, { $addToSet: { skills: { $each: ["Angular", "Mongo"] } } })
db.users.updateOne({ name: "lexus" }, { $pop: { skills: +1 } })
db.users.updateOne({ name: "lexus" }, { $pull: { skills: "Angular" } })

Observed behaviour: $addToSet with "Angular" returned modifiedCount: 0 when the value already existed, confirming its deduplication behaviour. $push allowed duplicates.


2. Production REST API (week3/prod rest api/)
A full-stack backend split across two Express applications, both connected to the same MongoDB database.
Architecture
AppPortRoute PrefixHandlesapp3030/user-apiUser CRUD + Loginpro4040/product-apiProduct CRUD

server.js — Server Setup
Creates two Express instances, registers express.json() and cookie-parser middleware, mounts the routers, and connects to MongoDB using Mongoose.
jsawait connect("mongodb://localhost:27017/merndb2")

app.use("/user-api", userApp)
pro.use("/product-api", prodApp)

app.listen(3030, () => console.log("server on port 3030 for UserApi.."))
pro.listen(4040, () => console.log("server started on port 4040 for ProductApi.."))
An error-handling middleware scaffold is included (commented out) for handling ValidationError and CastError from Mongoose.

prodModel.js — Mongoose Schema
Defines the schema for the products collection with validation rules:
FieldTypeValidationproductIdNumberRequiredproductNameStringRequiredpriceNumberRequired, min: 10,000, max: 50,000brandStringRequired
Options: versionKey: false, timestamps: true (auto-generates createdAt and updatedAt).
jsconst prodSchema = new Schema({
    price: { type: Number, min: [10000, "..."], max: [50000, "..."] },
    ...
}, { versionKey: false, timestamps: true })

prodApi.js — Product Route Handlers
All routes are on an Express Router exported as prodApp.
MethodEndpointActionPOST/productsCreate a new productGET/productsGet all productsGET/products/:idGet a product by MongoDB ObjectIdPUT/products/:idUpdate a product ($set + runValidators)DELETE/products/:idDelete a product by ID
js// Create
const newprodDoc = new pModel(req.body)
await newprodDoc.save()

// Read one
const product = await pModel.findById(req.params.id)

// Update
await pModel.findByIdAndUpdate(id, { $set: { ...req.body } }, { new: true, runValidators: true })

// Delete
await pModel.findByIdAndDelete(req.params.id)

client.http — API Test Requests
Uses the VS Code REST Client extension to test all endpoints directly from the editor.
http### Get all products
GET http://localhost:4040/product-api/products

### Create a product
POST http://localhost:4040/product-api/products
Content-Type: application/json
{ "productId": 3, "productName": "Table", "price": 25000, "brand": "Furnx" }

### Update a product
PUT http://localhost:4040/product-api/products/1
Content-Type: application/json
{ "productId": 2, "productName": "Fan", "price": 30000, "brand": "Orient" }

### Delete a product
DELETE http://localhost:4040/product-api/products/69aba260a69a6a53840dcf21

Concepts Covered

MongoDB query operators: $in, $and, $all, exact array match, field projection
MongoDB update operators: $set, $unset, dot-notation for nested fields
MongoDB array operators: $push, $pull, $pop, $addToSet, $each
Delete operations: deleteOne, deleteMany
Mongoose schema design with field-level validation (required, min, max, timestamps)
Express Router for modular, separated API design
Full CRUD with Mongoose: save(), find(), findById(), findByIdAndUpdate(), findByIdAndDelete()
Dual Express app architecture running on separate ports
Error handling middleware pattern in Express
