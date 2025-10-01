import React from 'react'

const NewsletterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();

  };

  return (
    <div className='text-center px-4'>
      <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
      <p className='text-gray-400 mt-3'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur omnis laborum veniam odio nisi nulla saepe accusamus nihil quibusdam quasi dignissimos voluptas
      </p>

      <form onSubmit={onSubmitHandler} className='w-full sm:w-2/3 flex items-center gap-3 mx-auto my-6 border pl-3 rounded overflow-hidden'>
        <input className='w-full flex-1 outline-none py-4 px-4 text-sm' type="email" placeholder='Enter your email' required/>
        <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
      </form>
    </div>
  );
};

export default NewsletterBox;
