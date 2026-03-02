import React, { useState, useEffect, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";  
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const {products, currency, cartItems, cartItemTimes, updateQuantity, removeFromCart} = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [swipedItems, setSwipedItems] = useState(new Set());

  // Touch handlers for swipe-to-delete
  const handleTouchStart = (e, itemId) => {
    const touch = e.touches[0];
    const startX = touch.clientX;
    
    const handleTouchMove = (moveEvent) => {
      const touch = moveEvent.touches[0];
      const currentX = touch.clientX;
      const diffX = startX - currentX;
      
      if (diffX > 50) { // Swiped left enough
        setSwipedItems(prev => new Set(prev).add(itemId));
      }
    };
    
    const handleTouchEnd = () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
    
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  };

  const handleSwipeDelete = (itemId, volume) => {
    removeFromCart(itemId, volume);
    setSwipedItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(`${itemId}-${volume}`);
      return newSet;
    });
  };

  const handleSwipeCancel = (itemId) => {
    setSwipedItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(itemId);
      return newSet;
    });
  };

  useEffect(()=>{
    const tempData = [];
    for(const items in cartItems){
      for(const item in cartItems[items]){
          if (cartItems[items][item]>0){
            tempData.push({
              _id: items,
              volume:item,
              quantity:cartItems[items][item],
              timestamp: cartItemTimes[`${items}-${item}`] || 0
            })
          } 
      }
    }
    // Sort by timestamp (latest first)
    tempData.sort((a, b) => b.timestamp - a.timestamp);
    setCartData(tempData);
  },[cartItems, cartItemTimes])

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl  mb-3'>
        <Title  text1={'YOUR'} text2={'CART'}/>
      </div>
      
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
        {/* Cart Header */}
        <div className='hidden lg:flex pb-4 border-b border-gray-200 text-sm font-semibold text-gray-600 px-4'>
          <div className='flex-1'>Product</div>
          <div className='w-24 text-center'>Quantity</div>
          <div className='w-24 text-center'>Subtotal</div>
          <div className='w-24 text-center'>Action</div>
        </div>
        
        <div>
        {
          cartData.map((item,index)=>{
            const productData = products.find(product => product._id === item._id);
            const itemKey = `${item._id}-${item.volume}`;
            const isSwiped = swipedItems.has(itemKey);

            return (
            <div 
              key={index} 
              className={`py-6 border-b border-gray-200 text-gray-700 flex flex-col lg:flex-row gap-4 items-center relative overflow-hidden transition-transform duration-300 px-4 ${
                isSwiped ? '-translate-x-16' : 'translate-x-0'
              }`}
              onTouchStart={(e) => handleTouchStart(e, itemKey)}
            >
              {/* Product Info */}
              <div className='flex-1 flex items-center gap-4 min-w-0'>
                  <img className="w-16 h-16 lg:w-20 lg:h-20 object-cover rounded-lg flex-shrink-0" src={productData.image[0]} alt="" />
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm lg:text-base font-medium truncate'>{productData.name}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2">
                      <p className="text-sm text-gray-600">Price: {currency}{productData.price}</p>  
                      <p className="text-xs sm:text-sm px-2 py-1 border bg-slate-100 rounded text-center w-fit">{item.volume}</p>
                    </div>
                  </div>
                </div>
                
                {/* Quantity Controls */}
                <div className='w-24 flex items-center justify-center'>
                  <div className='flex items-center border border-gray-300 rounded-lg overflow-hidden'>
                    <button 
                      onClick={() => updateQuantity(item._id, item.volume, item.quantity - 1)}
                      className='w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors border-r border-gray-300'
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className='w-12 text-center font-medium text-sm'>{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item._id, item.volume, item.quantity + 1)}
                      className='w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors border-l border-gray-300'
                    >
                      +
                    </button>
                  </div>
                </div>
                
                {/* Subtotal */}
                <div className='w-24 flex items-center justify-center'>
                  <p className='text-sm lg:text-base font-semibold text-gray-900'>
                    {currency}{(productData.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                
                {/* Delete Button */}
                <div className='w-24 flex items-center justify-center'>
                  <button 
                    onClick={() => removeFromCart(item._id, item.volume)}
                    className='p-2 hover:bg-red-50 rounded-lg transition-colors text-red-500 hover:text-red-700'
                  >
                    <img className="w-4 sm:w-5" src={assets.bin_icon} alt="Delete" />
                  </button>
                </div>

                {/* Swipe to Delete Indicator (Mobile) */}
                <div className={`absolute right-0 top-0 bottom-0 w-16 bg-red-500 flex items-center justify-center text-white transition-opacity duration-300 ${
                  isSwiped ? 'opacity-100' : 'opacity-0'
                }`}>
                  <button 
                    onClick={() => handleSwipeDelete(item._id, item.volume)}
                    className='p-2'
                  >
                    <img className="w-5" src={assets.bin_icon} alt="Delete" />
                  </button>
                </div>

                {/* Cancel Swipe Button */}
                {isSwiped && (
                  <div 
                    onClick={() => handleSwipeCancel(itemKey)}
                    className='absolute left-0 top-0 bottom-0 w-16 bg-gray-500 flex items-center justify-center text-white'
                  >
                    <span className='text-xs'>Cancel</span>
                  </div>
                )}
              </div>
            )
          })
        }
        </div>
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button onClick={()=>navigate('/place-order')} className="bg-black text-white text-sm my-8 px-8 py-3">PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
