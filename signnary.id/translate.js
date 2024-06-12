const express = require('express')
const router = express.Router()

// Function to map text to image URLs
function getSignLanguageImage(text) {
    const imageMapping = {
        "hello": "https://storage.googleapis.com/sabi-bucket/hello.png",
        "thank you": "https://storage.googleapis.com/sabi-bucket/thank_you.png",
        // Tambahkan mapping lainnya sesuai kebutuhan
    };

    return imageMapping[text.toLowerCase()] || "https://storage.googleapis.com/sabi-bucket/default.png";
}

router.post('/', (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).send({ error: 'Text is required' });
    }

    const imageUrl = getSignLanguageImage(text);
    res.send({ imageUrl });
})

module.exports = router;
