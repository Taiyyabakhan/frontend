import React, { useState, useEffect, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";  
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const {products, currency, cartItems, updateQuantity, removeFromCart} = useContext(ShopContext);
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
              quantity:cartItems[items][item]
            })
          } 
      }
    }
    setCartData(tempData);
  },[cartItems])

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl  mb-3'>
        <Title  text1={'YOUR'} text2={'CART'}/>
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
              className={`py-4 border-t border-b border-gray-300 text-gray-700 grid grid-cols-1 sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 relative overflow-hidden transition-transform duration-300 ${
                isSwiped ? '-translate-x-16' : 'translate-x-0'
              }`}
              onTouchStart={(e) => handleTouchStart(e, itemKey)}
            >
              <div className='flex items-start gap-6 sm:col-span-1'>
                  <img className="w-24 sm:w-40 h-24 sm:h-40 object-cover rounded" src={productData.image[0]} alt="" />
                  <div className='flex-1'>
                    <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                    <div className="flex items-center gap-5 mt-2">
                      <p>Price: {currency}{productData.price}</p>  
                      <p className="px-2 sm:px-3 sm:py-1 border bg-slate-100">{item.volume}</p>
                    </div>
                  </div>
                </div>
                
                {/* Enhanced Quantity Controls */}
                <div className='flex items-center justify-center sm:col-span-1'>
                  <div className='flex items-center border border-gray-300 rounded-lg'>
                    <button 
                      onClick={() => updateQuantity(item._id, item.volume, item.quantity - 1)}
                      className='w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors'
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className='w-12 text-center font-medium'>{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item._id, item.volume, item.quantity + 1)}
                      className='w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors'
                    >
                      +
                    </button>
                  </div>
                </div>
                
                {/* Delete Button */}
                <div className='flex items-center justify-end sm:col-span-1'>
                  <button 
                    onClick={() => removeFromCart(item._id, item.volume)}
                    className='p-2 hover:bg-red-50 rounded-lg transition-colors'
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
