const { viewBookingRequest, settleBookingRequest, workCompletion, viewBookedRequests } = require('../controller/user/employeeController');
const { viewProfessionals, BookProfessional, viewCompletedWorks, rateProfessional, viewBookedWorkers, cancelBooking, viewRequests } = require('../controller/user/userController');
const allowTo = require('../middleware/allowTo');
const isAuthenticated = require('../middleware/authentication');
const extractLocationData = require('../middleware/extractLocation');
const router = require('express').Router();

//customer routes
router.get('/viewProfessionals',isAuthenticated,extractLocationData,allowTo("Client"),viewProfessionals)
router.post('/bookProfessionals/:id',isAuthenticated,extractLocationData,allowTo("Client"),BookProfessional)
router.get('/viewRequests',isAuthenticated,allowTo("Client"),viewRequests)
router.post('/cancelBooking/:id',isAuthenticated,allowTo("Client"),cancelBooking)
router.get('/viewBookedWorkers',isAuthenticated,allowTo("Client"),viewBookedWorkers)
router.get('/viewCompletedRequests',isAuthenticated,allowTo("Client"),viewCompletedWorks)
router.post('/rateWorker/:id',isAuthenticated,allowTo("Client"),rateProfessional)


//employee routes
router.get('/viewBookings',isAuthenticated,allowTo("Employee"),viewBookingRequest)
router.get('/viewBookedRequests',isAuthenticated,allowTo("Employee"),viewBookedRequests)
router.post('/settleBooking/:id',isAuthenticated,allowTo("Employee"),settleBookingRequest)
router.post('/requestCompletion/:id',isAuthenticated,allowTo("Employee"),workCompletion)

module.exports = router