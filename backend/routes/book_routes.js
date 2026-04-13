const express = require('express');
const router = express.Router();
const bookCtrl = require('../controllers/book');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')

router.post('/', auth, multer, bookCtrl.addbook );

router.get('/', bookCtrl.listbook);

router.get('/:id', bookCtrl.getidbook);

router.put('/:id', auth, multer, bookCtrl.updateidbook);

router.delete('/:id', auth, bookCtrl.deletebook);



module.exports = router;
