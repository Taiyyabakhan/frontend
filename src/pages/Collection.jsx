import React, { useContext, useState, useEffect} from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {

  const {products, search, showSearch, setSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType , setSortType] = useState('relevant');

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)){
      setCategory(prev=> prev.filter(item => item !== e.target.value))
    }
    else{
      setCategory(prev => [...prev,e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)){
      setSubCategory(prev=> prev.filter(item => item !== e.target.value))
    }
    else{
      setSubCategory(prev => [...prev,e.target.value])
    }
  }
   
  const applyFilter = () =>{
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));

    }

    if (category.length > 0){
      productsCopy = productsCopy.filter(item => category.includes(item.category))
    }

    if (subCategory.length > 0){
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }

    setFilterProducts(productsCopy)

  }

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch(sortType){
      case 'low-high':
        setFilterProducts(fpCopy.sort((a,b)=>(a.price - b.price)));
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a,b)=>(b.price - a.price)));
        break;
      case 'newest':
      setFilterProducts(fpCopy.sort((a, b) => new Date(b.date) - new Date(a.date)));
      break;
      case 'bestSellers':
      setFilterProducts(fpCopy.sort((a, b) => b.bestseller - a.bestseller));
      break;
      case 'nameAsc':
      setFilterProducts(fpCopy.sort((a, b) => a.name.localeCompare(b.name)));
      break;
      case 'nameDesc':
      setFilterProducts(fpCopy.sort((a, b) => b.name.localeCompare(a.name)));
      break;
      
      default:
        applyFilter();
        break;
    }

  }

  useEffect (()=>{
    applyFilter();
  },[category, subCategory, search, showSearch])

  useEffect(()=>{
    sortProduct();
  },[sortType])

 

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      
      {/*filter option */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt=""/>
        </p>
        {/*category filter */}
         <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'}`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
             <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'All Skin Types'} onChange={toggleCategory} />
              All Skin Types 
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Oily Skin'}  onChange={toggleCategory}/>
              Oily Skin
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Dry Skin'} onChange={toggleCategory} />
              Dry Skin
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Combination Skin'} onChange={toggleCategory} />
              Combination Skin
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Normal Skin'} onChange={toggleCategory} />
             Normal Skin
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Sensitive Skin'} onChange={toggleCategory} />
              Sensitive Skin
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Acne-Prone Skin'} onChange={toggleCategory} />
              Acne-Prone Skin
            </p>
          </div>
        </div>
        {/*sub categories */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'}`}>
  <p className='mb-3 text-sm font-medium'>Type</p>
  <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
    <label className='flex gap-2 cursor-pointer'>
      <input className='w-3' type="checkbox" value={'Cleanser'} onChange={toggleSubCategory} />
      Cleanser
    </label>
    <label className='flex gap-2 cursor-pointer'>
      <input className='w-3' type="checkbox" value={'Moisturizer'} onChange={toggleSubCategory} />
      Moisturizer
    </label>
    <label className='flex gap-2 cursor-pointer'>
      <input className='w-3' type="checkbox" value={'Toner'} onChange={toggleSubCategory} />
      Toner
    </label>
    <label className='flex gap-2 cursor-pointer'>
      <input className='w-3' type="checkbox" value={'Sunscreen'} onChange={toggleSubCategory} />
      Sunscreen
    </label>
    <label className='flex gap-2 cursor-pointer'>
      <input className='w-3' type="checkbox" value={'LipCare'} onChange={toggleSubCategory} />
      Lip Care
    </label>
    <label className='flex gap-2 cursor-pointer'>
      <input className='w-3' type="checkbox" value={'Serum'} onChange={toggleSubCategory} />
      Serum
    </label>
    <label className='flex gap-2 cursor-pointer'>
      <input className='w-3' type="checkbox" value={'Face Pack'} onChange={toggleSubCategory} />
      Face Pack
    </label>
    <label className='flex gap-2 cursor-pointer'>
      <input className='w-3' type="checkbox" value={'Essence'} onChange={toggleSubCategory} />
      Essence
    </label>
  </div>
</div>

      </div>  
    {/*sub categories */}
    <div className='flex-1'>
      <div className='flex justify-between text-base sm:text-2x1 mb-4'>
        <Title text1={'ALL'} text2={'COLLECTION'}/>
        {/* Product Sort */}
        <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2' name="" id="">
          <option value="relavent">Sort bt: Relavent</option>
          <option value="low-high">Sort by:Low to High</option>
          <option value="high-low">Sort by:Low to High</option>
          <option value="newest">Newest Arrivals</option>
          <option value="bestSellers">Best Sellers</option>
          <option value="rating">Customer Rating</option>
          <option value="nameAsc">Name: A-Z</option>
          <option value="nameDesc">Name: Z-A</option>
        </select>
      </div>

      {/* Map Products */}
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
        {
          filterProducts.length > 0 ? (
            filterProducts.map((item, index) => (
              <ProductItem 
                key={index} 
                id={item._id} 
                image={item.image} 
                name={item.name} 
                price={item.price} 
                bestseller={item.bestseller}
              />
            ))
          ) : (
            <div className='col-span-full flex flex-col items-center justify-center py-16'>
              <div className='text-center'>
                <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>No products found</h3>
                <p className='text-gray-600 mb-6'>
                  {showSearch && search 
                    ? `No products found for "${search}". Try different keywords or browse our categories.`
                    : 'No products match your current filters. Try adjusting your filters.'
                  }
                </p>
                <div className='flex gap-4 justify-center'>
                  {showSearch && search && (
                    <button 
                      onClick={() => setSearch('')}
                      className='px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors'
                    >
                      Clear Search
                    </button>
                  )}
                  <button 
                    onClick={() => {
                      // Clear all filters
                      setCategory([]);
                      setSubCategory([]);
                      setSortType('relevant');
                    }}
                    className='px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors'
                  >
                    Clear Filters
                  </button>
                </div>
                
                {/* Suggestions */}
                {showSearch && search && (
                  <div className='mt-8 text-left max-w-md mx-auto'>
                    <h4 className='font-medium text-gray-900 mb-3'>Suggestions:</h4>
                    <ul className='text-sm text-gray-600 space-y-1'>
                      <li>• Check your spelling</li>
                      <li>• Try more general keywords</li>
                      <li>• Browse our categories below</li>
                      <li>• Try different filter combinations</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )
        }
      </div>

    </div>
    </div>

  )
}

export default Collection
