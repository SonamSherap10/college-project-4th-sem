const { viewUnverifiedEmployee, verifyEmployee } = require('../controller/admin/adminController');
const isAuthenticated = require('../middleware/Authentication');

const router = require('express').Router();

router.get('/viewUnverifiedEmployee',isAuthenticated,viewUnverifiedEmployee)
router.post('/verifyEmployee/:id',isAuthenticated,verifyEmployee)

module.exports = router