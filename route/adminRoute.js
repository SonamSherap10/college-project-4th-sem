const { viewUnverifiedEmployee, verifyEmployee, viewEmployee, viewClients, deleteUser } = require('../controller/admin/adminController');
const allowTo = require('../middleware/allowTo');
const isAuthenticated = require('../middleware/authentication');

const router = require('express').Router();

router.get('/viewUnverifiedEmployee',isAuthenticated,allowTo("Admin"),viewUnverifiedEmployee)
router.post('/verifyEmployee/:id',isAuthenticated,allowTo("Admin"),verifyEmployee)
router.get('/view/Employees',isAuthenticated,allowTo("Admin"),viewEmployee)
router.get('/view/Clients',isAuthenticated,allowTo("Admin"),viewClients)
router.delete('/delete/:id',isAuthenticated,allowTo("Admin"),deleteUser)

module.exports = router