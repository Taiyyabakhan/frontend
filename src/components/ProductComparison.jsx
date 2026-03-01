import React, { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';

const ProductComparison = ({ products, onClose }) => {
  const { currency, addToCart, isInWishlist, toggleWishlist } = useContext(ShopContext);
  const [selectedVolumes, setSelectedVolumes] = useState({});

  if (!products || products.length === 0) return null;

  const handleVolumeChange = (productId, volume) => {
    setSelectedVolumes(prev => ({ ...prev, [productId]: volume }));
  };

  const handleAddToCart = (product) => {
    const volume = selectedVolumes[product._id];
    if (!volume) {
      alert('Please select a volume first');
      return;
    }
    addToCart(product._id, volume);
  };

  const getStockStatus = (product) => {
    if (product.bestseller === true) return { status: 'In Stock', color: 'text-green-600' };
    return { status: 'Limited Stock', color: 'text-yellow-600' };
  };

  const features = [
    'Price',
    'Stock Status',
    'Bestseller',
    'Category',
    'Volume Options',
    'Description',
    'Actions'
  ];

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto'>
        {/* Header */}
        <div className='flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10'>
          <h2 className='text-xl font-semibold'>Compare Products ({products.length})</h2>
          <button 
            onClick={onClose}
            className='text-gray-500 hover:text-gray-700 text-2xl leading-none'
          >
            ×
          </button>
        </div>

        <div className='p-6'>
          {/* Comparison Table */}
          <div className='overflow-x-auto'>
            <table className='w-full border-collapse'>
              <thead>
                <tr>
                  <th className='text-left p-3 border-b font-medium'>Feature</th>
                  {products.map((product, index) => (
                    <th key={product._id} className='text-center p-3 border-b min-w-[200px]'>
                      <div className='space-y-2'>
                        <img 
                          src={product.image[0]} 
                          alt={product.name}
                          className='w-24 h-24 object-cover rounded mx-auto'
                        />
                        <div>
                          <h3 className='font-medium text-sm'>{product.name}</h3>
                          <p className='text-xs text-gray-500'>{product.category}</p>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Price */}
                <tr>
                  <td className='p-3 border-b font-medium'>Price</td>
                  {products.map(product => (
                    <td key={product._id} className='p-3 border-b text-center'>
                      <span className='text-lg font-bold'>{currency}{product.price}</span>
                    </td>
                  ))}
                </tr>

                {/* Stock Status */}
                <tr>
                  <td className='p-3 border-b font-medium'>Stock Status</td>
                  {products.map(product => {
                    const stockInfo = getStockStatus(product);
                    return (
                      <td key={product._id} className='p-3 border-b text-center'>
                        <span className={`text-sm font-medium ${stockInfo.color}`}>
                          {stockInfo.status}
                        </span>
                      </td>
                    );
                  })}
                </tr>

                {/* Bestseller */}
                <tr>
                  <td className='p-3 border-b font-medium'>Bestseller</td>
                  {products.map(product => (
                    <td key={product._id} className='p-3 border-b text-center'>
                      {product.bestseller ? (
                        <span className='bg-red-100 text-red-600 text-xs px-2 py-1 rounded'>Bestseller</span>
                      ) : (
                        <span className='text-gray-400'>-</span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Category */}
                <tr>
                  <td className='p-3 border-b font-medium'>Category</td>
                  {products.map(product => (
                    <td key={product._id} className='p-3 border-b text-center'>
                      <span className='text-sm'>{product.category}</span>
                    </td>
                  ))}
                </tr>

                {/* Volume Options */}
                <tr>
                  <td className='p-3 border-b font-medium'>Volume Options</td>
                  {products.map(product => (
                    <td key={product._id} className='p-3 border-b text-center'>
                      <div className='flex justify-center gap-1'>
                        {['30ml', '50ml', '100ml'].map(volume => (
                          <button
                            key={volume}
                            onClick={() => handleVolumeChange(product._id, volume)}
                            className={`px-2 py-1 text-xs border rounded transition-colors ${
                              selectedVolumes[product._id] === volume 
                                ? 'border-black bg-black text-white' 
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            {volume}
                          </button>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Description */}
                <tr>
                  <td className='p-3 border-b font-medium'>Description</td>
                  {products.map(product => (
                    <td key={product._id} className='p-3 border-b'>
                      <p className='text-xs text-gray-600 line-clamp-3'>{product.description}</p>
                    </td>
                  ))}
                </tr>

                {/* Actions */}
                <tr>
                  <td className='p-3 border-b font-medium'>Actions</td>
                  {products.map(product => (
                    <td key={product._id} className='p-3 border-b'>
                      <div className='flex flex-col gap-2'>
                        <button 
                          onClick={() => handleAddToCart(product)}
                          className='w-full bg-black text-white py-2 rounded text-sm hover:bg-gray-800 transition-colors'
                        >
                          Add to Cart
                        </button>
                        <button 
                          onClick={() => toggleWishlist(product._id)}
                          className={`w-full border py-2 rounded text-sm transition-colors ${
                            isInWishlist(product._id) 
                              ? 'border-red-500 text-red-500 bg-red-50' 
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          {isInWishlist(product._id) ? 'In Wishlist' : 'Add to Wishlist'}
                        </button>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Add More Products */}
          <div className='mt-6 text-center'>
            <p className='text-sm text-gray-500 mb-2'>
              You can compare up to 4 products at a time
            </p>
            <button 
              onClick={onClose}
              className='bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors'
            >
              Close Comparison
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductComparison;
