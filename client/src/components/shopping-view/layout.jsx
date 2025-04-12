import React from 'react'
import { Outlet } from 'react-router-dom'
import ShoppingHeader from './header'
const ShoppingLayout = () => {
  return (
    <div className='flex flex-col bg-white'>
        {/* common Header */}
        <ShoppingHeader/>
      <main className='flex flex-col width-full'>
        <Outlet/>
      </main>
    </div>
  )
}

export default ShoppingLayout
