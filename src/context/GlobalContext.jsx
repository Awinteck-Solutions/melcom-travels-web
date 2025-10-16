import { createContext, useContext, useReducer, useEffect } from 'react';

// Helper function to get stored user data
const getStoredUserData = () => {
  // Check if localStorage is available (client-side)
  if (typeof window === 'undefined' || !window.localStorage) {
    return {
      user: null,
      token: null,
      isAuthenticated: false
    };
  }

  try {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('authToken') || localStorage.getItem('token');
    console.log('storedToken', storedToken)
    if (storedUser && storedToken) {
      return {
        user: JSON.parse(storedUser),
        token: storedToken,
        isAuthenticated: true
      };
    }
  } catch (error) {
    console.error('Error parsing stored user data:', error);
  }
  
  return {
    user: null,
    token: null,
    isAuthenticated: false
  };
};

// Initial state
const initialState = {
  // Authentication
  isAuthenticated: false,
  user: null,
  token: null,
  
  // Shopping Cart
  cart: [],
  cartTotal: 0,
  
  // UI State
  loading: false,
  error: null,
  
  // App Settings
  theme: 'light',
  language: 'en',
  
  // Notifications
  notifications: []
};

// Action types
export const ACTIONS = {
  // Authentication
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  UPDATE_USER: 'UPDATE_USER',
  
  // Cart
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_CART_ITEM: 'UPDATE_CART_ITEM',
  CLEAR_CART: 'CLEAR_CART',
  
  // UI
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  
  // App Settings
  SET_THEME: 'SET_THEME',
  SET_LANGUAGE: 'SET_LANGUAGE',
  
  // Notifications
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION'
};

// Reducer function
const globalReducer = (state, action) => {
  switch (action.type) {
    // Authentication
    case ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null
      };
      
    case ACTIONS.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        cart: [],
        cartTotal: 0
      };
      
    case ACTIONS.UPDATE_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };
      
    // Cart
    case ACTIONS.ADD_TO_CART:
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      let newCart;
      
      if (existingItem) {
        newCart = state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
            : item
        );
      } else {
        newCart = [...state.cart, { ...action.payload, quantity: action.payload.quantity || 1 }];
      }
      
      const newCartTotal = newCart.reduce((total, item) => total + (item.price * item.quantity), 0);
      
      return {
        ...state,
        cart: newCart,
        cartTotal: newCartTotal
      };
      
    case ACTIONS.REMOVE_FROM_CART:
      const filteredCart = state.cart.filter(item => item.id !== action.payload);
      const filteredCartTotal = filteredCart.reduce((total, item) => total + (item.price * item.quantity), 0);
      
      return {
        ...state,
        cart: filteredCart,
        cartTotal: filteredCartTotal
      };
      
    case ACTIONS.UPDATE_CART_ITEM:
      const updatedCart = state.cart.map(item =>
        item.id === action.payload.id
          ? { ...item, ...action.payload.updates }
          : item
      );
      const updatedCartTotal = updatedCart.reduce((total, item) => total + (item.price * item.quantity), 0);
      
      return {
        ...state,
        cart: updatedCart,
        cartTotal: updatedCartTotal
      };
      
    case ACTIONS.CLEAR_CART:
      return {
        ...state,
        cart: [],
        cartTotal: 0
      };
      
    // UI
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
      
    case ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload
      };
      
    case ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
      
    // App Settings
    case ACTIONS.SET_THEME:
      return {
        ...state,
        theme: action.payload
      };
      
    case ACTIONS.SET_LANGUAGE:
      return {
        ...state,
        language: action.payload
      };
      
    // Notifications
    case ACTIONS.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, { ...action.payload, id: Date.now() }]
      };
      
    case ACTIONS.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(notification => notification.id !== action.payload)
      };
      
    default:
      return state;
  }
};

// Create context
const GlobalContext = createContext();

// Custom hook to use the context
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  // Persist user data and token to localStorage when they change
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      if (state.token && state.user) {
        localStorage.setItem('authToken', state.token);
        localStorage.setItem('user', JSON.stringify(state.user));
        console.log('User data stored:', state.user);
      } else {
        localStorage.removeItem('authToken');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        console.log('User data cleared');
      }
    }
  }, [state.token, state.user]);

  // Persist theme to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('theme', state.theme);
      document.documentElement.setAttribute('data-theme', state.theme);
    }
  }, [state.theme]);

  // Persist language to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('language', state.language);
    }
  }, [state.language]);

  // Load initial data from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      // Load user data
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('authToken') || localStorage.getItem('token');
      
      if (storedUser && storedToken) {
        try {
          const userData = JSON.parse(storedUser);
          dispatch({
            type: ACTIONS.LOGIN_SUCCESS,
            payload: { user: userData, token: storedToken }
          });
          console.log('User data loaded from localStorage:', userData);
        } catch (error) {
          console.error('Error parsing stored user data:', error);
        }
      }
      
      // Load theme and language
      const savedTheme = localStorage.getItem('theme');
      const savedLanguage = localStorage.getItem('language');
      
      if (savedTheme) {
        dispatch({ type: ACTIONS.SET_THEME, payload: savedTheme });
      }
      
      if (savedLanguage) {
        dispatch({ type: ACTIONS.SET_LANGUAGE, payload: savedLanguage });
      }
    }
  }, []);

  // Helper functions
  const login = (userData, token) => {
    dispatch({
      type: ACTIONS.LOGIN_SUCCESS,
      payload: { user: userData, token }
    });
  };

  const updateUser = (userUpdates) => {
    dispatch({
      type: ACTIONS.UPDATE_USER,
      payload: userUpdates
    });
  };

  const logout = () => {
    dispatch({ type: ACTIONS.LOGOUT });
  };

  const addToCart = (item) => {
    dispatch({ type: ACTIONS.ADD_TO_CART, payload: item });
  };

  const removeFromCart = (itemId) => {
    dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: itemId });
  };

  const updateCartItem = (itemId, updates) => {
    dispatch({ type: ACTIONS.UPDATE_CART_ITEM, payload: { id: itemId, updates } });
  };

  const clearCart = () => {
    dispatch({ type: ACTIONS.CLEAR_CART });
  };

  const setLoading = (loading) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: loading });
  };

  const setError = (error) => {
    dispatch({ type: ACTIONS.SET_ERROR, payload: error });
  };

  const clearError = () => {
    dispatch({ type: ACTIONS.CLEAR_ERROR });
  };

  const setTheme = (theme) => {
    dispatch({ type: ACTIONS.SET_THEME, payload: theme });
  };

  const setLanguage = (language) => {
    dispatch({ type: ACTIONS.SET_LANGUAGE, payload: language });
  };

  const addNotification = (notification) => {
    dispatch({ type: ACTIONS.ADD_NOTIFICATION, payload: notification });
  };

  const removeNotification = (notificationId) => {
    dispatch({ type: ACTIONS.REMOVE_NOTIFICATION, payload: notificationId });
  };

  const value = {
    ...state,
    login,
    logout,
    updateUser,
    addToCart,
    removeFromCart,
    updateCartItem,
    clearCart,
    setLoading,
    setError,
    clearError,
    setTheme,
    setLanguage,
    addNotification,
    removeNotification
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};
