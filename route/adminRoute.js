const { viewUnverifiedEmployee, verifyEmployee, viewEmployee, viewClients, deleteUser, viewBookings, deleteBooking } = require('../controller/admin/adminController');
const allowTo = require('../middleware/allowTo');
const isAuthenticated = require('../middleware/authentication');
const catchError = require('../services/catchError');
const CatchError = require('../services/catchError');

const router = require('express').Router();

router.get('/viewUnverifiedEmployee',isAuthenticated,allowTo("Admin"), CatchError(viewUnverifiedEmployee))
router.post('/verifyEmployee/:id',isAuthenticated,allowTo("Admin"),CatchError(verifyEmployee))
router.get('/view/Employees',isAuthenticated,allowTo("Admin"),CatchError(viewEmployee))
router.get('/view/Clients',isAuthenticated,allowTo("Admin"),CatchError(viewClients))
router.delete('/delete/:id',isAuthenticated,allowTo("Admin"),CatchError(deleteUser))
router.get("/viewBookings",isAuthenticated,allowTo("Admin"),CatchError(viewBookings))
router.delete('/deleteBooking/:id',isAuthenticated,allowTo("Admin"),catchError(deleteBooking))

module.exports = router