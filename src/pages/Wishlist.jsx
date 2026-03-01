import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import Title from '../components/Title';
import { assets } from '../assets/assets';

const Wishlist = () => {
  const { wishlist, products, currency, removeFromWishlist, addToCart, isInWishlist, toggleWishlist } = useContext(ShopContext);

  const getWishlistProducts = () => {
    return wishlist
      .map(productId => products.find(p => p._id === productId))
      .filter(Boolean);
  };

  const wishlistProducts = getWishlistProducts();

  const handleAddToCart = (product) => {
    // Add to cart with default volume
    const defaultVolume = product.volume?.[0] || '30ml';
    addToCart(product._id, defaultVolume);
  };

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
  };

  if (wishlistProducts.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4'>
        <div className='text-center max-w-md'>
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <h2 className='text-2xl font-semibold mb-4'>Your Wishlist is Empty</h2>
          <p className='text-gray-600 mb-6'>
            Start adding items to your wishlist to keep track of products you love!
          </p>
          <Link 
            to='/collection'
            className='inline-block bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors'
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-6'>
        <Title text1={'MY'} text2={'WISHLIST'} />
      </div>

      <div className='mb-4 flex justify-between items-center'>
        <p className='text-gray-600'>
          {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'} in your wishlist
        </p>
        <button 
          onClick={() => {
            if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
              wishlist.forEach(productId => removeFromWishlist(productId));
            }
          }}
          className='text-red-500 hover:text-red-700 text-sm font-medium'
        >
          Clear Wishlist
        </button>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {wishlistProducts.map((product) => (
          <div key={product._id} className='group relative'>
            <div className='overflow-hidden rounded-xl shadow-sm group-hover:shadow-lg transition-shadow duration-300'>
              <Link to={`/product/${product._id}`} className='block'>
                <img
                  className='hover:scale-110 transition ease-in-out w-full h-64 object-cover'
                  src={product.image[0]}
                  alt={product.name}
                />
              </Link>
              
              {/* Quick Actions */}
              <div className='absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2'>
                <button
                  onClick={() => handleRemoveFromWishlist(product._id)}
                  className='w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition-colors'
                  title='Remove from Wishlist'
                >
                  <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="mt-3">
              <Link to={`/product/${product._id}`}>
                <p className='text-sm font-medium truncate group-hover:text-black transition-colors'>{product.name}</p>
              </Link>
              <div className='flex items-center justify-between mt-2'>
                <p className='text-lg font-bold'>{currency}{product.price}</p>
                {product.bestseller && (
                  <span className='text-xs bg-red-100 text-red-600 px-2 py-1 rounded'>Hot</span>
                )}
              </div>
              
              {/* Action Buttons */}
              <div className='flex gap-2 mt-3'>
                <button 
                  onClick={() => handleAddToCart(product)}
                  className='flex-1 bg-black text-white py-2 rounded text-sm hover:bg-gray-800 transition-colors'
                >
                  Add to Cart
                </button>
                <button 
                  onClick={() => toggleWishlist(product._id)}
                  className='w-10 h-10 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 transition-colors'
                  title='Remove from Wishlist'
                >
                  <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Wishlist Summary */}
      <div className='mt-12 p-6 bg-gray-50 rounded-lg'>
        <h3 className='text-lg font-semibold mb-4'>Wishlist Summary</h3>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='text-center'>
            <p className='text-2xl font-bold text-black'>{wishlistProducts.length}</p>
            <p className='text-sm text-gray-600'>Total Items</p>
          </div>
          <div className='text-center'>
            <p className='text-2xl font-bold text-black'>
              {currency}{wishlistProducts.reduce((total, product) => total + product.price, 0)}
            </p>
            <p className='text-sm text-gray-600'>Total Value</p>
          </div>
          <div className='text-center'>
            <p className='text-2xl font-bold text-black'>
              {wishlistProducts.filter(p => p.bestseller).length}
            </p>
            <p className='text-sm text-gray-600'>Bestsellers</p>
          </div>
        </div>
        
        <div className='flex gap-4 mt-6 justify-center'>
          <Link 
            to='/collection'
            className='px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors'
          >
            Continue Shopping
          </Link>
          <button 
            onClick={() => {
              // Add all items to cart
              wishlistProducts.forEach(product => {
                const defaultVolume = product.volume?.[0] || '30ml';
                addToCart(product._id, defaultVolume);
              });
            }}
            className='px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors'
          >
            Add All to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
