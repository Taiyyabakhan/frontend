import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from '../components/ProductItem'
import Title from '../components/Title'
import { assets } from '../assets/assets'

const Shop = () => {
  const { products, currency, addToCart, wishlist, addToWishlist, removeFromWishlist, isInWishlist } = useContext(ShopContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('relevant');

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    let productsCopy = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });

    switch (sortType) {
      case 'low-high':
        productsCopy.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        productsCopy.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredProducts(productsCopy);
  }, [products, sortType, searchTerm]);

  const toggleWishlist = (productId) => {
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  return (
    <div className='border-t pt-14'>
      {/* Shop Header */}
      <div className='text-center mb-8'>
        <Title text1={'SHOP'} text2={'NOW'} />
        <p className='text-gray-600 mt-4'>Discover our latest collection of premium products</p>
      </div>

      {/* Search and Controls */}
      <div className='text-center mb-8 px-4'>
        {/* Search Bar */}
        <div className='inline-flex items-center justify-center border border-gray-300 rounded-full px-6 py-3 w-full max-w-md mb-6'>
          <input 
            type="text"
            placeholder='Search products...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='flex-1 outline-none bg-inherit text-sm'
          />
          <img className='w-4 ml-2' src={assets.search_icon} alt="" />
        </div>

        {/* Sort Dropdown */}
        <div className='flex justify-center items-center gap-4'>
          <span className='text-sm text-gray-600'>
            {filteredProducts.length} products found
          </span>
          <select 
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className='border border-gray-300 text-sm px-4 py-2 rounded-sm outline-none'
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className='px-4 sm:px-8 mb-16'>
        {filteredProducts.length > 0 ? (
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
            {filteredProducts.map((item, index) => (
              <ProductItem
                key={index}
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
                onAddToCart={() => addToCart(item._id, '30ml')}
                onToggleWishlist={() => toggleWishlist(item._id)}
                isWishlisted={isInWishlist(item._id)}
              />
            ))}
          </div>
        ) : (
          <div className='text-center py-12'>
            <img className='w-32 h-32 mx-auto mb-4 opacity-50' src={assets.not_found_icon} alt="No products found" />
            <p className='text-gray-500 text-lg mb-2'>No products found</p>
            <p className='text-gray-400 text-sm'>Try adjusting your search</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSortType('relevant');
              }}
              className='mt-4 bg-black text-white px-6 py-2 text-sm rounded hover:bg-gray-800 transition-colors'
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Shop
