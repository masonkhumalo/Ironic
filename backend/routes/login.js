const express = require('express');

const router = express();

const { login,getAllUsers,getUserById} = require('../controllers/login');

router.post('/login' , login); 
router.get('/getAllUsers' , getAllUsers);
router.get('/getUserById/:id' , getUserById);


module.exports = router;