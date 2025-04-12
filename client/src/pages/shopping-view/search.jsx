import ProductDetailsDialog from '@/components/shopping-view/product-detail';
import ShopingProductTile from '@/components/shopping-view/product-tile';
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast';
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice';
import { fetchProductsDetail } from '@/store/shop/products-slice';
import { getSearchResults, resetSearchResults } from '@/store/shop/search-slice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const SearchProducts = () => {

  const [keyword, setKeyword] = useState('');
  const[openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams()
  const {searchResults} = useSelector(state => state.shopSearch)
  const {user} = useSelector(state => state.auth)
  const {productDetails} = useSelector(state => state.shopProducts)
  const {cartItems} = useSelector(state => state.shopCart)
  const {toast} = useToast();
  const dispatch = useDispatch();

   const handleAddToCart = (getCurrentProductId,getTotalStock)=>{
  
      
    
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
  
       dispatch(
        addToCart({ 
          userId:user?.id, 
          productId:getCurrentProductId, 
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

      const handleGetProductDetails = (getCurrentProductId)=>
      {
        
         dispatch(fetchProductsDetail(getCurrentProductId))
      }

  useEffect(()=>{
    if(keyword && keyword.trim() !== '' && keyword.trim().length > 3) {
        setTimeout(()=>{
            setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
            dispatch(getSearchResults(keyword))
        },1000)
      }else{
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
        dispatch(resetSearchResults())
      }
  },[keyword])

  useEffect(() => {
      if(productDetails !== null){
        setOpenDetailsDialog(true);
      }
    },[productDetails])



  

  return <div className='container mx-auto md:px-6 px-4 py-8'>
     <div className='w-full flex items-center pb-6'>
        <Input value={keyword} name='keyword' onChange={(event)=>setKeyword(event.target.value)} className='py-6' placeholder='search products...'/>
     </div>
     {
        !searchResults.length ? <h1 className='text-5xl font-extrabold'>Sorry! Product not Found</h1> : null
      }
     <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
         { 
          searchResults.map(item => <ShopingProductTile product={item} handleAddToCart={handleAddToCart} handleGetProductDetails={handleGetProductDetails}/> ) 
         }
     </div>

     <ProductDetailsDialog open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails}/>
  </div>
  
}

export default SearchProducts
