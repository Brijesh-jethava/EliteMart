const express = require('express');
const { getAllOrdersOfAllUsers, getOrderDetailsForAdmin, updateOrderStatus} = require('../../controlers/admin/order-contoller');


const router = express.Router();


router.get('/get',getAllOrdersOfAllUsers);
router.get('/details/:id',getOrderDetailsForAdmin);
router.put('/update/:id',updateOrderStatus);

module.exports = router;