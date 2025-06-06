import React from 'react'
import { DialogContent } from '../ui/dialog'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import { Badge } from '../ui/badge'
import { useSelector } from 'react-redux'

const ShoppingOrderDetailsView = ({orderDetails}) => {

  const {user} = useSelector(state => state.auth)

  return (
    <DialogContent className='sm:max-w-[600px] bg-white'>
    <div className="grid gap-6">
       <div className="grid gap-2">
           <div className='flex mt-6 items-center justify-between'>
               <p className='font-medium'>Order Id</p>
               <Label>{orderDetails?._id}</Label>
           </div>
           <div className='flex mt-2 items-center justify-between'>
               <p className='font-medium'>Order Date</p>
               <Label>{orderDetails?.orderDate.split('T')[0]}</Label>
           </div>
           <div className='flex mt-2 items-center justify-between'>
               <p className='font-medium'>Order Price</p>
               <Label>${orderDetails?.totalAmount}</Label>
           </div>
           <div className='flex mt-2 items-center justify-between'>
               <p className='font-medium'>Payment Method</p>
               <Label>{orderDetails?.paymentMethod}</Label>
           </div>
           <div className='flex mt-2 items-center justify-between'>
               <p className='font-medium'>Payment Status</p>
               <Label>{orderDetails?.paymentStatus}</Label>
           </div>
           <div className='flex mt-2 items-center justify-between'>
               <p className='font-medium'>Order Status</p>
               <Label>
                 <Badge className={`text-white py-1 px-3 ${orderDetails?.orderStatus === 'confirmed'? "bg-green-500" : orderDetails?.orderStatus === 'rejected'? 'bg-red-600' : 'bg-black '}` }>
                      {orderDetails?.orderStatus}
                 </Badge>
                </Label>
           </div>
           
       </div>
       <Separator className='bg-gray-300'/>
       <div className='grid gap-4'>
           <div className='grid gap-2'>
               <div className='font-medium'>Order Details</div>
               <ul className='grid gap-3'>
               {
                     orderDetails?.cartItems?.length > 0
                     ? orderDetails.cartItems.map((item, index) => (
                         <li key={item.productId || index} className='flex items-center justify-between'>
                           <span>Title: {item.title}</span>
                           <span>Quantity: {item.quantity}</span>
                           <span>Price: ${item.price}</span>
                         </li>
                       ))
                     : <li className="text-gray-500">No items in the order</li>
                }
               </ul>
           </div>
       </div>
       <div className='grid gap-4'>
           <div className='grid gap-2'>
             <div className='font-medium'>Shipping Info</div>
                 <div className='grid gap-0.5 text-muted-foreground'>
                 <span>{user.userName}</span>
                    <span>{orderDetails?.addressInfo?.address}</span>
                    <span>{orderDetails?.addressInfo?.city}</span>
                    <span>{orderDetails?.addressInfo?.pincode}</span>
                    <span>{orderDetails?.addressInfo?.phone}</span>
                    <span>{orderDetails?.addressInfo?.notes}</span>
                 </div>
             </div>
         </div>
   </div> 
</DialogContent>
  )
}

export default ShoppingOrderDetailsView
