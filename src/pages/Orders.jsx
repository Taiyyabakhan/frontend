import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const {orders} = useContext(ShopContext);
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Processing':
        return 'bg-yellow-500';
      case 'Shipped':
        return 'bg-blue-500';
      case 'Delivered':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'}/>
      </div>

      <div>
        {orders.length === 0 ? (
          <div className='text-center py-12'>
            <p className='text-gray-500 text-lg'>You haven't placed any orders yet</p>
            <button 
              onClick={() => navigate('/collection')}
              className='mt-4 bg-black text-white px-8 py-2 rounded'
            >
              Start Shopping
            </button>
          </div>
        ) : (
          orders.map((order, index) => (
            <div key={order.id} className='py-6 border-t border-b text-gray-700'>
              {/* Order Header */}
              <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4'>
                <div>
                  <p className='font-medium'>Order ID: #{order.id}</p>
                  <p className='text-sm text-gray-500'>Date: {formatDate(order.orderDate)}</p>
                  <p className='text-sm text-gray-500'>Payment: {order.paymentMethod}</p>
                </div>
                <div className='flex items-center gap-2'>
                  <p className={`min-w-2 h-2 rounded-full ${getStatusColor(order.status)}`}></p>
                  <p className='text-sm md:text-base capitalize'>{order.status}</p>
                </div>
              </div>

              {/* Order Items */}
              <div className='space-y-4'>
                {order.items.map((item, itemIndex) => (
                  <div key={itemIndex} className='flex items-start gap-6 text-sm'>
                    <img className='w-16 sm:w-20' src={item.image} alt={item.name} />
                    <div className='flex-1'>
                      <p className='sm:text-base font-medium'>{item.name}</p>
                      <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                        <p>${item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Size: {item.volume}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Total and Actions */}
              <div className='mt-4 pt-4 border-t flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                <div className='text-lg font-semibold'>
                  Total: ${order.totalAmount.toFixed(2)}
                </div>
                <button 
                  onClick={() => handleTrackOrder(order)}
                  className='border-2 border-gray-300 px-4 py-2 text-sm hover:bg-gray-50 transition-colors'
                >
                  Track Order
                </button>
              </div>
            </div>
          ))
        )}
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
                <h4 className='font-medium mb-2'>Order #{selectedOrder.id}</h4>
                <p className='text-sm text-gray-600'>Status: {selectedOrder.status}</p>
                <p className='text-sm text-gray-600'>Estimated Delivery: {formatDate(selectedOrder.estimatedDelivery)}</p>
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
