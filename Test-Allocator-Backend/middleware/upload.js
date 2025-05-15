const multer = require('multer');
const path = require('path');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['.csv', '.xlsx', '.xls'];
  const ext = path.extname(file.originalname);
  cb(null, allowedTypes.includes(ext));
};

module.exports = multer({ storage, fileFilter });