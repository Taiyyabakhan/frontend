import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {

    const {products} = useContext(ShopContext);
    const [LatestProducts, setLatestProducts] = useState([]);

    useEffect(()=>{
      setLatestProducts(products.slice(0,10));
    },[products])

  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3x1'>
          <Title text1={'LATEST'} text2={'COLLECTION'} />
          <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'> Discover our freshest picks just for you.</p>
        </div>
      {/* Products */}
      <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6' >
        {
          LatestProducts.map((item, index) =>(
            <ProductItem 
              key={index} 
              id={item._id} 
              image={item.image} 
              name={item.name} 
              price={item.price} 
              bestseller={item.bestseller}
            />
          ))
        }
      </div>
    </div>
  )
}

export default LatestCollection
