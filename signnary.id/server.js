require('@google-cloud/debug-agent').start()

const express = require('express')
const bodyParser = require('body-parser')
const ImgUpload = require('./imgUpload')
const translateRouter = require('./translate')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json()) // Enable parsing JSON bodies

app.use('/upload', ImgUpload.uploadToGcs, (req, res) => {
    res.send({
        status: 'success',
        url: req.file.cloudStoragePublicUrl
    });
})

app.use('/translate', translateRouter)

app.get("/", (req, res) => {
    console.log("Response success")
    res.send("Success!")
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log("Server is up and listening on " + PORT)
})
