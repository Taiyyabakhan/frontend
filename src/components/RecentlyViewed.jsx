import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const RecentlyViewed = () => {
  const { recentlyViewed, products, currency } = useContext(ShopContext);

  if (!recentlyViewed || recentlyViewed.length === 0) {
    return null;
  }

  const getRecentProducts = () => {
    return recentlyViewed
      .map(productId => products.find(p => p._id === productId))
      .filter(Boolean)
      .slice(0, 4); // Show max 4 recent products
  };

  const recentProducts = getRecentProducts();

  if (recentProducts.length === 0) {
    return null;
  }

  return (
    <div className='mt-12 pt-8 border-t'>
      <h2 className='text-2xl font-semibold mb-6'>Recently Viewed</h2>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
        {recentProducts.map((product) => (
          <Link 
            key={product._id} 
            to={`/product/${product._id}`}
            className='group'
          >
            <div className='overflow-hidden rounded-xl shadow-sm group-hover:shadow-lg transition-shadow duration-300'>
              <div className="flex justify-center">
                <img
                  className='hover:scale-110 transition ease-in-out h-48 w-full object-cover border rounded-lg'
                  src={product.image[0]}
                  alt={product.name}
                />
              </div>
            </div>
            <div className="mt-2">
              <p className='text-sm truncate group-hover:text-black transition-colors'>{product.name}</p>
              <div className='flex items-center justify-between mt-1'>
                <p className='text-sm font-medium group-hover:text-black transition-colors'>{currency}{product.price}</p>
                {product.bestseller && (
                  <span className='text-xs bg-red-100 text-red-600 px-1 rounded'>Hot</span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed;
