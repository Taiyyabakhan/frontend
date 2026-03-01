import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import QuickView from './QuickView';
import ProductComparison from './ProductComparison';

const ProductItem = ({ id, image, name, price, bestseller }) => {
  const { currency, isInWishlist, toggleWishlist, isInCompare, toggleCompare, addToRecentlyViewed, compareProducts, products } = useContext(ShopContext);
  const [showQuickView, setShowQuickView] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  const getStockStatus = (product) => {
    if (product.bestseller === true) return { status: 'In Stock', color: 'text-green-600', bg: 'bg-green-100' };
    return { status: 'Limited Stock', color: 'text-yellow-600', bg: 'bg-yellow-100' };
  };

  const stockInfo = getStockStatus({ bestseller });

  const handleProductClick = () => {
    addToRecentlyViewed(id);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    console.log('Quick View clicked for product:', id);
    console.log('Product object:', { _id: id, name, price, image, bestseller });
    setShowQuickView(true);
    console.log('showQuickView set to true');
  };

  const handleCompare = (e) => {
    e.preventDefault();
    if (compareProducts.length > 0) {
      setShowComparison(true);
    } else {
      toggleCompare(id);
    }
  };

  const product = { 
    _id: id, 
    name, 
    price, 
    image, 
    bestseller,
    description: products.find(p => p._id === id)?.description || 'High-quality skincare product with premium ingredients for optimal results.',
    volume: products.find(p => p._id === id)?.volume || ['30ml', '50ml', '100ml']
  };

  return (
    <>
      <div className="group relative">
        <Link 
          className='text-gray-700 cursor-pointer block' 
          to={`/product/${id}`}
          onClick={handleProductClick}
        >
          <div className='overflow-hidden rounded-xl shadow-sm group-hover:shadow-lg transition-shadow duration-300 relative'>
            <img
              className='hover:scale-110 transition ease-in-out h-72 w-56 object-cover border rounded-lg overflow-hidden shadow-sm'
              src={image[0]}
              alt={name}
            />
            
            {/* Stock Status Badge */}
            <div className='absolute top-2 left-2'>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${stockInfo.bg} ${stockInfo.color}`}>
                {stockInfo.status}
              </span>
            </div>

            {/* Quick Action Buttons */}
            <div className='absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2'>
              <button
                onClick={(e) => {
                  console.log('Quick View button clicked');
                  handleQuickView(e);
                }}
                className='w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors'
                title='Quick View'
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
              
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleWishlist(id);
                }}
                className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-colors ${
                  isInWishlist(id) 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white hover:bg-gray-100'
                }`}
                title='Add to Wishlist'
              >
                <svg className="w-4 h-4" fill={isInWishlist(id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>

              <button
                onClick={handleCompare}
                className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-colors ${
                  isInCompare(id) 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white hover:bg-gray-100'
                }`}
                title='Compare'
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </button>
            </div>
          </div>
        </Link>
        
        <div className="mt-2">
          <p className='pt-3 pb-1 text-sm truncate group-hover:text-black transition-colors'>{name}</p>
          <div className='flex items-center justify-between'>
            <p className='text-sm font-medium group-hover:text-black transition-colors'>{currency}{price}</p>
            {bestseller && (
              <span className='text-xs bg-red-100 text-red-600 px-1 rounded'>Hot</span>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {showQuickView && (
        <QuickView 
          product={product} 
          onClose={() => setShowQuickView(false)} 
        />
      )}

      {/* Comparison Modal */}
      {showComparison && (
        <ProductComparison 
          products={compareProducts.map(id => ({ _id: id, name: '', price: 0, image: [''], bestseller: false }))}
          onClose={() => setShowComparison(false)} 
        />
      )}
    </>
  );
};

export default ProductItem;
