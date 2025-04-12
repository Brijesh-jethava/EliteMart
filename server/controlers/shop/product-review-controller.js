const Order = require('../../models/Order')
const Product = require('../../models/Product')
const ProductReview = require('../../models/Review')

const addProductReview = async(req,res) =>{
    try{
        const {productId,userId,userName,reviewMessage,reviewValue} = req.body;

        //Object to check if the user has purchase the product then only he can add the review
        const order = await Order.findOne({
            userId,
            'cartItems.productId': productId,
             orderStatus : 'confirmed'
        })

        if(!order){
            return res.status(403).json({
                success:false,
                message:'You need to purchase product to review it.'
            })
        }

        //Object to check if the user has already reviewed the product
        const checkExistingReview = await ProductReview.findOne({productId,userId})

        if(checkExistingReview){
            return res.status(400).json({
                success:false,
                message: 'You can add review only once'
            })
        }

        const newReview = new ProductReview({
            productId,userId,userName,reviewMessage,reviewValue
        })

        await newReview.save()

        const reviews = await ProductReview.find({productId});
        const totalReviewsLength = reviews.length;
        const averageReview = reviews.reduce((sum,reviewItem) => sum + reviewItem.reviewValue, 0) / totalReviewsLength;

        await Product.findByIdAndUpdate(productId, {averageReview});

        res.status(201).json({
            success:true,
            data:newReview
        })

    }catch(error){
       
        res.status(500).json({
            success:false,
            message:'Some Error occured'
        })
    }
}

const getProductReviews = async(req,res) =>{
    try{
        const {productId} = req.params;

        const reviews = await ProductReview.find({productId});

        res.status(200).json({
            success:true,
            data:reviews
        })

    }catch(error){
      
        res.status(500).json({
            success:false,
            message:'Some Error occured'
        })
    }
}

module.exports = {addProductReview,getProductReviews}