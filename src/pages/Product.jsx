import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Related_product from "../components/Related_product";
import RecentlyViewed from "../components/RecentlyViewed";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, addToRecentlyViewed } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [volume, setVolume] = useState('')

  const fetchProductData = () => {
    const product = products.find(item => item._id === productId);
    
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
      // Track recently viewed
      addToRecentlyViewed(productId);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  if (!productData) return <div>Loading...</div>;

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in-out duration-500 opacity-100">
      {/* Product data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product image */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt={productData.name}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt={productData.name} />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Volume</p>
            <div className='flex gap-2'>
              {productData.volume && productData.volume.map((item,index)=>(
                <button onClick={()=>setVolume(item)} className={`border py-2 px-4 bg-gray-100 $ ${item === volume ? 'border-orange-500' : ''}`} key={index}>{item}</button>
              ))}
            </div>

          </div>
          <button onClick={()=> addToCart(productData._id,volume)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original Product.</p>
            <p> Cash on delivery available on this product. </p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      {/*  Description  & Review Section*/}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews(122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam architecto unde suscipit eum ipsa aspernatur ad inventore, saepe quisquam numquam porro expedita sit dolor molestiae eligendi deleniti exercitationem voluptates ipsam.</p>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio odio fuga illum eum alias, eligendi nulla porro ea exercitationem laborum, quia eius vero explicabo ducimus debitis odit. Numquam, ducimus quod?</p>
        </div>
      </div>
      {/*display related products*/}
      <Related_product category={productData.category} subCategory= {productData.subCategory} />
      
      {/* Recently Viewed Products */}
      <RecentlyViewed />
    </div>
  );
};

export default Product;
