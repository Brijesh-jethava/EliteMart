import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent } from '../ui/dialog'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { StarIcon } from 'lucide-react'
import { Input } from '../ui/input'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice'
import { useToast } from '@/hooks/use-toast'
import { setProductDetails } from '@/store/shop/products-slice'
import { useLocation } from "react-router-dom";
import { Label } from '../ui/label'
import StarRatingComponent from '../common/star-rating'
import { addReview, getReviews } from '@/store/shop/review-slice'



const ProductDetailsDialog = ({open,setOpen,productDetails}) => {

  const [reviewMsg,setReviewMsg]= useState('');
  const[rating,setRating] = useState(0)
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth)
  const {toast} = useToast();
  const location = useLocation();
  const {cartItems}  = useSelector(state => state.shopCart)
  const {reviews}  = useSelector(state => state.shopReview)

  const handleRatingChange =(getRating)=>{
     setRating(getRating)
  }

   const handleAddToCart = (getCurrentProductId , getTotalStock)=>{

    let getCartItems = cartItems.items || [];

    
    if(getCartItems.length){
     const indexOfCurrentItem = getCartItems.findIndex(item => item.productId === getCurrentProductId);
     if(indexOfCurrentItem > -1) {
       const getQuantity = getCartItems[indexOfCurrentItem].quantity;
       if(getQuantity+1 > getTotalStock)
       {
         toast({
           duration: 2000,
           title : `only ${getTotalStock} items available` ,
           style: { backgroundColor: 'red', color: 'white' }
         });

         return;
       }
     }

    }

    if (!user) {
      return toast({ 
        title: 'Please log in first',
        style: { backgroundColor: 'red', color: 'white' }
       });
    }
    if (!productDetails?._id) {
      return toast({ 
        title: 'Product details missing',
        style: { backgroundColor: 'red', color: 'white' }
       });
    }
        dispatch(
        addToCart({ 
          userId:user?.id, 
          productId:productDetails?._id, 
          quantity:1})
      ).then(data => {
        if(data?.payload?.success){
          dispatch(fetchCartItems(user?.id))
          toast({
            title:'Product is added to cart',
            style: { backgroundColor: 'white', color: 'black' }
          })
        }
      });
    }

    function handleDialogClose (){
      setOpen(false)
      dispatch(setProductDetails(null))
      setRating(0);
      setReviewMsg('')
    }

    const handleAddReview = ()=>{
      const data = {
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      };
    
      dispatch(addReview(data))
        .then((data) => {
          if(data.payload.success){
            dispatch(getReviews(productDetails?._id))
            setRating(0);
            setReviewMsg('')
            toast({
              title : 'Review added successfuly!'
            })
          }
         
        });
    }

    useEffect(() => {
      if (open) setOpen(false);
    }, [location.pathname]);

    useEffect(()=>{
      if(productDetails !== null){
         dispatch(getReviews(productDetails?._id))
      } 
    },[productDetails])

  
    const averageReview = reviews && reviews.length > 0 ?
    reviews.reduce((sum,reviewItem) => sum + reviewItem.reviewValue, 0) / reviews.length : 0 ;
    
 
  return (
    <Dialog open={open} onOpenChange={handleDialogClose} >
       <DialogContent className="grid grid-cols-2 gap-2 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:ma-w-[70vw] bg-white">
           <div className='relative overflow-hidden rounded-lg'>
                <img src={productDetails?.image} alt={productDetails?.title} width={600} height={600} className='aspect-square w-full object-cover'/>
           </div>

           <div className='ml-5 '>
               <h1 className='text-3xl font-extrabold'>{productDetails?.title}</h1>
               <p className='text-muted-foreground text-2xl mb-5 mt-4'>{productDetails?.description}</p>

               <div className='flex items-center justify-between'>
                  <p className={`text-3xl font-bold text-primary ${productDetails?.salePrice > 0 ? 'line-through' : ''}`}>{productDetails?.price}</p>
                 {
                  productDetails?.salePrice > 0 ? <p className='text-2xl font-bold text-muted-foreground'>{productDetails?.salePrice}</p> : null
                 }
               </div>
               <div className="flex items-center gap-2 mt-2">

               <div className="flex items-center gap-0.5">
                    <StarRatingComponent rating={averageReview}/>
               </div>
                    <span className='text-muted-foreground'>({averageReview.toFixed(2)})</span>
               </div> 
              <div className='mt-5 mb-5'>
                {productDetails?.totalStock === 0 ? <Button className='bg-black text-white w-full opacity-65 cursor-not-allowed'>Out of Stock</Button> : <Button className='bg-black text-white w-full' onClick = {()=>handleAddToCart(productDetails?._id, productDetails?.totalStock)}>Add to cart</Button>}
                
              </div>

              <Separator className='bg-gray-200'/>
              <div className='max-h-[300px] overflow-auto'>
                   <h2 className='text-xl font-bold mb-4'>Reviews</h2>
                   <div className='grid gap-6'>
                    {
                      reviews && reviews.length > 0 ?
                      reviews.map(reviewItem => <div className='flex gap-4'>
                        <Avatar className='w-10 h-10 border'>
                            <AvatarFallback>{reviewItem?.userName[0].toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className=' grid gap-1 '>
                              <div className="flex items-center gap-2">
                                  <h3 className='font-bold'>{reviewItem?.userName}</h3>
                              </div>
                              <div className="flex items-center gap-0.5">
                                <StarRatingComponent rating={reviewItem?.reviewValue}/>
                              </div>
                              <p className='text-muted-foreground'>
                                {reviewItem?.reviewMessage}
                              </p>
                        </div>
                    </div>) : <h1>No Reviews</h1>
                    }
                        
                   </div>
                   <div className='mt-10 flex-col gap-2 p-2'>
                    <Label>Write a review</Label>
                    <div className='flex gap-1 p-2'> 
                      <StarRatingComponent rating={rating} handleRatingChange ={handleRatingChange}/>
                    </div>
                    <Input  name='reviewMsg' value={reviewMsg} onChange={(event) => setReviewMsg(event.target.value)} placeholder='Write Your Review Here...'/>
                    <Button onClick={handleAddReview} className='bg-black text-white mt-4' disabled={reviewMsg.trim() === '' }>Submit</Button>
                   </div>
              </div> 

            </div>
          
       </DialogContent>
    </Dialog>
  )
}

export default ProductDetailsDialog
