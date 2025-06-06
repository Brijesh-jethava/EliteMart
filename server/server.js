const express = require('express');
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();
const authRouter = require('./routes/auth/auth-routes')
const adminProductRouter = require('./routes/admin/products-routes')
const shopProductRouter = require('./routes/shop/products-routes')
const shopCartRouter = require('./routes/shop/cart-routes')
const shopAddressRouter = require('./routes/shop/address-routes')
const shopOrderRouter = require('./routes/shop/order-routes');
const adminOrderRouter = require('./routes/admin/order-routes');
const shopSearchRouter = require('./routes/shop/search-routes');
const shopReviewRouter = require('./routes/shop/review-routes');
const commonFeatureRouter = require('./routes/common/feature-routes');

const app = express();

mongoose.
   connect(process.env.MONGO_URI, 
   )
   .then(()=>console.log("Database connected successfuly..."))
   .catch((error)=>console.log(error));
   
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin:"https://elitemart-5.onrender.com",
        methods:['GET','POST','DELETE','PUT'],
        allowedHeaders:[
            'Content-Type',
            'Authorization',
            'Cache-Control',
            'Expires',
            'Pragma'
        ],
        credentials: true
    })
);

app.use(cookieParser());  
app.use(express.json());
app.use('/api/auth',authRouter);


app.use('/api/shop/products',shopProductRouter);
app.use('/api/shop/cart',shopCartRouter)
app.use('/api/shop/address',shopAddressRouter)
app.use('/api/shop/order',shopOrderRouter)
app.use('/api/shop/search',shopSearchRouter)
app.use('/api/shop/review', shopReviewRouter)

app.use('/api/admin/products',adminProductRouter);
app.use('/api/admin/orders',adminOrderRouter)
app.use('/api/common/feature',commonFeatureRouter)


app.listen(PORT, ()=>console.log(`Server is now running on port ${PORT}`))

