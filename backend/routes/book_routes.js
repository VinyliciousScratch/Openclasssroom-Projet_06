const express = require('express');
const router = express.Router();
const bookCtrl = require('../controllers/book');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')
const sharp = require('../middleware/sharp-config')


router.post('/', auth, multer,sharp.uploadImage, bookCtrl.addbook );

router.post('/:id/rating',auth, bookCtrl.rating );

router.get('/bestrating', bookCtrl.bestrating);

router.get('/', bookCtrl.listbook);

router.get('/:id', bookCtrl.getidbook);

router.put('/:id', auth, multer,sharp.uploadImage, bookCtrl.updateidbook);

router.delete('/:id', auth, bookCtrl.deletebook);



module.exports = router;
