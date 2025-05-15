const express = require('express');
const upload = require('../middleware/upload');
const router = express.Router();
const listController = require('../controllers/listController');

router.post('/upload-list', upload.single('file'), listController.uploadList);

router.get('/my-lists', listController.getList);

router.delete('/deletelists', listController.deleteList);

module.exports = router;
