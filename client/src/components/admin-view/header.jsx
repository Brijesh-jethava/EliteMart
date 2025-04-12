import React from 'react'
import { Button } from '../ui/button';
import { Menu , LogOut} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '@/store/auth-slice';



const AdminHeader = ({setOpen}) => {

const dispatch = useDispatch();

const handleLogout = () =>{
  dispatch(logoutUser())
}

  return <header className='flex items-center justify-between px-4 py-3 bg-background border-b'>
      <Button onClick={()=>setOpen(true)} className='lg:hidden sm:block bg-black text-white' >
         <Menu />
         <span  className='sr-only'>Toggle Menu</span>
      </Button>
      <div  className="flex flex-1 justify-end">
        <Button className='inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow bg-black text-white' onClick={handleLogout}>
        <LogOut />
        logout
        </Button>
      </div>
  </header>
}

export default AdminHeader;
