const express = require('express');
const { createOrder, capturePayment,  getOrderDetails, getAllOrderByUserId, } = require('../../controlers/shop/order-controller');


const router = express.Router();

router.post('/create',createOrder)
router.post('/capture', capturePayment);
router.get('/list/:userId',getAllOrderByUserId);
router.get('/details/:id',getOrderDetails)

module.exports = router;