import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table ,TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Dialog, DialogTrigger } from '../ui/dialog'
import AdminOrderDetailsView from './order-details'
import { useDispatch, useSelector } from 'react-redux'
import {  getAllOrdersForAdmin, getOrderDetailsForAdmin, removeOrderDetails } from '@/store/admin/order-slice/index'
import { Badge } from '../ui/badge'



const AdminOrdersView = () => {

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const {orderList,orderDetails} = useSelector(state => state.adminOrder)
  const dispatch = useDispatch();

  const handleFetchOrderDetails = async (getId) =>{
   await  dispatch(getOrderDetailsForAdmin(getId))
  }

  useEffect(()=>{
     dispatch(getAllOrdersForAdmin())
  },[dispatch])



  useEffect(()=>{
    if(orderDetails !== null){
      //To close this model we need to reset OrderDetails, to do this thing we need dot create one reducer
      setOpenDetailsDialog(true)
    }
  },[orderDetails])

  return <Card>
       <CardHeader>
          <CardTitle>Order History</CardTitle>
       </CardHeader>
       <CardContent>
           <Table>
               <TableHeader>
                 <TableRow>
                    <TableHead>Order Id</TableHead>
                    <TableHead>Order Date</TableHead>
                    <TableHead>Order Status</TableHead>
                    <TableHead>Order Price</TableHead>
                    <TableHead className='sr-only'><span>Details</span></TableHead>
                 </TableRow>
               </TableHeader>
               <TableBody>
               {orderList && orderList.length > 0 ? (
              orderList.map(orderItem => (
                <TableRow key={orderItem?._id}>
                  <TableCell>{orderItem?._id}</TableCell>
                  <TableCell>{orderItem?.orderDate.split('T')[0]}</TableCell>
                  <TableCell>
                    <Badge className={`text-white py-1 px-3 ${orderItem?.orderStatus === 'confirmed' ? "bg-green-500" :orderItem?.orderStatus === 'rejected'? 'bg-red-600': 'bg-black'}`}>
                      {orderItem?.orderStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>${orderItem?.totalAmount}</TableCell>
                  <TableCell>
                  <Dialog 
                     open={openDetailsDialog} 
                     onOpenChange={() => {
                    
                        setOpenDetailsDialog(false);
                        dispatch(removeOrderDetails());
                       }}
                   >

                   <Button
                      onClick={() => handleFetchOrderDetails(orderItem?._id)}
                       className="bg-black text-white"
                    >
                      View Details
                    </Button>
                
                     <AdminOrderDetailsView orderDetails={orderDetails} />
               
                </Dialog>
                   
                  </TableCell>
                </TableRow>
              ))
            ) : null}
               </TableBody>
           </Table>
         </CardContent>

    </Card>
     }

export default AdminOrdersView
