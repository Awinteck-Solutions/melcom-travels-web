import { useGlobalContext } from '../context';

const ExampleUsage = () => {
  const {
    // State
    isAuthenticated,
    user,
    cart,
    cartTotal,
    loading,
    error,
    theme,
    language,
    notifications,
    
    // Actions
    login,
    logout,
    addToCart,
    removeFromCart,
    clearCart,
    setTheme,
    setLanguage,
    addNotification,
    removeNotification
  } = useGlobalContext();

  const handleLogin = () => {
    const mockUser = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com'
    };
    const mockToken = 'mock-jwt-token-123';
    
    login(mockUser, mockToken);
    addNotification({
      type: 'success',
      title: 'Login Successful',
      message: 'Welcome back, John!'
    });
  };

  const handleLogout = () => {
    logout();
    addNotification({
      type: 'info',
      title: 'Logged Out',
      message: 'You have been successfully logged out.'
    });
  };

  const handleAddToCart = () => {
    const mockItem = {
      id: Date.now(),
      name: 'Sample Product',
      price: 99.99,
      quantity: 1
    };
    
    addToCart(mockItem);
    addNotification({
      type: 'success',
      title: 'Added to Cart',
      message: 'Sample Product has been added to your cart.'
    });
  };

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const handleLanguageToggle = () => {
    const newLanguage = language === 'en' ? 'es' : 'en';
    setLanguage(newLanguage);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Global Context Example</h1>
      
      {/* Authentication Section */}
      <div className="mb-8 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Authentication</h2>
        <div className="space-y-2">
          <p><strong>Status:</strong> {isAuthenticated ? 'Logged In' : 'Not Logged In'}</p>
          {user && (
            <p><strong>User:</strong> {user.name} ({user.email})</p>
          )}
          <div className="space-x-2">
            {!isAuthenticated ? (
              <button
                onClick={handleLogin}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-[#364A9C]"
              >
                Login
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Cart Section */}
      <div className="mb-8 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
        <div className="space-y-2">
          <p><strong>Items in Cart:</strong> {cart.length}</p>
          <p><strong>Total:</strong> ${cartTotal.toFixed(2)}</p>
          <div className="space-x-2">
            <button
              onClick={handleAddToCart}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Add Sample Item
            </button>
            <button
              onClick={clearCart}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Clear Cart
            </button>
          </div>
          
          {cart.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Cart Items:</h3>
              <div className="space-y-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-2 bg-gray-100 rounded">
                    <span>{item.name} x{item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="px-2 py-1 bg-red-400 text-white rounded text-sm hover:bg-red-500"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* App Settings Section */}
      <div className="mb-8 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">App Settings</h2>
        <div className="space-y-4">
          <div>
            <p><strong>Current Theme:</strong> {theme}</p>
            <button
              onClick={handleThemeToggle}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              Toggle Theme
            </button>
          </div>
          
          <div>
            <p><strong>Current Language:</strong> {language}</p>
            <button
              onClick={handleLanguageToggle}
              className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
            >
              Toggle Language
            </button>
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="mb-8 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Notifications</h2>
        <div className="space-y-2">
          <button
            onClick={() => addNotification({
              type: 'info',
              title: 'Test Notification',
              message: 'This is a test notification!'
            })}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Add Test Notification
          </button>
          
          {notifications.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Active Notifications:</h3>
              <div className="space-y-2">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex justify-between items-center p-2 bg-blue-100 rounded">
                    <div>
                      <p className="font-semibold">{notification.title}</p>
                      <p className="text-sm">{notification.message}</p>
                    </div>
                    <button
                      onClick={() => removeNotification(notification.id)}
                      className="px-2 py-1 bg-red-400 text-white rounded text-sm hover:bg-red-500"
                    >
                      Dismiss
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Status Section */}
      <div className="p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">App Status</h2>
        <div className="space-y-2">
          <p><strong>Loading:</strong> {loading ? 'Yes' : 'No'}</p>
          <p><strong>Error:</strong> {error || 'None'}</p>
        </div>
      </div>
    </div>
  );
};

export default ExampleUsage;
