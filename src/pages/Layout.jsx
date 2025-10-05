import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Components/Header'
function Layout() {
  return (
    <div>
        <Header/>
        <div className='pt-[100px] bg-zinc-800'>
          <Outlet/>
        </div>
    </div>
  )
}

export default Layout