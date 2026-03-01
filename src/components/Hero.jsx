import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border bg-pink-300 bg-opacity-50 corner-radius rounded-xl'>
        <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
            <div className='text-[#414141]'> 
               <h1 className="italic text-3xl lg:text-5xl pl-5 leading-relaxed font-light mb-4">
              “Glow You Can Feel. Confidence You Can Wear.”
                </h1>
                <div className='flex items-center gap-2'>
                  <p className='font-semibold pl-5 text-sm md:text-base'>Your Skin. Your Ritual</p>
                </div>
                 <Link 
                   to="/collection"
                   className="bg-pink-500 hover:opacity-70 text-white px-4 ml-5 my-5 py-2 rounded inline-block "
                 >
                     SHOP NOW
                  </Link>
            </div>
        </div>
     <img className="w-full sm:w-[60%] md:w-[50%] lg:w-[40%] h-auto max-h-[600px] object-cover" src={assets.hero}alt="hero"/>
    </div>
  )
}

export default Hero
