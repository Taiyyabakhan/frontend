import React, { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets} from '../assets/assets'
import {NavLink, Link, useNavigate} from 'react-router-dom'

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [showCartPreview, setShowCartPreview] = useState(false);
  const navigate = useNavigate();

  const {setShowSearch, getCartCount, user, isAuthenticated, logout, cartItems, cartItemTimes, products, updateQuantity, removeFromCart, wishlist, isInWishlist, toggleWishlist} = useContext(ShopContext);

  // Get cart items for preview
  const getCartItems = () => {
    const items = [];
    Object.keys(cartItems).forEach(itemId => {
      const product = products.find(p => p._id === itemId);
      if (product) {
        Object.keys(cartItems[itemId]).forEach(volume => {
          const quantity = cartItems[itemId][volume];
          if (quantity > 0) {
            items.push({
              ...product,
              volume,
              quantity,
              totalPrice: product.price * quantity,
              timestamp: cartItemTimes[`${itemId}-${volume}`] || 0
            });
          }
        });
      }
    });
    // Sort by timestamp (latest first)
    items.sort((a, b) => b.timestamp - a.timestamp);
    return items;
  };

  const getTotalPrice = () => {
    return getCartItems().reduce((total, item) => total + item.totalPrice, 0);
  };

  const handleQuantityChange = (itemId, volume, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId, volume);
    } else {
      updateQuantity(itemId, volume, newQuantity);
    }
  };

  return (
    <>
      <div className='flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8 font-medium border-b'>

      <Link to='/'><img src={assets.logo} className='w-28 sm:w-32 lg:w-36' alt="" /></Link>

      <ul className='hidden lg:flex gap-6 text-sm text-gray-700'>
        <NavLink to='/' className='flex flex-col items-center gap-1'>
          <p>HOME</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
         <NavLink to='/collection' className='flex flex-col items-center gap-1'>
          <p>COLLECTION</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
         <NavLink to='/about' className='flex flex-col items-center gap-1'>
          <p>ABOUT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
         <NavLink to='/contact' className='flex flex-col items-center gap-1'>
          <p>CONTACT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
         <NavLink to='/shop' className='flex flex-col items-center gap-1'>
          <p>SHOP</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>

      </ul>
      <div className='flex items-center gap-4 sm:gap-6'>
        <img onClick={()=>setShowSearch(true) } src={assets.search_icon} className='w-5 cursor-pointer' alt="" />

        <div className='group relative'>
          {!isAuthenticated ? (
            <img 
              onClick={() => navigate('/login')} 
              className='w-5 cursor-pointer' 
              src={assets.profile_icon} 
              alt="" 
            />
          ) : (
            <img className='w-5 cursor-pointer' src={assets.profile_icon} alt="" />
          )}
          <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-50'>
            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-lg'>
              {isAuthenticated ? (
                <>
                  <p className='text-xs font-semibold text-black border-b pb-2 mb-1'>
                    {user?.name}
                  </p>
                  <p onClick={() => navigate('/profile')} className='cursor-pointer hover:text-black hover:bg-gray-200 px-2 py-1 rounded transition-colors'>My Profile</p>
                  <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black hover:bg-gray-200 px-2 py-1 rounded transition-colors'>Orders</p>
                  <p onClick={logout} className='cursor-pointer hover:text-black hover:bg-gray-200 px-2 py-1 rounded transition-colors'>Logout</p>
                </>
              ) : (
                <>
                  <p onClick={() => navigate('/login')} className='cursor-pointer hover:text-black hover:bg-gray-200 px-2 py-1 rounded transition-colors'>Login</p>
                  <p onClick={() => navigate('/login')} className='cursor-pointer hover:text-black hover:bg-gray-200 px-2 py-1 rounded transition-colors'>Sign Up</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Wishlist Icon */}
        <Link to='/wishlist' className='relative'>
          <div className='relative cursor-pointer group'>
            <svg className="w-5 min-w-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {wishlist.length > 0 && (
              <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-red-500 text-white aspect-square rounded-full text-[8px]'>
                {wishlist.length}
              </p>
            )}
          </div>
        </Link>

        <div className='group relative'>
          <div 
            className='relative cursor-pointer'
            onMouseEnter={() => setShowCartPreview(true)}
          >
            <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
            <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
          </div>
          
          {/* Cart Preview Dropdown */}
          <div 
            className='absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200'
            onMouseEnter={() => setShowCartPreview(true)}
            onMouseLeave={() => setShowCartPreview(false)}
          >
              <div className='p-4 max-h-96 overflow-y-auto'>
                {getCartItems().length > 0 ? (
                  <>
                    <h3 className='font-semibold text-gray-800 mb-3'>Cart Preview</h3>
                    <div className='space-y-3'>
                      {getCartItems().slice(0, 3).map((item, index) => (
                        <div key={`${item._id}-${item.volume}`} className='flex items-center gap-3 p-2 border rounded-lg'>
                          <img 
                            src={item.image[0]} 
                            alt={item.name} 
                            className='w-12 h-12 object-cover rounded flex-shrink-0'
                          />
                          <div className='flex-1 min-w-0'>
                            <p className='text-sm font-medium truncate' title={item.name}>{item.name}</p>
                            <p className='text-xs text-gray-500'>{item.volume}</p>
                            <p className='text-sm font-semibold'>${item.totalPrice}</p>
                          </div>
                          <div className='flex items-center gap-1 flex-shrink-0'>
                            <button 
                              onClick={() => handleQuantityChange(item._id, item.volume, item.quantity - 1)}
                              className='w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100'
                            >
                              -
                            </button>
                            <span className='w-8 text-center text-sm'>{item.quantity}</span>
                            <button 
                              onClick={() => handleQuantityChange(item._id, item.volume, item.quantity + 1)}
                              className='w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100'
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ))}
                      {getCartItems().length > 3 && (
                        <p className='text-sm text-gray-500 text-center'>
                          +{getCartItems().length - 3} more items
                        </p>
                      )}
                    </div>
                    <div className='mt-4 pt-3 border-t'>
                      <div className='flex justify-between items-center mb-3'>
                        <span className='font-semibold'>Total:</span>
                        <span className='font-bold text-lg'>${getTotalPrice()}</span>
                      </div>
                      <Link 
                        to='/cart' 
                        className='block w-full bg-black text-white py-2 rounded text-center hover:bg-gray-800 transition-colors'
                        onClick={() => setShowCartPreview(false)}
                      >
                        View Cart
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className='text-center py-8'>
                    <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                    <p className='text-gray-500'>Your cart is empty</p>
                    <Link 
                      to='/collection' 
                      className='inline-block mt-2 text-sm text-blue-600 hover:text-blue-800'
                      onClick={() => setShowCartPreview(false)}
                    >
                      Continue shopping
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <img  
          onClick={()=>setVisible(true)} 
          src={assets.menu_icon} 
          className='w-5 cursor-pointer lg:hidden' 
          alt="" 
        />
      </div>

      {/*sidebar menu for small screens responsive*/} 
      <div className={`fixed top-0 right-0 h-full w-64 sm:w-72 bg-white shadow-2xl transition-transform duration-300 z-50 lg:hidden ${visible ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className='flex flex-col h-full'>
          <div className='flex items-center justify-between p-4 border-b'>
            <h2 className='text-lg font-semibold'>Menu</h2>
            <button onClick={()=>setVisible(false)} className='p-2 hover:bg-gray-100 rounded-lg'>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <nav className='flex-1 overflow-y-auto'>
            <NavLink 
              onClick={()=>setVisible(false)} 
              className='flex items-center px-4 py-3 border-b hover:bg-gray-50 transition-colors' 
              to='/'
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              HOME
            </NavLink>
            
            <NavLink 
              onClick={()=>setVisible(false)} 
              className='flex items-center px-4 py-3 border-b hover:bg-gray-50 transition-colors' 
              to='/collection'
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              COLLECTION
            </NavLink>
            
            <NavLink 
              onClick={()=>setVisible(false)} 
              className='flex items-center px-4 py-3 border-b hover:bg-gray-50 transition-colors' 
              to='/shop'
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              SHOP
            </NavLink>
            
            <NavLink 
              onClick={()=>setVisible(false)} 
              className='flex items-center px-4 py-3 border-b hover:bg-gray-50 transition-colors' 
              to='/about'
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              ABOUT
            </NavLink>
            
            <NavLink 
              onClick={()=>setVisible(false)} 
              className='flex items-center px-4 py-3 border-b hover:bg-gray-50 transition-colors' 
              to='/contact'
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              CONTACT
            </NavLink>
          </nav>
        </div>
      </div>

      {/* Overlay */}
      {visible && (
        <div 
          className='fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden'
          onClick={() => setVisible(false)}
        />
      )}
    </>
  )
}

export default Navbar
