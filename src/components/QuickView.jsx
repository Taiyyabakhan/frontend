import React, { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';

const QuickView = ({ product, onClose }) => {
  const { currency, addToCart, isInWishlist, toggleWishlist } = useContext(ShopContext);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVolume, setSelectedVolume] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  if (!product) return null;

  const handleAddToCart = () => {
    if (!selectedVolume) {
      toast.error('Please select a volume');
      return;
    }
    addToCart(product._id, selectedVolume);
    toast.success('Added to cart!');
  };

  const handleImageMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const getStockStatus = (product) => {
    if (product.bestseller === true) return { status: 'In Stock', color: 'text-green-600', bg: 'bg-green-100' };
    return { status: 'Limited Stock', color: 'text-yellow-600', bg: 'bg-yellow-100' };
  };

  const stockInfo = getStockStatus(product);

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto'>
        {/* Header */}
        <div className='flex justify-between items-center p-4 border-b'>
          <h2 className='text-xl font-semibold'>Quick View</h2>
          <button 
            onClick={onClose}
            className='text-gray-500 hover:text-gray-700 text-2xl leading-none'
          >
            ×
          </button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 p-6'>
          {/* Image Gallery */}
          <div className='space-y-4'>
            {/* Main Image */}
            <div 
              className='relative overflow-hidden rounded-lg border cursor-crosshair'
              onMouseEnter={() => setShowZoom(true)}
              onMouseLeave={() => setShowZoom(false)}
              onMouseMove={handleImageMouseMove}
            >
              <img 
                src={product.image[selectedImage]} 
                alt={product.name}
                className='w-full h-96 object-cover'
              />
              
              {/* Zoom Effect */}
              {showZoom && (
                <div 
                  className='absolute inset-0 pointer-events-none'
                  style={{
                    backgroundImage: `url(${product.image[selectedImage]})`,
                    backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    backgroundSize: '200%',
                    backgroundRepeat: 'no-repeat'
                  }}
                />
              )}
            </div>

            {/* Thumbnail Gallery */}
            <div className='flex gap-2 overflow-x-auto'>
              {product.image.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 border-2 rounded overflow-hidden ${
                    selectedImage === index ? 'border-black' : 'border-gray-300'
                  }`}
                >
                  <img 
                    src={img} 
                    alt={`${product.name} ${index + 1}`}
                    className='w-full h-full object-cover'
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className='space-y-4'>
            {/* Product Name */}
            <h1 className='text-2xl font-semibold'>{product.name}</h1>
            
            {/* Price */}
            <div className='flex items-center gap-2'>
              <span className='text-2xl font-bold'>{currency}{product.price}</span>
              {product.bestseller && (
                <span className='bg-red-100 text-red-600 text-xs px-2 py-1 rounded'>Bestseller</span>
              )}
            </div>

            {/* Stock Status */}
            <div className='flex items-center gap-2'>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${stockInfo.bg} ${stockInfo.color}`}>
                {stockInfo.status}
              </span>
              <span className='text-sm text-gray-500'>
                {stockInfo.status === 'In Stock' ? 'Ready to ship' : 'Only a few left'}
              </span>
            </div>

            {/* Description */}
            <p className='text-gray-600 text-sm leading-relaxed'>{product.description}</p>

            {/* Volume Selection */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Select Volume</label>
              <div className='flex gap-2'>
                {['30ml', '50ml', '100ml'].map(volume => (
                  <button
                    key={volume}
                    onClick={() => setSelectedVolume(volume)}
                    className={`px-4 py-2 border rounded-lg transition-colors ${
                      selectedVolume === volume 
                        ? 'border-black bg-black text-white' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {volume}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Quantity</label>
              <div className='flex items-center gap-3'>
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className='w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100'
                >
                  -
                </button>
                <span className='w-12 text-center font-medium'>{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className='w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100'
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex gap-3'>
              <button 
                onClick={handleAddToCart}
                className='flex-1 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors'
              >
                Add to Cart
              </button>
              <button 
                onClick={() => toggleWishlist(product._id)}
                className={`w-12 h-12 border rounded-lg flex items-center justify-center transition-colors ${
                  isInWishlist(product._id) 
                    ? 'border-red-500 text-red-500 bg-red-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <svg className="w-5 h-5" fill={isInWishlist(product._id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            {/* Product Features */}
            <div className='border-t pt-4 space-y-2'>
              <div className='flex items-center gap-2 text-sm text-gray-600'>
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Free shipping on orders over $50
              </div>
              <div className='flex items-center gap-2 text-sm text-gray-600'>
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                30-day return policy
              </div>
              <div className='flex items-center gap-2 text-sm text-gray-600'>
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Authentic products guaranteed
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickView;
