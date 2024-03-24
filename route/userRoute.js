const { viewBookingRequest, settleBookingRequest, workCompletion, viewBookedRequests, addQualifications, deleteQualification, updateQualification } = require('../controller/user/employee/employeeController');
const {  BookProfessional, viewCompletedWorks, rateProfessional, viewBookedWorkers, cancelBooking, viewRequests } = require('../controller/user/client/userController');
const allowTo = require('../middleware/allowTo');
const isAuthenticated = require('../middleware/authentication');
const extractLocationData = require('../middleware/extractLocation');
const VerifyEmp = require('../middleware/isVerified');
const router = require('express').Router();
const CatchError = require('../services/catchError')
const {multer,storage}= require("./../middleware/multerConfig");
const upload = multer({
   storage: storage 
  })


//customer routes
router.post('/bookProfessionals/:id',isAuthenticated,extractLocationData,allowTo("Client"),CatchError(BookProfessional))
router.get('/viewRequests',isAuthenticated,allowTo("Client"),CatchError(viewRequests))
router.post('/cancelBooking/:id',isAuthenticated,allowTo("Client"),CatchError(cancelBooking))
router.get('/viewBookedWorkers',isAuthenticated,allowTo("Client"),CatchError(viewBookedWorkers))
router.get('/viewCompletedRequests',isAuthenticated,allowTo("Client"),CatchError(viewCompletedWorks))
router.post('/rateWorker/:id',isAuthenticated,allowTo("Client"),CatchError(rateProfessional))


//employee routes
router.post('/addQualifications',isAuthenticated,upload.array("Qualifications"),allowTo("Employee"),CatchError(addQualifications))
router.post('/updateQualifications',isAuthenticated,upload.single("image"),allowTo("Employee"),CatchError(updateQualification))
router.post('/deleteQualifications',isAuthenticated,allowTo("Employee"),CatchError(deleteQualification))
router.get('/viewBookings',isAuthenticated,allowTo("Employee"),VerifyEmp,CatchError(viewBookingRequest))
router.get('/viewBookedRequests',isAuthenticated,allowTo("Employee"),VerifyEmp,CatchError(viewBookedRequests))
router.post('/settleBooking/:id',isAuthenticated,allowTo("Employee"),VerifyEmp,CatchError(settleBookingRequest))
router.post('/requestCompletion/:id',isAuthenticated,allowTo("Employee"),VerifyEmp,CatchError(workCompletion))

module.exports = router