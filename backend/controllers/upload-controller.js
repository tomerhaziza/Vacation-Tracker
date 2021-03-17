const multer = require('multer');

// Multer file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads'); // Uploaded pictures path
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);  // Uploaded pictures new name format
    }
})

const fileFilter = (req, file, cb) => {
    // Accept only JPEG and PNG files
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
})

module.exports = {
    upload
}