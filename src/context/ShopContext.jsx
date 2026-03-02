import { createContext, useState , useEffect} from "react";
import {products} from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency ='$';
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState(() => {
    // Load cart from localStorage on initial load
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : {};
});
const [cartItemTimes, setCartItemTimes] = useState(() => {
    // Load cart item timestamps from localStorage on initial load
    const savedTimes = localStorage.getItem('cartItemTimes');
    return savedTimes ? JSON.parse(savedTimes) : {};
});
const [wishlist, setWishlist] = useState(() => {
    // Load wishlist from localStorage on initial load
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
});
const [recentlyViewed, setRecentlyViewed] = useState(() => {
    // Load recently viewed from localStorage on initial load
    const saved = localStorage.getItem('recentlyViewed');
    return saved ? JSON.parse(saved) : [];
});
const [compareProducts, setCompareProducts] = useState(() => {
    // Load comparison list from localStorage on initial load
    const saved = localStorage.getItem('compareProducts');
    return saved ? JSON.parse(saved) : [];
});
const [orders, setOrders] = useState(() => {
    // Load orders from localStorage on initial load
    const savedOrders = localStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
});
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate()

    const login = async (email, password) => {
        try {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const foundUser = users.find(u => u.email === email && u.password === password);
            
            if (foundUser) {
                setUser(foundUser);
                setIsAuthenticated(true);
                localStorage.setItem('currentUser', JSON.stringify(foundUser));
                toast.success('Login successful!');
                return true;
            } else {
                toast.error('Invalid email or password');
                return false;
            }
        } catch (error) {
            toast.error('Login failed');
            return false;
        }
    };

    const signup = async (name, email, password) => {
        try {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            
            if (users.find(u => u.email === email)) {
                toast.error('User already exists with this email');
                return false;
            }

            const newUser = {
                id: Date.now().toString(),
                name,
                email,
                password,
                image: null, 
                createdAt: new Date().toISOString()
            };

            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            
            toast.success('Account created successfully!');
            return true;
        } catch (error) {
            toast.error('Signup failed');
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('currentUser');
        toast.success('Logged out successfully');
        navigate('/login');
    };

    const updateUser = (updatedUserData) => {
        setUser(updatedUserData);
        localStorage.setItem('currentUser', JSON.stringify(updatedUserData));
    };

    const checkAuthStatus = () => {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            setUser(JSON.parse(currentUser));
            setIsAuthenticated(true);
        }
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    // Save cart item timestamps to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('cartItemTimes', JSON.stringify(cartItemTimes));
    }, [cartItemTimes]);

    // Save wishlist to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    // Save recently viewed to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
    }, [recentlyViewed]);

    // Save comparison list to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('compareProducts', JSON.stringify(compareProducts));
    }, [compareProducts]);

    // Save orders to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('orders', JSON.stringify(orders));
    }, [orders]);

    // Recently viewed functions
    const addToRecentlyViewed = (productId) => {
        setRecentlyViewed(prev => {
            const filtered = prev.filter(id => id !== productId);
            return [productId, ...filtered].slice(0, 10); // Keep max 10 items
        });
    };

    // Comparison functions
    const addToCompare = (productId) => {
        if (compareProducts.includes(productId)) {
            return; // Already in comparison
        }
        if (compareProducts.length >= 4) {
            toast.error('You can compare up to 4 products at a time');
            return;
        }
        setCompareProducts(prev => [...prev, productId]);
        toast.success('Added to comparison');
    };

    const removeFromCompare = (productId) => {
        setCompareProducts(prev => prev.filter(id => id !== productId));
    };

    const clearCompare = () => {
        setCompareProducts([]);
    };

    const isInCompare = (productId) => {
        return compareProducts.includes(productId);
    };

    const toggleCompare = (productId) => {
        if (isInCompare(productId)) {
            removeFromCompare(productId);
        } else {
            addToCompare(productId);
        }
    };

    // Wishlist functions
    const addToWishlist = (productId) => {
        setWishlist(prev => {
            if (!prev.includes(productId)) {
                return [...prev, productId];
            }
            return prev;
        });
        toast.success('Added to wishlist!');
    };

    const removeFromWishlist = (productId) => {
        setWishlist(prev => prev.filter(id => id !== productId));
        toast.success('Removed from wishlist!');
    };

    const isInWishlist = (productId) => {
        return wishlist.includes(productId);
    };

    const toggleWishlist = (productId) => {
        if (isInWishlist(productId)) {
            removeFromWishlist(productId);
        } else {
            addToWishlist(productId);
        }
    };

    const addToCart = async (itemId, volume) => {

        if (!volume){
            toast.error('Select Product Volume');
            return;
        }

        let cartData = structuredClone(cartItems);
        let timesData = structuredClone(cartItemTimes);

        if(cartData[itemId]){
            if (cartData[itemId][volume]){
                cartData[itemId][volume] += 1;
                // Update timestamp to bring item to top
                timesData[`${itemId}-${volume}`] = Date.now();
                toast.success('Item quantity updated!');
            }
            else{
                cartData[itemId][volume] = 1;
                // Add timestamp for new volume
                timesData[`${itemId}-${volume}`] = Date.now();
                toast.success('Item added to cart!');
            }
        }
        else{
            cartData[itemId] = {};
            cartData[itemId][volume] = 1;
            // Add timestamp for new item
            timesData[`${itemId}-${volume}`] = Date.now();
            toast.success('Item added to cart!');
        }
        setCartItems(cartData);
        setCartItemTimes(timesData);

    }
    const getCartCount = () => {
        let totalCount = 0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try{
                    if (cartItems[items][item]>0){
                        totalCount += cartItems[items][item];
                    }
                }catch(error){

                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, volume , quantity) => {
        
        let cartData = structuredClone(cartItems);

        if (quantity <= 0) {
            // Remove the item if quantity is 0 or less
            delete cartData[itemId][volume];
            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId];
            }
        } else {
            cartData[itemId][volume] = quantity;
        }

        setCartItems(cartData);
    }

    const removeFromCart = async (itemId, volume) => {
        let cartData = structuredClone(cartItems);
        
        if (cartData[itemId]) {
            delete cartData[itemId][volume];
            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId];
            }
        }
        
        setCartItems(cartData);
    }

    const getCartAmount =() => {
        let totalAmount = 0;
        for(const items in cartItems){
            let itemInfo = products.find((product)=> product._id === items);
            for(const item in cartItems[items]){
                try{
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    } 
                }catch (error){

                    }

            }
        }
        return totalAmount;
    }

    const createOrder = (deliveryInfo, paymentMethod) => {
        // Get current cart items
        const orderItems = [];
        for(const items in cartItems){
            for(const item in cartItems[items]){
                if (cartItems[items][item] > 0){
                    const product = products.find(p => p._id === items);
                    if (product) {
                        orderItems.push({
                            productId: items,
                            name: product.name,
                            image: product.image[0],
                            price: product.price,
                            volume: item,
                            quantity: cartItems[items][item],
                            totalPrice: product.price * cartItems[items][item]
                        });
                    }
                }
            }
        }

        if (orderItems.length === 0) {
            toast.error('Your cart is empty');
            return null;
        }

        // Create order object
        const newOrder = {
            id: Date.now().toString(),
            items: orderItems,
            deliveryInfo,
            paymentMethod,
            totalAmount: orderItems.reduce((total, item) => total + item.totalPrice, 0) + delivery_fee,
            status: 'Processing',
            orderDate: new Date().toISOString(),
            estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days from now
        };

        // Add order to orders list
        setOrders(prev => [newOrder, ...prev]);

        // Clear cart
        setCartItems({});
        setCartItemTimes({});

        toast.success('Order placed successfully!');
        return newOrder;
    }

    const value = {
        products,currency,delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, cartItemTimes, addToCart,
        getCartCount, updateQuantity, removeFromCart,
        getCartAmount, navigate,
        user, isAuthenticated, login, signup, logout, updateUser,
        wishlist, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist,
        recentlyViewed, addToRecentlyViewed,
        compareProducts, addToCompare, removeFromCompare, clearCompare, isInCompare, toggleCompare,
        orders, createOrder
    }
    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;

