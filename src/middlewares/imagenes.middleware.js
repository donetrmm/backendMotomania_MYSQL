const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public'); // Directorio de destino de las imágenes
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const randomName = crypto.randomBytes(20).toString('hex'); // Genera un nombre aleatorio
    const uniqueFilename = `${randomName}${extension}`;
    cb(null, uniqueFilename);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
