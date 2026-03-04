import React, { useState } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'
import { toast } from 'react-toastify'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!formData.email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'}/>
        <p className='text-gray-600 mt-4'>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
      </div>

      <div className='my-10 px-4 sm:px-8 lg:px-16'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
          
          {/* Contact Information */}
          <div className='space-y-8'>
            <div>
              <img className='w-full max-w-[400px] rounded-lg shadow-lg' src={assets.contact_img} alt="Contact Us" />
            </div>

            {/* Store Information */}
            <div className='bg-gray-50 p-6 rounded-lg'>
              <h3 className='font-semibold text-xl text-gray-800 mb-4'>Our Store</h3>
              <div className='space-y-3 text-gray-600'>
                <div className='flex items-start gap-3'>
                  <svg className="w-5 h-5 mt-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className='font-medium'>5923 Station Road</p>
                    <p>Boisar, Mumbai, Maharashtra 401501</p>
                  </div>
                </div>
                
                <div className='flex items-center gap-3'>
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className='font-medium'>Phone</p>
                    <p>+91 98765 43210</p>
                    <p>+91 87654 32109</p>
                  </div>
                </div>
                
                <div className='flex items-center gap-3'>
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className='font-medium'>Email</p>
                    <p>support@shopforever.com</p>
                    <p>info@shopforever.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className='bg-gray-50 p-6 rounded-lg'>
              <h3 className='font-semibold text-xl text-gray-800 mb-4'>Business Hours</h3>
              <div className='space-y-2 text-gray-600'>
                <div className='flex justify-between'>
                  <span>Monday - Friday</span>
                  <span className='font-medium'>9:00 AM - 8:00 PM</span>
                </div>
                <div className='flex justify-between'>
                  <span>Saturday</span>
                  <span className='font-medium'>10:00 AM - 6:00 PM</span>
                </div>
                <div className='flex justify-between'>
                  <span>Sunday</span>
                  <span className='font-medium'>11:00 AM - 4:00 PM</span>
                </div>
              </div>
            </div>

            {/* Careers Section */}
            <div className='bg-gray-50 p-6 rounded-lg'>
              <h3 className='font-semibold text-xl text-gray-800 mb-4'>Careers at Forever</h3>
              <p className='text-gray-600 mb-4'>Learn more about our teams and job openings. Join our growing family!</p>
              <button className='border border-black px-6 py-3 text-sm hover:bg-black hover:text-white transition-all duration-500'>
                Explore Jobs
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className='bg-white p-6 rounded-lg shadow-lg border border-gray-200'>
            <h3 className='font-semibold text-2xl text-gray-800 mb-6'>Send us a Message</h3>
            
            <form onSubmit={onSubmitHandler} className='space-y-4'>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={onChangeHandler}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent'
                    placeholder='Your Name'
                    required
                  />
                </div>
                
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={onChangeHandler}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent'
                    placeholder='your@email.com'
                    required
                  />
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={onChangeHandler}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent'
                  placeholder='+91 98765 43210'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Subject
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={onChangeHandler}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent'
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="product">Product Question</option>
                  <option value="order">Order Support</option>
                  <option value="return">Return & Refund</option>
                  <option value="partnership">Partnership</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={onChangeHandler}
                  rows="5"
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none'
                  placeholder='Tell us how we can help you...'
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className='w-full bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>

            {/* Quick Links */}
            <div className='mt-6 pt-6 border-t border-gray-200'>
              <p className='text-sm text-gray-600 mb-3'>Or reach out to us directly:</p>
              <div className='flex flex-wrap gap-3'>
                <a href="tel:+919876543210" className='flex items-center gap-2 text-sm text-gray-700 hover:text-black transition-colors'>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Us
                </a>
                <a href="mailto:support@shopforever.com" className='flex items-center gap-2 text-sm text-gray-700 hover:text-black transition-colors'>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Us
                </a>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className='flex items-center gap-2 text-sm text-gray-700 hover:text-black transition-colors'>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Additional Content Section */}
      <div className='bg-gray-50 py-16 px-4 sm:px-8 lg:px-16'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-800 mb-4'>Why Choose Forever?</h2>
            <p className='text-gray-600 max-w-2xl mx-auto'>We're committed to providing the best shopping experience with quality products and exceptional customer service.</p>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            <div className='text-center'>
              <div className='w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className='font-semibold text-lg mb-2'>Quality Products</h3>
              <p className='text-gray-600 text-sm'>Curated selection of premium quality items</p>
            </div>
            
            <div className='text-center'>
              <div className='w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className='font-semibold text-lg mb-2'>Fast Delivery</h3>
              <p className='text-gray-600 text-sm'>Quick and reliable shipping nationwide</p>
            </div>
            
            <div className='text-center'>
              <div className='w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75 9.75 9.75 0 00-9.75-9.75z" />
                </svg>
              </div>
              <h3 className='font-semibold text-lg mb-2'>24/7 Support</h3>
              <p className='text-gray-600 text-sm'>Round-the-clock customer assistance</p>
            </div>
            
            <div className='text-center'>
              <div className='w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className='font-semibold text-lg mb-2'>Customer First</h3>
              <p className='text-gray-600 text-sm'>Your satisfaction is our top priority</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className='py-16 px-4 sm:px-8 lg:px-16'>
        <div className='max-w-4xl mx-auto'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-800 mb-4'>Frequently Asked Questions</h2>
            <p className='text-gray-600'>Find answers to common questions about our products and services</p>
          </div>
          
          <div className='space-y-4'>
            <div className='bg-white border border-gray-200 rounded-lg p-6'>
              <h3 className='font-semibold text-lg mb-2'>How can I track my order?</h3>
              <p className='text-gray-600'>Once your order is shipped, you'll receive a tracking number via email. You can use this number to track your package on our website or the carrier's website.</p>
            </div>
            
            <div className='bg-white border border-gray-200 rounded-lg p-6'>
              <h3 className='font-semibold text-lg mb-2'>What is your return policy?</h3>
              <p className='text-gray-600'>We offer a 30-day return policy for all unused items in their original packaging. Please contact our customer service team to initiate a return.</p>
            </div>
            
            <div className='bg-white border border-gray-200 rounded-lg p-6'>
              <h3 className='font-semibold text-lg mb-2'>Do you offer international shipping?</h3>
              <p className='text-gray-600'>Currently, we ship within India. We're working on expanding our international shipping options soon.</p>
            </div>
            
            <div className='bg-white border border-gray-200 rounded-lg p-6'>
              <h3 className='font-semibold text-lg mb-2'>How can I contact customer support?</h3>
              <p className='text-gray-600'>You can reach our customer support team via email at support@shopforever.com, phone at +91 98765 43210, or through the contact form above.</p>
            </div>
          </div>
        </div>
      </div>
      
      <NewsletterBox />
    </div>
  )
}

export default Contact
