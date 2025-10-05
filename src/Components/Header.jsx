import React from 'react'
import SearchBar from './SearchBar'
import { Link } from 'react-router-dom'
function Header() {
  return (
    <div className=' fixed w-full h-[70px] top-0 left-0  bg-zinc-900  flex items-center justify-between shadow-md shadow-zinc-700   '>
      <Link to='/'>
           <h1 className='font-extrabold text-slate-200 text-5xl ml-5 '>Comic Cluster</h1>
      </Link>
      <div className=' items-center p-2 mr-10 '>
        < SearchBar/>
      </div>
    </div>
  )
}

export default Header