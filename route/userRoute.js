const { viewBookingRequest, settleBookingRequest, workCompletion, viewBookedRequests } = require('../controller/user/employeeController');
const { viewProfessionals, BookProfessional, viewCompletedWorks, rateProfessional, viewBookedWorkers, cancelBooking, viewRequests } = require('../controller/user/userController');
const allowTo = require('../middleware/allowTo');
const isAuthenticated = require('../middleware/authentication');
const extractLocationData = require('../middleware/extractLocation');
const router = require('express').Router();
const CatchError = require('../services/catchError')

//customer routes
router.get('/viewProfessionals',isAuthenticated,extractLocationData,allowTo("Client"),CatchError(viewProfessionals))
router.post('/bookProfessionals/:id',isAuthenticated,extractLocationData,allowTo("Client"),CatchError(BookProfessional))
router.get('/viewRequests',isAuthenticated,allowTo("Client"),CatchError(viewRequests))
router.post('/cancelBooking/:id',isAuthenticated,allowTo("Client"),CatchError(cancelBooking))
router.get('/viewBookedWorkers',isAuthenticated,allowTo("Client"),CatchError(viewBookedWorkers))
router.get('/viewCompletedRequests',isAuthenticated,allowTo("Client"),CatchError(viewCompletedWorks))
router.post('/rateWorker/:id',isAuthenticated,allowTo("Client"),CatchError(rateProfessional))


//employee routes
router.get('/viewBookings',isAuthenticated,allowTo("Employee"),CatchError(viewBookingRequest))
router.get('/viewBookedRequests',isAuthenticated,allowTo("Employee"),CatchError(viewBookedRequests))
router.post('/settleBooking/:id',isAuthenticated,allowTo("Employee"),CatchError(settleBookingRequest))
router.post('/requestCompletion/:id',isAuthenticated,allowTo("Employee"),CatchError(workCompletion))

module.exports = router