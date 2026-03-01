import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user, isAuthenticated, logout, updateUser } = useContext(ShopContext);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: ''
  });
  const [profileImage, setProfileImage] = useState(user?.profileImage || user?.image || null);

  const startEditing = () => {
    setEditFormData({
      name: user?.name || '',
      email: user?.email || ''
    });
    setProfileImage(user?.profileImage || user?.image || null);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditFormData({ name: '', email: '' });
  };

  const saveProfile = () => {
    // Update user data in localStorage (in real app, this would be an API call)
    const updatedUser = {
      ...user,
      name: editFormData.name,
      email: editFormData.email,
      profileImage: profileImage
    };
    
    // Update in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem('users', JSON.stringify(users));
    }
    
    // Update current user session and context
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    updateUser(updatedUser);
    
    toast.success('Profile updated successfully!');
    setIsEditing(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    console.log('File selected:', file);
    if (file) {
      console.log('Processing file...');
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log('FileReader completed, result length:', reader.result?.length);
        setProfileImage(reader.result);
      };
      reader.onerror = (error) => {
        console.error('FileReader error:', error);
      };
      reader.readAsDataURL(file);
    } else {
      console.log('No file selected');
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isAuthenticated) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50'>
        <div className='text-center'>
          <h1 className='text-2xl font-semibold mb-4'>Please Login</h1>
          <p className='text-gray-600 mb-6'>You need to be logged in to view your profile</p>
          <button 
            onClick={() => navigate('/login')}
            className='bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors'
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-4xl mx-auto px-4 py-8'>
      <div className='bg-white rounded-lg shadow-md p-6'>
        <div className='flex items-center gap-6 mb-8'>
          <div className='relative w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border-2 border-gray-300'>
            {profileImage ? (
              <img 
                src={profileImage} 
                alt="Profile" 
                className='w-full h-full object-cover'
              />
            ) : (
              <div className='flex items-center justify-center'>
                <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            )}
            {isEditing && (
              <label className='absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors shadow-lg'>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h7.86a2 2 0 011.664.89l.812 1.22A2 2 0 0118 9v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <input 
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className='hidden'
                />
              </label>
            )}
          </div>
          <div className='flex-1'>
            <div className='flex items-center gap-3 mb-2'>
              <h1 className='text-2xl font-semibold'>{user?.name}</h1>
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <p className='text-gray-600 mb-1'>{user?.email}</p>
            <p className='text-sm text-gray-500'>Member since: {new Date(user?.createdAt).toLocaleDateString()}</p>
            <div className='flex items-center gap-2 mt-3'>
              <span className='px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full'>Active</span>
              <span className='px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full'>Verified</span>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* Account Information */}
          <div className='bg-gray-50 p-4 rounded-lg'>
            <h2 className='text-lg font-semibold mb-4'>Account Information</h2>
            {isEditing ? (
              <div className='space-y-3'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Full Name</label>
                  <input 
                    type="text"
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
                  <input 
                    type="email"
                    name="email"
                    value={editFormData.email}
                    onChange={handleEditChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md'
                  />
                </div>
                <div className='flex gap-2 mt-4'>
                  <button 
                    onClick={saveProfile}
                    className='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors'
                  >
                    Save
                  </button>
                  <button 
                    onClick={cancelEditing}
                    className='px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors'
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className='space-y-3'>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Full Name:</span>
                  <span className='font-medium'>{user?.name}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Email:</span>
                  <span className='font-medium'>{user?.email}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>User ID:</span>
                  <span className='font-medium text-sm'>{user?.id}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-600'>Account Status:</span>
                  <span className='font-medium text-green-600'>Active</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className='bg-gray-50 p-4 rounded-lg'>
            <h2 className='text-lg font-semibold mb-4'>Quick Actions</h2>
            <div className='space-y-3'>
              {!isEditing && (
                <button 
                  onClick={startEditing}
                  className='w-full text-left px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors'
                >
                  Edit Profile
                </button>
              )}
              <button className='w-full text-left px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors'>
                Change Password
              </button>
              <button className='w-full text-left px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors'>
                Order History
              </button>
              <button 
                onClick={logout}
                className='w-full text-left px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded hover:bg-red-100 transition-colors'
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className='mt-8 bg-gray-50 p-4 rounded-lg'>
          <h2 className='text-lg font-semibold mb-4'>Preferences</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Email Notifications</label>
              <div className='flex items-center gap-2'>
                <input type="checkbox" defaultChecked className='w-4 h-4 text-blue-600 rounded' />
                <span className='text-sm'>Receive promotional emails</span>
              </div>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Language</label>
              <select className='w-full px-3 py-2 border border-gray-300 rounded-md'>
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
