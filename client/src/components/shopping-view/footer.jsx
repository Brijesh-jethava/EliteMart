import { FacebookIcon, Github, Icon, InstagramIcon, Linkedin, LinkedinIcon, TwitterIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex gap-8 flex-col md:flex-row justify-between ml-5 mr-5">
            
           
            <div>
              <h2 className="text-2xl font-bold">EliteMart</h2>
              <p className="mt-2 text-gray-400"> 
                Shop instantly, Pay securely!
              </p>
              <p className="mt-2 text-gray-400">
                Your one-stop shop for all your needs.
              </p>
            </div>
  
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
              <ul className="space-y-2">     
                <li> <NavLink to='/shop/home' className="text-gray-400 hover:text-white hover:underline">Home </NavLink></li>
                <li> <NavLink to='/shop/listing' className="text-gray-400 hover:text-white hover:underline">Products </NavLink></li>
                <li> <NavLink to='/shop/search' className="text-gray-400 hover:text-white hover:underline">Search </NavLink></li>
                <li> <NavLink to='/shop/account' className="text-gray-400 hover:text-white hover:underline">Account </NavLink></li>
              </ul>
            </div>
  
            {/* Social Media */}
            <div>

              <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
                <div className="flex gap-4">
                  <NavLink to="https://www.linkedin.com/in/brijesh-jethava-40a377283/">
                      <LinkedinIcon className="text-gray-400 hover:text-white" />
                  </NavLink>
                  <NavLink to="https://github.com/">
                      <Github className="text-gray-400 hover:text-white" />
                  </NavLink>
                  <InstagramIcon className="text-gray-400 hover:text-white" />
                  <TwitterIcon className="text-gray-400 hover:text-white" />
                  <NavLink to="">
                     <FacebookIcon className="text-gray-400 hover:text-white" />
                  </NavLink>
                  
                  
                 
                  
                </div>
                 
               
                 
             </div>
  
          </div>
  
          {/* Copyright */}
          <div className="mt-6 text-center border-t border-gray-700 pt-4 text-gray-500">
            &copy; {new Date().getFullYear()} EliteMart. All rights reserved.
          </div>

        </div>
      </footer>
    );
  };
  
  export default Footer;
  