import CommonForm from "@/components/common/form";
import { registerFormControls } from '@/config/index';
import {Link} from 'react-router-dom';
import { useState } from "react";
import { registerUser } from "@/store/auth-slice";
import { useNavigate } from "react-router-dom"; 
import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast";


const initialState = {
  userName:'',
  email:'',
  password:''
}

function AuthRegister() {
    
   
    const[formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {toast} = useToast();


    function onSubmit(event)
    {
      event.preventDefault();
      
   
      dispatch(registerUser(formData))
      .then((data) => {

    if (data?.payload?.success) {
     
      toast({
        title: data?.payload?.message,
        style: { backgroundColor: 'white', color: 'black' }
      });
     
      navigate('/auth/login');  // Redirect to login page after successful registration
    } 
    else {
      toast({
        title: data?.payload?.message,
        style: { backgroundColor: 'red', color: 'white' }
      });
    }
    
  })
  .catch((error) => {
    
    console.error("Registration failed:", error); // Handle errors
    toast({
      title: "An error occurred during registration. Please try again.",
      style: { backgroundColor: 'red', color: 'white' }
    });
  });

      
      setFormData(initialState);
    }

    return (
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Create New Account</h1>
          <p className="mt-2">Already have an Account?
            <Link to="/auth/login" className="text-primary ml-2 font-medium hover:underline">Login</Link>
          </p>
        </div>
        
        
        <CommonForm
         formControls={registerFormControls}
         formData = {formData}
         setFormData={setFormData}
         onSubmit={onSubmit}
         buttonText={'Sign Up'}
         /> 
      
     </div>

     )

    
  }
  
  export default AuthRegister;
  