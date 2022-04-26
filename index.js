
const express = require('express');
const bodyParser = require('body-parser');
require("dotenv").config()
const { mongoose } = require('mongoose');
const Book = require("./modal/book")

const app = express();

// Parses the text as url encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Parses the text as json
app.use(bodyParser.json());

app.get("/", (req, res, next) => {
    res.json({
        messahe: "welcome"
    })
})

app.post("/addBooks", (req, res, next) => {
    const payload = req.body
    const book = new Book(payload);
    book.save().then(() => console.log("Added!")).catch((err) => console.log(err))
    return res.json({
        message: "Data Stored!",
        data: payload
    })
})

app.get("/getBooks", (req, res, next) => {
    Book.find().then((resObj) => {
        return res.json({
            message: "data found",
            resObj: resObj
        })
    })
})

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((res) => {
    console.log("Connected to Databse")
    app.listen(process.env.PORT, () => {
        console.log("Connected!")
    })
}).catch(err => console.log(err))