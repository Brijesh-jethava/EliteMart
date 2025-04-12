import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { Dialog, DialogContent } from '../ui/dialog';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrderByUserId, getOrderDetails, resetOrderDetails } from '@/store/shop/order-slice';
import { Badge } from '../ui/badge';
import ShoppingOrderDetailsView from './order-details';

const ShoppingOrders = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { orderList, orderDetails } = useSelector(state => state.shopOrder);

  useEffect(() => {
    if (user?.id) {
      dispatch(getAllOrderByUserId(user?.id));
    }
  }, [dispatch, user?.id]);

  useEffect(() => {
    if (orderDetails) {
      setOpenDetailsDialog(true);
    }
  }, [orderDetails]);

  const handleFetchOrderDetails = (orderId) => {
   
    setSelectedOrderId(orderId);
    dispatch(getOrderDetails(orderId));
  };



  return (
    <Card>
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
              <TableHead className="sr-only"><span>Details</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0 ? (
              orderList.map(orderItem => (
                <TableRow key={orderItem?._id}>
                  <TableCell>{orderItem?._id}</TableCell>
                  <TableCell>{orderItem?.orderDate.split('T')[0]}</TableCell>
                  <TableCell>
                    <Badge className={`text-white py-1 px-3 ${orderItem?.orderStatus === 'confirmed'? "bg-green-500" : orderItem?.orderStatus === 'rejected'? 'bg-red-600' : 'bg-black '}` }>
                      {orderItem?.orderStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>${orderItem?.totalAmount}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleFetchOrderDetails(orderItem?._id)}
                      className="bg-black text-white"
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : null}
          </TableBody>
        </Table>
      </CardContent>

     
      <Dialog 
        open={openDetailsDialog} 
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setOpenDetailsDialog(false);
            dispatch(resetOrderDetails());
            setSelectedOrderId(null);
          }
        }}
      >
        <DialogContent>
          <ShoppingOrderDetailsView orderDetails={orderDetails} />
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ShoppingOrders;
