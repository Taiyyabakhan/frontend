import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';


const SearchBar = () => {

    const {search, setSearch, showSearch, setShowSearch} = useContext(ShopContext);
    const [visible, setVisible]= useState(false)
    const location = useLocation();

    useEffect(()=>{
      if (location.pathname.includes('collection') && showSearch){
        setVisible(true)
      }
      else{
        setVisible(false)
      }
    },[location])



  return  showSearch && visible ? (
    <div className='border-t border-b bg-pink-100 text-center'>
        <div className='inline-flex items-center justify-content border border-gray-400 px-9 ms-8 rounded-full w-3/4 sm:w-1/2 h-8'>
        <input type="" value={search} onChange={(e)=>setSearch(e.target.value)} className='flex-1 outline-none bg-inherit text-sm' placeholder='Search'/>
        <img className='w-4' src={assets.search_icon} alt="" />
        </div>
      <img  onClick={()=>setShowSearch(false)} className='inline w-3 cursor-pointer' src={assets.cross_icon} alt="" />
    </div>
  ) : null
}

export default SearchBar
