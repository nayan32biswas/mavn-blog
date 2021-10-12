
const validMimeType = ['image/gif', 'image/jpeg', 'image/pjpeg', 'image/x-png', 'image/png', 'image/svg+xml'];
exports.fileFilter = (req, file, callback) => {
    if (validMimeType.indexOf(file.mimetype) > -1) {
        callback(null, true);
    }
    else {
        callback(new Error("invalid image file"), false);
    }
}

exports.getImageName = (file) => {
    return new Date().toISOString() + file.originalname;
}