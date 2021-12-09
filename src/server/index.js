var path = require('path')
const express = require('express')
const cors = require('cors')
const fetch = require('node-fetch')
const bodyParser = require('body-parser')
var FormData = require('form-data');

const dotenv = require('dotenv');
// const fetch = require("node-fetch")
dotenv.config();
const mockAPIResponse = require('./mockAPI.js')
const { stat } = require('fs')

const app = express()

// You could call it aylienapi, or anything else

let meaningCloudKey = meaningCloudObject = {
    application_id: process.env.API_ID
};
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
// app.use(cors({ origin: "https://api.meaningcloud.com/sentiment-2.1", credentials: true }))
console.log("WHATEVER " + meaningCloudKey.application_id)
app.use(express.static('dist'))

// console.log(__dirname)

app.get('/', function(req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('dist/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function() {
    console.log('Example app listening on port 8081!')
})
app.get("/getKey", function(req, res) {
    console.log("Called")
    let keyObj = { "key": meaningCloudKey.application_id, "code": 200 }
    return res.json(keyObj)
})