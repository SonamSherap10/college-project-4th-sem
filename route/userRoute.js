const { viewBookingRequest, settleBookingRequest } = require('../controller/user/EmployeeController');
const { viewProfessionals, BookProfessional } = require('../controller/user/userController');
const isAuthenticated = require('../middleware/Authentication');
const extractLocationData = require('../middleware/extractLocation');

const router = require('express').Router();

//customer routes
router.get('/viewProfessionals',isAuthenticated,extractLocationData,viewProfessionals)
router.post('/bookProfessionals/:id',isAuthenticated,extractLocationData,BookProfessional)


//employee routes
router.get('/viewBookings',isAuthenticated,viewBookingRequest)
router.post('/settleBooking/:id',isAuthenticated,settleBookingRequest)

module.exports = router