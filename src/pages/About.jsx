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
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque ab reiciendis repellendus eos illum odio laudantium at nisi obcaecati recusandae officiis quod excepturi beatae autem exercitationem ex, aut hic ad.</p>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque ab reiciendis repellendus eos illum odio laudantium at nisi obcaecati recusandae officiis quod excepturi beatae autem exercitationem ex, aut hic ad.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Our Mission Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus assumenda ex nulla odio corporis, commodi doloremque sequi mollitia nostrum ut soluta natus aliquid explicabo consequatur eaque fugit reprehenderit illum quibusdam.</p>

        </div>
      </div>
      <div className='text-4xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE'} text3={'US'}/>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit laboriosam ipsa natus laborum alias perferendis. Rerum tempore ut consequuntur earum exercitationem facilis, architecto necessitatibus accusantium recusandae. Eius, voluptatibus at. Quidem.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit laboriosam ipsa natus laborum alias perferendis. Rerum tempore ut consequuntur earum exercitationem facilis, architecto necessitatibus accusantium recusandae. Eius, voluptatibus at. Quidem.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit laboriosam ipsa natus laborum alias perferendis. Rerum tempore ut consequuntur earum exercitationem facilis, architecto necessitatibus accusantium recusandae. Eius, voluptatibus at. Quidem.</p>
        </div>
      </div>

      <NewsletterBox />

    </div>
  )
}

export default About
