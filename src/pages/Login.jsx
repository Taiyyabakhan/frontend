import { useState, useContext } from "react"
import { ShopContext } from '../context/ShopContext'
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { assets } from '../assets/assets'

const Login = () => {

const [currentState, setCurrentState] = useState('Sign Up');
const [formData, setFormData] = useState({
  name: '',
  email: '',
  password: ''
});
const [showPassword, setShowPassword] = useState(false);
const navigate = useNavigate();
const { login, signup } = useContext(ShopContext);

const togglePasswordVisibility = () => {
  setShowPassword(!showPassword);
};

const handleModeSwitch = (mode) => {
  console.log('Switching to mode:', mode);
  setCurrentState(mode);
};

const onChangeHandler = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
}

const onSubmitHandler = async (event) => {
  event.preventDefault();
  
  try {
    if (currentState === 'Sign Up') {
      // Sign up logic
      if (!formData.name || !formData.email || !formData.password) {
        toast.error('Please fill all fields');
        return;
      }
      
      const success = await signup(formData.name, formData.email, formData.password);
      if (success) {
        setFormData({ name: '', email: '', password: '' });
        setCurrentState('Login');
      }
    } else {
      // Login logic
      if (!formData.email || !formData.password) {
        toast.error('Please fill email and password');
        return;
      }
      
      const success = await login(formData.email, formData.password);
      if (success) {
        setFormData({ name: '', email: '', password: '' });
        navigate('/');
      }
    }
  } catch (error) {
    toast.error('Something went wrong');
    console.error(error);
  }
}

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 '>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
      </div>
      {currentState === 'Login' ? '' : <input 
        type="text" 
        name="name"
        value={formData.name}
        onChange={onChangeHandler}
        className='w-full px-3 py-2 border border-gray-800' 
        placeholder='Name' 
        required/>
      }
      <input 
        type="email" 
        name="email"
        value={formData.email}
        onChange={onChangeHandler}
        className='w-full px-3 py-2 border border-gray-800' 
        placeholder='Email' 
        required/>
      <div className="relative w-full">
        <input 
          type={showPassword ? "text" : "password"} 
          name="password"
          value={formData.password}
          onChange={onChangeHandler}
          className='w-full px-3 py-2 pr-16 border border-gray-800' 
          placeholder='Password' 
          required/>
        <button 
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-600 hover:text-gray-800 cursor-pointer select-none bg-gray-100 px-2 py-1 rounded"
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password</p>
        {
          currentState === 'Login'
          ? <p onClick={() => handleModeSwitch('Sign Up')} className='cursor-pointer'>Create account</p>
          : <p onClick={() => handleModeSwitch('Login')} className='cursor-pointer'>Login Here</p>
        }
      </div>
      <button className="bg-black text-white font-light px-8 py-2 mt-4">{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
    </form>
  )
}

export default Login
