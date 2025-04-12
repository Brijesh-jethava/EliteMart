import React from 'react'
import myImg from '../../assets/shopping-for-new-year-why-use-your-credit-card-d.jpg'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Address from '@/components/shopping-view/address'
import ShoppingOrders from '@/components/shopping-view/orders'

const ShoppingAccount = () => {
  return <div className='flex flex-col'>
            <div className= 'relative h-[300px] w-full overflow-hidden'>
               <img src={myImg} className='h-full w-full' />
            </div>
            <div className="container max-auto grid grid-co1 gap-8 py-8">
               <div className='flex flex-col rounded-lg border bg-background p-6 shadow-sm'>
                  <Tabs defaultValue='orders'>
                     <TabsList>
                        <TabsTrigger value='orders'>Orders</TabsTrigger>
                        <TabsTrigger value='address'>Address</TabsTrigger>
                     </TabsList>
                     <TabsContent value='orders'>
                        <ShoppingOrders/>
                     </TabsContent>
                     <TabsContent value='address'>
                        <Address/>
                     </TabsContent>
                  </Tabs>
               </div>
            </div>
       </div>
  
}

export default ShoppingAccount
