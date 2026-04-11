const express = require('express');
const router = express.Router();
const bookCtrl = require('../controllers/book');
const auth = require('../middleware/auth');


router.post('/', auth, bookCtrl.addbook );

router.get('/', bookCtrl.listbook);

router.get('/:id ', bookCtrl.getidbook);

router.put('/:id', auth, bookCtrl.updateidbook);

router.delete('/:id', auth, bookCtrl.deletebook);



module.exports = router;
