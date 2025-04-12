import React, { useEffect, useState } from 'react'
import Nike from '../../assets/Ni.png'
import Adidas from '../../assets/adi.png'
import Puma from '../../assets/Puma.png'
import Levi from '../../assets/Levis.png'
import Zara from '../../assets/Zara-Logo.png'
import HM from '../../assets/H&M.png'
import Foot from '../../assets/foot.png'
import Women from '../../assets/women.png'
import Men from '../../assets/men.png'
import Kids from '../../assets/kids.png'
import Accessories from '../../assets/ass.png'

import { Button } from '@/components/ui/button'
import { AirplayIcon, BabyIcon, ChevronLeftIcon, ChevronRightIcon, CloudLightningIcon, Image, Shirt, ShoppingBag, SofaIcon, UmbrellaIcon, Wallet, WatchIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllFilteredProducts, fetchProductsDetail } from '@/store/shop/products-slice'
import ShopingProductTile from '@/components/shopping-view/product-tile'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice'
import ProductDetailsDialog from '@/components/shopping-view/product-detail'
import { getFeatureImages } from '@/store/common-slice'
import Footer from '@/components/shopping-view/footer'

const categoriesWithIcon = [
  { id: 'men',label:'Men',image:Men},
  { id: 'women',label:'Women',image:Women},
  { id: 'kids',label:'Kids',image:Kids},
  { id: 'accessories',label:'Accessories',image:Accessories},
  { id: 'footwear',label:'Footwear',image:Foot},
]

const brandsWithIcon = [
  { id: 'nike',label:'Nike',image:Nike},
  { id: 'adidas',label:'Adidas',image:Adidas},
  { id: 'puma',label:'Puma',image:Puma},
  { id: 'levi',label:'Levi',image:Levi},
  { id: 'zara',label:'Zara',image:Zara},
  { id: 'h&m',label:'H&M',image:HM}
]

const ShoppingHome = () => {

 
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openDetailsDialog,setOpenDetailsDialog] = useState(false);
  const {user} = useSelector(state => state.auth)
  const {productList,productDetails} = useSelector(state => state.shopProducts)
  const {featureImagesList} = useSelector(state => state.commonFeature)

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {toast} = useToast();

  const handleNavigateToListingPage = (getCurrentItem,section) =>{
    sessionStorage.removeItem('filters');

    const currentFilter = {
      [section] : [getCurrentItem.id]
    }
    sessionStorage.setItem('filters',JSON.stringify(currentFilter))
    navigate(`/shop/listing`)
  }

  const handleGetProductDetails = (getCurrentProductId)=>
    {
       
       dispatch(fetchProductsDetail(getCurrentProductId))
    }

    
    const handleAddToCart = (getCurrentProductId)=>{
        
         dispatch(
          addToCart({ 
            userId:user?.id, 
            productId:getCurrentProductId, 
            quantity:1
          }
        )
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

      const handleCloseDialog = () => {
        setOpenDetailsDialog(false);
        dispatch(fetchProductsDetail(null)); // Clear product details in Redux
    };
    

    useEffect(() => {
      if (productDetails && !openDetailsDialog) {
        setOpenDetailsDialog(true);
      }
   }, [productDetails]);
   
   useEffect(() => {
    return () => {
        dispatch(fetchProductsDetail(null)); // Reset product details on unmount
    };
}, []);

  
  //To change image automaticaly
  useEffect(()=>{
    const timer = setInterval(()=>{
      setCurrentSlide(prevSlide => (prevSlide + 1) % featureImagesList.length);
    },3000)
    return () => clearInterval(timer);
  },[featureImagesList.length])

  useEffect(()=>{
     dispatch(fetchAllFilteredProducts({filterParams: {},sortParams: 'price-low-to-high'}))
  },[dispatch])  

 

   useEffect(() => {
      dispatch(getFeatureImages());
     
    }, [dispatch, featureImagesList]);
  
  return (
  <div className='flex flex-col min-h-screen'>
       <div className="relative w-full h-[450px] overflow-hidden ">
          {
             featureImagesList && featureImagesList.length > 0 ?  featureImagesList.map((slide, index) => (<img 
             src={slide?.image}
             key={index}
             className={`${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            } absolute top-0 left-0 w-full h-full object-cover rounded-lg`
          }
          />
        ))
      : null}
          <Button 
            variant='outline' 
            size='icon' 
            className= 'absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80'
            onClick={()=>setCurrentSlide(prevSlide =>(prevSlide-1 + featureImagesList.length) % featureImagesList.length)}
            >
               <ChevronLeftIcon className='w-4 h-4'/>
          </Button>
          <Button 
             variant='outline' 
             size='icon' 
             className='absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80'
             onClick={() => setCurrentSlide(prevSlide => (prevSlide + 1) % featureImagesList.length)}
             >
            <ChevronRightIcon className='w-4 h-4'/>
          </Button>
       </div>

       <section className='py-12 bg-gray-50'>
           <div className='container mx-auto px-4'>
              <h2 className='text-3xl font-bold text-center mb-8'>Shop by category</h2>
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
                {
                  categoriesWithIcon.map(categoryItem => <Card onClick={() => handleNavigateToListingPage(categoryItem, 'category')} className='cursor-pointer hover:shadow-lg transition-shadow'>
                     <CardContent className='flex flex-col items-center justify-center p-6'>
                        {/* <categoryItem.image className='w-12 h-12 mb-4 text-primary'/> */}
                        <img src={categoryItem.image} alt={categoryItem.label} className='w-20 h-20 mb-4 object-cover rounded-full' />
                        <span className='font-bold'>{categoryItem.label}</span>
                     </CardContent>
                  </Card>)
                }
              </div>
           </div>
       </section>

       <section className='py-12 bg-gray-50'>
           <div className='container mx-auto px-4'>
              <h2 className='text-3xl font-bold text-center mb-8'>Shop by Brand</h2>
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
                {
                  brandsWithIcon.map(brandItem => <Card onClick={() => handleNavigateToListingPage(brandItem, 'brand')} className='cursor-pointer hover:shadow-lg transition-shadow'>
                     <CardContent className='flex flex-col items-center justify-center p-6'>
                       <img src={brandItem.image} alt={brandItem.label} className='w-full h-full mb-4 object-cover rounded-full' />
                        {/* <brandItem.image className='w-12 h-12 mb-4 text-primary'/> */}
                        <span className='font-bold '>{brandItem.label}</span>
                     </CardContent>
                    
                  </Card>)
                }
              </div>
           </div>
       </section>

         
       <section className='py-12 ml-6 mr-6'>
         <div className='container mx-auto px-4'>
            <h2 className='text-3xl font-bold text-center mb-8'>Feature Products</h2>
         </div> 
         <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {
              productList && productList.length > 0 ?
              productList.map(productItem => <ShopingProductTile product={productItem} handleGetProductDetails={handleGetProductDetails} handleAddToCart={handleAddToCart}/>)
              : null
            }
         </div>
       </section>
       <ProductDetailsDialog 
       open={openDetailsDialog} 
       setOpen={handleCloseDialog} 
       productDetails={productDetails}
       />

      <Footer/>
     
  </div>
  )
}

export default ShoppingHome
