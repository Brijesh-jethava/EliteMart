import CommonForm from "@/components/common/form";
import { loginFormControls } from '@/config/index';
import {Link, useNavigate} from 'react-router-dom';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/auth-slice";
import { useToast } from "@/hooks/use-toast";

const initialState = {
  email:'',
  password:''
}





function AuthLogin() {
    
   
    const[formData, setFormData] = useState(initialState);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {toast} = useToast();

    function handleForgotPassword(){
      navigate('/auth/forgot-password');
    }

    function onSubmit(event)
    {
       event.preventDefault();

       dispatch(loginUser(formData)).then((data)=>{
        if(data?.payload?.success){
          toast({
            title : data?.payload?.message,
            style: { backgroundColor: 'white', color: 'black' }
          })
        } 
        else{
          toast({
            title : data?.payload?.message,
            style: { backgroundColor: 'red', color: 'white' }
          })
        }
       

       })
    }

    return (
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Sign in to your account</h1>
          <p className="mt-2">Don't have an Account?
            <Link to="/auth/register" className="text-primary ml-2 font-medium hover:underline">Register</Link>
          </p>
        </div>
        
        
        <CommonForm
         formControls={loginFormControls}
         formData = {formData}
         setFormData={setFormData}
         onSubmit={onSubmit}
         buttonText={'Sign In'}
         /> 

{/* <button onClick={handleForgotPassword} className="text-primary ml-2 font-medium hover:underline">
  Forgot Password?
</button> */}

      
     </div>

     

     )

    
  }
  
  export default AuthLogin;
  