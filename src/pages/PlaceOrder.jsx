import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import React, { useContext, useState } from 'react'; 
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';


const PlaceOrder = () => {

  const [method, setMethod] = useState('cod');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    phone: ''
  });

  const {navigate, createOrder} = useContext(ShopContext);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    
    // Validate form
    const requiredFields = ['firstName', 'lastName', 'email', 'street', 'city', 'state', 'pincode', 'country', 'phone'];
    const isEmpty = requiredFields.some(field => !formData[field]);
    
    if (isEmpty) {
      toast.error('Please fill all delivery information fields');
      return;
    }

    // Create order
    const order = createOrder(formData, method);
    
    if (order) {
      navigate('/orders');
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h[80vh] border-t'>
      
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELEVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input 
            name="firstName"
            value={formData.firstName}
            onChange={onChangeHandler}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
            type="text" 
            placeholder='First name'
            required
          />
          <input 
            name="lastName"
            value={formData.lastName}
            onChange={onChangeHandler}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
            type="text" 
            placeholder='Last name'
            required
          />
        </div>
        <input 
          name="email"
          value={formData.email}
          onChange={onChangeHandler}
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
          type="email" 
          placeholder='Email address'
          required
        />
        <input 
          name="street"
          value={formData.street}
          onChange={onChangeHandler}
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
          type="text" 
          placeholder='Street'
          required
        />
        <div className='flex gap-3'>
          <input 
            name="city"
            value={formData.city}
            onChange={onChangeHandler}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
            type="text" 
            placeholder='City'
            required
          />
          <input 
            name="state"
            value={formData.state}
            onChange={onChangeHandler}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
            type="text" 
            placeholder='State'
            required
          />
        </div>
        <div className='flex gap-3'>
          <input 
            name="pincode"
            value={formData.pincode}
            onChange={onChangeHandler}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
            type="text" 
            placeholder='Pincode'
            required
          />
          <input 
            name="country"
            value={formData.country}
            onChange={onChangeHandler}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
            type="text" 
            placeholder='Country'
            required
          />
        </div>
        <input 
          name="phone"
          value={formData.phone}
          onChange={onChangeHandler}
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
          type="tel" 
          placeholder='Phone'
          required
        />
      </div>

      {/* ------------------ Right Side ----------------------  */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal/>
        </div>

        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />

          {/*  ------------ Payment Method Selection -----------------   */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={()=>setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
            </div>
            <div onClick={()=>setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
            </div>
            <div onClick={()=>setMethod('paytm')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'paytm' ? 'bg-green-400' : ''}`}></p>
              <img className='h-12 mx-4' src={assets.paytm_logo} alt="" />
            </div>
           <div onClick={()=>setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'> CASH ON DELEVERY</p>
            </div>          
          </div>

          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
          </div>

        </div>

      </div>
    </form>
  )
}

export default PlaceOrder
