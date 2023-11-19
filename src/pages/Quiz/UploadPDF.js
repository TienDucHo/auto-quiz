const express = require('express');
const multer = require('multer');
const app = express.Router();
const pdfParse = require('pdf-parse');
const port = 5173;
const upload = multer({ storage: multer.memoryStorage() });

app.post('/uploadPDF', upload.single('pdf'), (req, res) => {
    try {
        let dataBuffer = req.file.buffer;

        pdfParse(dataBuffer).then(function(data) {
            console.log(data.text);  // context of pdf
            res.send(data.text);
        });
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

module.exports = app;
