const mongoose = require("mongoose");

const connectDb = async (req, res) => {
    await mongoose.connect(process.env.CONNECTION_STRING)
        .then(() => {
            console.log("Database connected....")
        })
}

module.exports = connectDb()