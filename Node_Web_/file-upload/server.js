const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Define the folder where uploaded files will be saved
const uploadFolder = path.join(__dirname, 'uploads');

// Create the folder if it does not exist
if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder);
}

// Set up multer for file upload handling
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, uploadFolder); // Save files to the 'uploads' folder
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname); // Use the original file name
    }
});

const upload = multer({ storage: storage });

// Serve static files (e.g., the HTML, CSS, and JS files)
app.use(express.static('public'));

// Handle file uploads
app.post('/upload', upload.array('file'), (req, res) => {
    const files = req.files.map(file => ({
        name: file.originalname,
        type: file.mimetype
    }));
    res.json({ message: 'File uploaded and saved successfully!', files });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
