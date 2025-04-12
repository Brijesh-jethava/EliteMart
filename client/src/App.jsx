import { Route, Routes } from "react-router-dom"

import AuthRegister from "./pages/auth/register"
import AuthLogin from "./pages/auth/login"
import AuthLayout from "./components/auth/layout"
import AdminLayout from "./components/admin-view/layout"
import AdminDashboard from "./pages/admin-view/dashboard"
import AdminProducts from "./pages/admin-view/products"
import AdminOrders from "./pages/admin-view/orders"
import AdminFeatures from "./pages/admin-view/features"
import ShoppingLayout from "./components/shopping-view/layout"
import NotFound from "./pages/not-found"
import ShoppingHome from "./pages/shopping-view/home"
import ShoppingAccount from "./pages/shopping-view/account"
import ShoppingCheckout from "./pages/shopping-view/checkout"
import ShoppingListing from "./pages/shopping-view/listing"
import CheckAuth from "./components/common/check-auth"
import UnauthPage from "./pages/unauth-page"
import { useDispatch, useSelector } from "react-redux"
import { checkAuth } from "./store/auth-slice"
import { useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import PaypalReturnPage from "./pages/shopping-view/paypal-return"
import PaymentSuccessPage from "./pages/shopping-view/payment-success"
import SearchProducts from "./pages/shopping-view/search"
import ForgotPassword from "./pages/auth/forgotPassword";
import VerifyOTP from "./pages/auth/varifyOtp";

function App() {

const {user,isAuthenticated ,isLoading} = useSelector(state=>state.auth)
const dispatch = useDispatch();

//when refresh the page don't go to /auth/login
useEffect(()=>{
  dispatch(checkAuth());
},[dispatch]);

if(isLoading) return <Skeleton className="w-[100px] h-[20px] bg-black rounded-full" />

  return (
    <div >
      <Routes>
        
        <Route path='/' element={
          <CheckAuth isAuthenticated = {isAuthenticated} user={user}>

          </CheckAuth>}
         />

        <Route path="/auth" element={
          <CheckAuth isAuthenticated = {isAuthenticated} user={user}>
             <AuthLayout/>
           </CheckAuth>
          }>
            <Route path="register" element={<AuthRegister/>}/>
            <Route path="login" element={<AuthLogin/>}/>
            <Route path='forgot-password' element={<ForgotPassword/>}/>
            <Route path='verify-otp' element={<VerifyOTP/>}/>
        </Route>
        
        <Route path="/admin" element={
          <CheckAuth isAuthenticated = {isAuthenticated} user={user}>
            <AdminLayout/>
         </CheckAuth>}>
          <Route path="dashboard" element={<AdminDashboard/>}/>
          <Route path="products" element={<AdminProducts/>}/>  
          <Route path="orders" element={<AdminOrders/>}/>  
          <Route path="features" element={<AdminFeatures/>}/>  
        </Route>

        <Route path="/shop" element={
          <CheckAuth isAuthenticated = {isAuthenticated} user={user}>
            <ShoppingLayout/>
          </CheckAuth>}>
          <Route path="home" element={<ShoppingHome/>}/>
          <Route path="account" element={<ShoppingAccount/>}/>
          <Route path="checkout" element={<ShoppingCheckout/>}/>
          <Route path="listing" element={<ShoppingListing/>}/>
          <Route path='paypal-return' element={<PaypalReturnPage/>}/>
          <Route path='payment-success' element={<PaymentSuccessPage/>}/>
          <Route path="search" element={<SearchProducts/>}/>
        </Route>
        
        <Route path="/unauth-page" element={<UnauthPage/>}/>
        <Route path="*" element={<NotFound/>}/>

      </Routes>
    </div>
    
  )
}

export default App;
