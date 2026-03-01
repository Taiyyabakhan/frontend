import React, { useContext, useEffect, useState, useRef } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const { search, setSearch, showSearch, setShowSearch, products } = useContext(ShopContext);
    const [visible, setVisible] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [recentSearches, setRecentSearches] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        category: '',
        minPrice: '',
        maxPrice: '',
        rating: ''
    });
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const searchRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();

    // Load recent searches from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('recentSearches');
        if (saved) {
            setRecentSearches(JSON.parse(saved));
        }
    }, []);

    // Generate suggestions based on current search
    useEffect(() => {
        if (search.length > 0) {
            const filtered = products
                .filter(product => 
                    product.name.toLowerCase().includes(search.toLowerCase()) ||
                    product.category?.toLowerCase().includes(search.toLowerCase())
                )
                .slice(0, 5)
                .map(product => ({
                    name: product.name,
                    category: product.category,
                    image: product.image[0]
                }));
            
            setSuggestions(filtered);
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    }, [search, products]);

    useEffect(() => {
        if (showSearch) {
            setVisible(true);
            if (!location.pathname.includes('collection')) {
                navigate('/collection');
            }
        } else {
            setVisible(false);
            setShowSuggestions(false);
            setShowFilters(false);
        }
    }, [location, showSearch, navigate]);

    const handleSearch = (searchTerm = search) => {
        if (searchTerm.trim()) {
            // Save to recent searches
            const updated = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5);
            setRecentSearches(updated);
            localStorage.setItem('recentSearches', JSON.stringify(updated));
            
            setSearch(searchTerm);
            setShowSuggestions(false);
            setShowFilters(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
            setShowSearch(false);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            setHighlightedIndex(prev => 
                prev < suggestions.length + recentSearches.length - 1 ? prev + 1 : 0
            );
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setHighlightedIndex(prev => prev > 0 ? prev - 1 : suggestions.length + recentSearches.length - 1);
        } else if (e.key === 'Escape') {
            setShowSuggestions(false);
        }
    };

    const selectSuggestion = (suggestion) => {
        setSearch(suggestion);
        handleSearch(suggestion);
        setShowSearch(false);
    };

    const clearRecentSearches = () => {
        setRecentSearches([]);
        localStorage.removeItem('recentSearches');
    };

    const applyFilters = () => {
        handleSearch();
        setShowFilters(false);
    };

    const clearFilters = () => {
        setFilters({ category: '', minPrice: '', maxPrice: '', rating: '' });
    };

    const allSuggestions = [
        ...recentSearches.map(search => ({ type: 'recent', value: search })),
        ...suggestions.map(suggestion => ({ type: 'product', ...suggestion }))
    ];

    return showSearch && visible ? (
        <div className='border-t border-b bg-pink-100 text-center relative'>
            <div className='inline-flex items-center border border-gray-400 px-4 ms-8 rounded-full w-3/4 sm:w-1/2 h-12 relative'>
                <input 
                    ref={searchRef}
                    type="text" 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                    onKeyDown={handleKeyDown}
                    onFocus={() => setShowSuggestions(true)}
                    className='flex-1 outline-none bg-inherit text-sm py-2' 
                    placeholder='Search products...'
                />
                <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className='p-1 hover:bg-pink-200 rounded-full transition-colors'
                    title='Search filters'
                >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                    </svg>
                </button>
                <img className='w-4 ml-2' src={assets.search_icon} alt="" />
            </div>
            
            {/* Suggestions Dropdown */}
            {showSuggestions && (recentSearches.length > 0 || suggestions.length > 0) && (
                <div className='absolute top-full left-1/2 transform -translate-x-1/2 w-3/4 sm:w-1/2 bg-white border border-gray-300 rounded-lg shadow-lg mt-2 z-50 max-h-96 overflow-y-auto'>
                    {/* Recent Searches */}
                    {recentSearches.length > 0 && (
                        <div className='border-b'>
                            <div className='flex justify-between items-center px-4 py-2 bg-gray-50'>
                                <span className='text-xs font-semibold text-gray-600'>Recent Searches</span>
                                <button 
                                    onClick={clearRecentSearches}
                                    className='text-xs text-red-500 hover:text-red-700'
                                >
                                    Clear
                                </button>
                            </div>
                            {recentSearches.map((recent, index) => (
                                <div
                                    key={recent}
                                    onClick={() => selectSuggestion(recent)}
                                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2 ${
                                        highlightedIndex === index ? 'bg-gray-100' : ''
                                    }`}
                                >
                                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                                    </svg>
                                    <span className='text-sm'>{recent}</span>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    {/* Product Suggestions */}
                    {suggestions.length > 0 && (
                        <div>
                            <div className='px-4 py-2 bg-gray-50'>
                                <span className='text-xs font-semibold text-gray-600'>Products</span>
                            </div>
                            {suggestions.map((suggestion, index) => (
                                <div
                                    key={suggestion.name}
                                    onClick={() => selectSuggestion(suggestion.name)}
                                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-3 ${
                                        highlightedIndex === recentSearches.length + index ? 'bg-gray-100' : ''
                                    }`}
                                >
                                    <img 
                                        src={suggestion.image} 
                                        alt={suggestion.name} 
                                        className='w-8 h-8 object-cover rounded'
                                    />
                                    <div className='flex-1 text-left'>
                                        <div className='text-sm font-medium'>{suggestion.name}</div>
                                        <div className='text-xs text-gray-500'>{suggestion.category}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Filters Panel */}
            {showFilters && (
                <div className='absolute top-full left-1/2 transform -translate-x-1/2 w-3/4 sm:w-1/2 bg-white border border-gray-300 rounded-lg shadow-lg mt-2 z-50 p-4'>
                    <h3 className='font-semibold mb-4'>Search Filters</h3>
                    
                    <div className='space-y-4'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Category</label>
                            <select 
                                value={filters.category}
                                onChange={(e) => setFilters({...filters, category: e.target.value})}
                                className='w-full px-3 py-2 border border-gray-300 rounded-md'
                            >
                                <option value=''>All Categories</option>
                                <option value='Skincare'>Skincare</option>
                                <option value='Makeup'>Makeup</option>
                                <option value='Hair'>Hair Care</option>
                                <option value='Body'>Body Care</option>
                            </select>
                        </div>
                        
                        <div className='grid grid-cols-2 gap-2'>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>Min Price</label>
                                <input 
                                    type="number"
                                    value={filters.minPrice}
                                    onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                                    placeholder='0'
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md'
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>Max Price</label>
                                <input 
                                    type="number"
                                    value={filters.maxPrice}
                                    onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                                    placeholder='1000'
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md'
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Rating</label>
                            <select 
                                value={filters.rating}
                                onChange={(e) => setFilters({...filters, rating: e.target.value})}
                                className='w-full px-3 py-2 border border-gray-300 rounded-md'
                            >
                                <option value=''>All Ratings</option>
                                <option value='4'>4+ Stars</option>
                                <option value='3'>3+ Stars</option>
                                <option value='2'>2+ Stars</option>
                            </select>
                        </div>
                        
                        <div className='flex gap-2 pt-2'>
                            <button 
                                onClick={applyFilters}
                                className='flex-1 bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors'
                            >
                                Apply Filters
                            </button>
                            <button 
                                onClick={clearFilters}
                                className='flex-1 border border-gray-300 py-2 rounded hover:bg-gray-50 transition-colors'
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            <img 
                onClick={() => setShowSearch(false)} 
                className='inline w-3 cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2' 
                src={assets.cross_icon} 
                alt="Close search" 
            />
        </div>
    ) : null;
}

export default SearchBar;
