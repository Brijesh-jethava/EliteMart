import BJ from '../../assets/brij.png'
import { House,Menu, ShoppingCart,UserCog,LogOut } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { ShopingViewHeaderMenuItems } from '@/config';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { logoutUser } from '@/store/auth-slice';
import UserCartWrapper from './cart-wrapper';
import { fetchCartItems } from '@/store/shop/cart-slice';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';


const MenuItems = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setActiveTab(categoryParam);
    } else if (location.pathname === "/shop/listing" && !categoryParam) {
      setActiveTab("products");
    } else {
      setActiveTab(location.pathname);
    }
  }, [location, searchParams]);

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
  
    if (getCurrentMenuItem.id === "products") {
      // Clicking "Products" should only highlight "Products", not child categories
      setActiveTab("products");
      navigate(getCurrentMenuItem.path);
      return;
    }
  
    if (["men", "women", "kids", "accessories", "footwear"].includes(getCurrentMenuItem.id)) {
      // Ensure child categories always go to /shop/listing?category=
      setSearchParams(new URLSearchParams(`?category=${getCurrentMenuItem.id}`));
      setActiveTab(getCurrentMenuItem.id);
      navigate(`/shop/listing?category=${getCurrentMenuItem.id}`);
      return;
    }
  
    // Default navigation for Home and Search
    navigate(getCurrentMenuItem.path);
    setActiveTab(getCurrentMenuItem.path);
  }
  

  return (
    <nav className="flex flex-col lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {ShopingViewHeaderMenuItems.map((item) => {
        const isActive =
          activeTab === item.id ||
          (item.id === "products" && activeTab === "products") || // Ensure only "Products" is highlighted when clicked
          activeTab === item.path;

        return (
          <Label
            key={item.id}
            onClick={() => handleNavigate(item)}
            className={`text-sm font-medium cursor-pointer px-3 py-1 rounded-md ${
              isActive ? "bg-black text-white" : "text-gray-700"
            }`}
          >
            {item.label}
          </Label>
        );
      })}
    </nav>
  );
};




const HeaderRightContent = () =>{

  const {user} = useSelector(state => state.auth)
  const {cartItems} = useSelector(state => state.shopCart)
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch(); ;

  function handleLogout(){
    dispatch(logoutUser())
  }

  useEffect(()=>{
    dispatch(fetchCartItems(user?.id))
  },[dispatch])

 
  
  return <div className='flex lg:items-center lg:flex-row flex-col gap-4'>
  <Sheet open={openCartSheet} onOpenChange={(state) => setOpenCartSheet(state)} >
     <Button 
      onClick={()=>setOpenCartSheet(true)} 
      variant='outline' 
      size='icon' 
      className='relative'
      >
       <ShoppingCart className='h-6 w-6'/>
       <Badge className='bg-red-500 absolute  top-[-8px] right-[-8px] text-sm font-bold text-white rounded-full h-6 w-6 flex items-center justify-center'>{cartItems?.items?.length || 0 }</Badge>
       {/* <span className='absolute top-[-4px] right-[6px] text-sm font-bold'>{cartItems?.items?.length || 0 }</span> */}
       <span className='sr-only'>User cart</span>
    </Button>
    <UserCartWrapper cartItems={cartItems && cartItems.items && cartItems.items.length>0 ? cartItems.items : ''} setOpenCartSheet={setOpenCartSheet}/>
  </Sheet> 
    

      <DropdownMenu>
          <DropdownMenuTrigger asChild>
              <Avatar className='bg-black'>
                <AvatarFallback className='bg-black text-white font-extrabold'>{user.userName[0].toUpperCase()}</AvatarFallback>
              </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" className=' w-56 z-10 bg-white'>
                <DropdownMenuLabel >
                   Logged in as {user.userName}
                </DropdownMenuLabel>
                <DropdownMenuSeparator/>

                <DropdownMenuItem onClick = {()=>navigate('/shop/account')} className='hover:bg-gray-100 cursor-pointer'>
                  <UserCog className='mr-2 h-4 w-4'/>
                  Account
                </DropdownMenuItem>
                <DropdownMenuSeparator/>

                <DropdownMenuItem onClick = {handleLogout} className='hover:bg-gray-100 cursor-pointer'>
                  <LogOut className='mr-2 h-4 w-4'/> 
                  Logout
                </DropdownMenuItem>
          </DropdownMenuContent>
      </DropdownMenu>

  </div>
}

const ShoppingHeader = () => {

 const {isAuthenticated} = useSelector(state => state.auth)


  return <header className='sticky top-0 z-10 bg-white border-b shadow-md'>
     <div className='flex items-center justify-between h-16 px-4 md:px-6'>
       <Link to='/shop/home' className='flex items-center gap-2'>
       <img src={BJ} alt="Logo" className="h-20 w-20" style={{ mixBlendMode:'darken'}} />
       <span className='font-bold'>EliteMart</span>
       </Link>
        <Sheet>
           <SheetTrigger asChild>
              <Button variant='outline' size='icon' className='lg:hidden'>
                 <Menu className='h-6 w-6'/>
                 <span className='sr-only'>Toggle Header Menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side='left' className='w-full max-w-xs bg-white' >
               <MenuItems/>
               <HeaderRightContent />
            </SheetContent>
        </Sheet>

        <div className='hidden lg:block'>
          <MenuItems/>
        </div>

         <div className='hidden  lg:block'> 
            <HeaderRightContent/>
          </div> 
        
     </div>
  </header>
}

export default ShoppingHeader;