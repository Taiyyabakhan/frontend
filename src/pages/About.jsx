import React from 'react'
import Title from '../components/Title'
import {assets} from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row  items-center gap-16'>
        <img className='w-full md:w-1/3 object-cover rounded-lg text-gray-600' src={assets.about_img} alt="" />
        <div className="flex flex-col gap-4 text-gray-600 md:w-2/3">
          <p>At FOREVER YOUM, we believe skincare is more than a routine — it’s a ritual of self-care. Our products are crafted with carefully selected ingredients that nourish, protect, and enhance your natural glow.</p>
          <p>We combine science-backed formulations with gentle care to deliver visible results without compromising skin health.</p>
          <p>Because radiant skin isn’t just a trend — it’s confidence.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Our mission is to empower confidence through effective, thoughtfully crafted skincare. We are committed to delivering high-quality formulations that enhance natural beauty and promote healthy, radiant skin for everyone.</p>

        </div>
      </div>
      <div className='text-4xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE'} text3={'US'}/>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance</b>
          <p className='text-gray-600'>At FOREVER YOUM, quality is at the heart of everything we create. Every product undergoes strict testing and careful formulation to ensure safety, effectiveness, and consistency. We are committed to delivering skincare you can trust — every single time.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience</b>
          <p className='text-gray-600'>We design our products and services to fit into your everyday routine. With user-friendly packaging, easy ordering, and reliable customer support, glowing skin is always within reach. Simple shopping. Easy routines. Effortless glow.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>At FOREVER YOUM, our customers are at the heart of everything we do. Our dedicated support team is always ready to assist you with personalized guidance, product recommendations, and quick resolutions — ensuring a smooth and satisfying experience every time.</p>
        </div>
      </div>

      <NewsletterBox />

    </div>
  )
}

export default About
