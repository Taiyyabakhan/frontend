import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <div>
      <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
        <div className='overflow-hidden rounded-xl shadow-sm"'>
          <div className="flex justify-center">
            <img
            className='hover:scale-110 transition ease-in-out h-72 w-56 object-cover border rounded-lg overflow-hidden shadow-sm'
            src={image[0]}
            alt={name}/>
            </div>

        </div>
        <p className='pt-3 pb-1 text-sm'>{name}</p>
        <p className='text-sm font-medium'>{currency}{price}</p>
      </Link>
    </div>
  );
};

export default ProductItem;
