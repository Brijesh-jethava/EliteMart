
import React from 'react'
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import { Button } from '../ui/button'
import UserCartTtemsContent from './cart-items-content'
import { useNavigate } from 'react-router-dom'

const UserCartWrapper = ({cartItems,setOpenCartSheet}) => {

  const navigate = useNavigate();

  const toatalCartAmount = cartItems && cartItems.length > 0 ?
     cartItems.reduce((sum,currentItem) => sum + (currentItem?.salePrice > 0 ? currentItem?.salePrice : currentItem?.price) * currentItem?.quantity,0) : 0;

  return <SheetContent className='sm:max-w-md bg-white'>
    <SheetHeader>
        <SheetTitle>
            Your Cart
        </SheetTitle>
    </SheetHeader>
    <div className='mt-8 space-y-4'> 
     {
      cartItems && cartItems.length > 0 ? 
      cartItems.map(item => <UserCartTtemsContent cartItem={item}/>) : null
     }
    </div>
    <div className='mt-8 space-y-4'>
         <div className="flex justify-between">
            <span className='font-bold'>Total</span>
            <span className='font-bold'>${toatalCartAmount}</span>
         </div>
    </div>

    <Button onClick={()=>{navigate('/shop/checkout'); setOpenCartSheet(false)}} className='bg-black text-white mt-6 w-full'  >
        CheckOut
    </Button>
  </SheetContent>
}

export default UserCartWrapper
