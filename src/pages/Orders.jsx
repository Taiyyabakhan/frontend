import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const {products, currency} = useContext(ShopContext);
  const [showTracking, setShowTracking] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();

  const handleTrackOrder = (order) => {
    setSelectedOrder(order);
    setShowTracking(true);
  };

  const closeTracking = () => {
    setShowTracking(false);
    setSelectedOrder(null);
  };

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'}/>
      </div>

      <div>
        {
          products.slice(1,4).map((item, index) => (
            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4 '>
              <div className='flex items-start gap-6 text-sm'>
                <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
                <div>
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                    <p>{currency} {item.price}</p>
                    <p>Quantity: 1</p>
                    <p>Size: M</p>
                  </div>
                  <p>Date: <span className='text-gray-400'>25, August, 2025</span></p>
                </div>
              </div>
              <div className='md:w-1/2 flex justify-between'>
                <div className='flex items-center gap-2'>
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='text-sm md:text-base'>Ready to ship</p>
                </div>
                <button 
                  onClick={() => handleTrackOrder(item)}
                  className='border px-4 py-2 text-sm font-medium rounded-sm hover:bg-gray-100 transition-colors cursor-pointer'
                >
                  Track Order
                </button>
              </div>
            </div>
          ))
        }
      </div>

      {/* Tracking Modal */}
      {showTracking && selectedOrder && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg p-6 max-w-md w-full mx-4'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-lg font-semibold'>Order Tracking</h3>
              <button 
                onClick={closeTracking}
                className='text-gray-500 hover:text-gray-700 text-2xl leading-none'
              >
                ×
              </button>
            </div>
            
            <div className='space-y-4'>
              <div className='border-b pb-4'>
                <h4 className='font-medium mb-2'>{selectedOrder.name}</h4>
                <p className='text-sm text-gray-600'>Order ID: #{Date.now().toString().slice(-6)}</p>
                <p className='text-sm text-gray-600'>Estimated Delivery: 3-5 business days</p>
              </div>
              
              <div className='space-y-3'>
                <div className='flex items-center gap-3'>
                  <div className='w-4 h-4 rounded-full bg-green-500'></div>
                  <div>
                    <p className='text-sm font-medium'>Order Confirmed</p>
                    <p className='text-xs text-gray-500'>August 25, 2025 - 10:30 AM</p>
                  </div>
                </div>
                
                <div className='flex items-center gap-3'>
                  <div className='w-4 h-4 rounded-full bg-green-500'></div>
                  <div>
                    <p className='text-sm font-medium'>Processing</p>
                    <p className='text-xs text-gray-500'>August 25, 2025 - 2:15 PM</p>
                  </div>
                </div>
                
                <div className='flex items-center gap-3'>
                  <div className='w-4 h-4 rounded-full bg-green-500'></div>
                  <div>
                    <p className='text-sm font-medium'>Ready to Ship</p>
                    <p className='text-xs text-gray-500'>August 26, 2025 - 9:00 AM</p>
                  </div>
                </div>
                
                <div className='flex items-center gap-3'>
                  <div className='w-4 h-4 rounded-full bg-gray-300'></div>
                  <div>
                    <p className='text-sm font-medium text-gray-400'>Shipped</p>
                    <p className='text-xs text-gray-400'>Pending</p>
                  </div>
                </div>
                
                <div className='flex items-center gap-3'>
                  <div className='w-4 h-4 rounded-full bg-gray-300'></div>
                  <div>
                    <p className='text-sm font-medium text-gray-400'>Delivered</p>
                    <p className='text-xs text-gray-400'>Pending</p>
                  </div>
                </div>
              </div>
              
              <div className='pt-4 border-t'>
                <button 
                  onClick={closeTracking}
                  className='w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors'
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
    </div>
  )
}

export default Orders
