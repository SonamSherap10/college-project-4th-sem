const { initializePayment, verifyPayment } = require('../controller/user/client/paymentController');
const allowTo = require('../middleware/allowTo');
const isAuthenticated = require('../middleware/authentication');
const CatchError = require('../services/catchError')
const router = require('express').Router();

router.post("/initiatePayment/:id",isAuthenticated,allowTo("Client"),CatchError(initializePayment));
router.post("/verifyPayment",isAuthenticated,CatchError(verifyPayment));

module.exports = router 