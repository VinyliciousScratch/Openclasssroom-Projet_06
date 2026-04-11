const express = require('express');
const router = express.Router();
const userinfoCtrl = require('../controllers/userinfo')

router.post('/signup', userinfoCtrl.signup );

router.post('/login', userinfoCtrl.login );

module.exports = router;
