// Creating HTTP servers (two Express applications)
import exp from 'express'
import { connect } from 'mongoose' // Mongoose is an ODM (Object Document Mapping) driver for MongoDB
import { userApp } from './APIs/userApi.js'
import { prodApp } from './APIs/prodApi.js'
import cookieParser from 'cookie-parser'

const app = exp()
const pro = exp()

app.use(exp.json())
app.use(cookieParser())
pro.use(exp.json())
pro.use(cookieParser())

// Forward requests to userApp if path starts with /user-api
app.use("/user-api", userApp)
// Forward requests to prodApp if path starts with /product-api
pro.use("/product-api", prodApp)

app.listen(3030, () => console.log("Server running on port 3030 for User API"))
pro.listen(4040, () => console.log("Server running on port 4040 for Product API"))

// Connect to MongoDB
async function connectDB() {
    try {
        await connect("mongodb://localhost:27017/merndb2") // Replace localhost with 127.0.0.1 if connection issues arise
        console.log("DB connection success")
    } catch (err) {
        console.log("Error in DB connection:", err)
    }
}
connectDB()

// Error handling middleware for User API
app.use((err, req, res, next) => {
    console.log(err.name)
    // Validation error (e.g. required fields missing, min/max violations)
    if (err.name === 'ValidationError') {
        return res.status(400).json({ message: "Validation error occurred", err })
    }
    // CastError (e.g. invalid MongoDB ObjectId format)
    if (err.name === 'CastError') {
        return res.status(400).json({ message: "Invalid ID format", err })
    }
    // Generic server-side error
    res.status(500).json({ message: "Error occurred", error: "Server side error" })
})

// Error handling middleware for Product API
pro.use((err, req, res, next) => {
    console.log(err.name)
    // Validation error
    if (err.name === 'ValidationError') {
        return res.status(400).json({ message: "Validation error occurred", err })
    }
    // CastError
    if (err.name === 'CastError') {
        return res.status(400).json({ message: "Invalid ID format", err })
    }
    // Generic server-side error
    res.status(500).json({ message: "Error occurred", error: "Server side error" })
})
