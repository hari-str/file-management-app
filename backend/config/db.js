const mongoose = require('mongoose')

const connectDB = async () => {
    const MONGODB_URL = process.env.MONGODB_URL
    try {
        await mongoose.connect(MONGODB_URL)
        console.log("MongoDB connected...")
    } catch (error) {
        console.log("Database connection error", error)
        process.exit(1)
    }
}

module.exports = connectDB