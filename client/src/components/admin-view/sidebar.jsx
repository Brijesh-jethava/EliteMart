import React, { Fragment } from 'react'
import {ChartNoAxesCombined} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { LayoutDashboard, ShoppingBasket, ListOrdered} from 'lucide-react';
import { Sheet,SheetContent,SheetHeader,SheetTitle} from '../ui/sheet';

export const adminSidebarMenuItems = [
  {
    id:'dashboard',
    label:'Dashboard',
    path:'/admin/dashboard',
    icons: <LayoutDashboard />
  },
  {
    id:'products',
    label:'Products',
    path:'/admin/products',
    icons:<ShoppingBasket />
  },
  {
    id:'orders',
    label:'Orders',
    path:'/admin/orders',
    icons:<ListOrdered />
  }
];

function MenuItems({setOpen}){
  const navigate = useNavigate();

  return <nav className='mt-8 flex-col flex gap-2'>
    {
      adminSidebarMenuItems.map((menuItem)=> <div key={menuItem.id} onClick={()=> {navigate(menuItem.path); setOpen ? setOpen(false) : null}} 
      className='flex text-xl cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-muted-foreground   hover:bg-muted '>
         {menuItem.icons}
         <span>{menuItem.label}</span>
      </div> )
    }
  </nav>
}

const AdminSidebar = ({open,setOpen}) => {

  const navigate = useNavigate();

  return <Fragment>
   
   <Sheet open={open} onOpenChange={setOpen} >
    <SheetContent side='left' className='w-64 bg-white'>
      <div className='flex flex-col h-full'>
         <SheetHeader className='border-b'>
             <SheetTitle className='flex gap-2 mt-5 mb-5'>
               <ChartNoAxesCombined size={30}/>
               <span> Admin Panel</span>
             </SheetTitle>
         </SheetHeader>
         <MenuItems setOpen={setOpen}/>
      </div>
    </SheetContent>
  </Sheet>

    <aside  className='hidden w-64 flex-col border-r bg-background p-6 lg:flex'>
      <div onClick={()=>navigate('/admin/dashboard')} className='flex cursor-pointer items-center gap-2'>
         <ChartNoAxesCombined size={30}/>
         <h1 className='text-lg font-extrabold'>Admin Panel</h1>
      </div>

     <MenuItems/>
    </aside>
  </Fragment>
}

export default AdminSidebar;
