import React, { useState } from 'react'
import image from '../../assets/shopping-for-new-year-why-use-your-credit-card-d.jpg'
import Address from '@/components/shopping-view/address'
import { useDispatch, useSelector } from 'react-redux'
import UserCartTtemsContent from '@/components/shopping-view/cart-items-content'
import { Button } from '@/components/ui/button'
import { createNewOrder } from '@/store/shop/order-slice'
import { useToast } from '@/hooks/use-toast'



const ShoppingCheckout = () => {

  const {cartItems} = useSelector(state => state.shopCart)
  const {user} = useSelector(state => state.auth)
  const {approvalURL} = useSelector(state => state.shopOrder)
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart,setIsPaymentStart] = useState(false);
  const dispatch = useDispatch();
  const {toast} = useToast();

  const toatalCartAmount = cartItems && cartItems.items &&  cartItems.items.length > 0 ?
      cartItems.items.reduce((sum,currentItem) => sum + (currentItem?.salePrice > 0 ? currentItem?.salePrice : currentItem?.price) * currentItem?.quantity,0) : 0;

  const handleInitiatePaypalPayment = ()=>{


    if(!cartItems || !cartItems.items || cartItems.items.length === 0){
      toast({
       title:'Your cart is empty. Please add item to proceed',
       style: { backgroundColor: 'red', color: 'white' },
       })

      return; 
   }
   
    if(currentSelectedAddress === null){
       toast({
        title:'Please select one address to proceed',
        style: { backgroundColor: 'red', color: 'white' }
       })

       return; 
    }



    

    const orderData = {
      userId: user?.id,
      cartItems : cartItems.items.map(singleCartItem => ({
        productId : singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price: singleCartItem?.salePrice > 0 ? singleCartItem?.salePrice : singleCartItem?.price,
        quantity: singleCartItem?.quantity
      })),
      addressInfo:{
        addressId : currentSelectedAddress?._id, 
        address : currentSelectedAddress?.address,
        city:currentSelectedAddress?.city,
        pincode:currentSelectedAddress?.pincode,
        phone:currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      } ,
      orderStatus: 'pending', 
      paymentMethod: 'paypal', 
      paymentStatus: 'pending' ,
      totalAmount : toatalCartAmount,
      orderDate : new Date(),
      orderUpdateDate: new Date(),
      paymentId: '',
      payerId: '',
     }

   

    dispatch(createNewOrder(orderData)).then((data)=>{
      (data,'Brijesh')
      if(data?.payload?.success){
        setIsPaymentStart(true)
      }
      else{
        setIsPaymentStart(false)
        console.error("PayPal order creation failed:", data?.payload?.message);
      }
    })
  }

  if (approvalURL) {
    
    window.location.href = approvalURL.href
   } 


  return <div className='flex flex-col'>
           <div className='relative h-[300px] w-full overflow-hidden'>
             <img src={image} className='w-full h-full object-center'/>
           </div>

         <div className='grid sm:grid-cols-1 lg:grid-cols-2 gap-5 mt-5 p-5'>
            <Address selectedId={currentSelectedAddress} setCurrentSelectedAddress={setCurrentSelectedAddress}/>
            <div className='flex flex-col gap-4'> 
               {
                cartItems && cartItems?.items &&  cartItems?.items?.length > 0 ?
                 cartItems.items.map(item => <UserCartTtemsContent cartItem={item} />) 
                 : null
               }
            <div>
              <div className='mt-8 space-y-4'>
                <div className="flex justify-between">
                  <span className='font-bold'>Total</span>
                  <span className='font-bold'>${toatalCartAmount}</span>
                </div>
              </div>
            </div>
              <div>
                <Button onClick= {handleInitiatePaypalPayment} className='bg-black text-white w-full mt-4'>
                  {isPaymentStart ? 'Processing for payment...' : 'Proceed to payment'}
                </Button>
              </div>
           </div>

          </div>
          
     </div>
  
}

export default ShoppingCheckout
