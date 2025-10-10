# Global Context Documentation

This global context provides centralized state management for the entire application, handling authentication, shopping cart, UI state, and app settings.

## Features

### 🔐 Authentication
- User login/logout state
- JWT token management
- User profile data
- Automatic token persistence in localStorage

### 🛒 Shopping Cart
- Add/remove items
- Update quantities
- Calculate totals
- Cart persistence across sessions

### 🎨 UI State
- Loading states
- Error handling
- Theme switching (light/dark)
- Language switching
- Notification system

## Usage

### 1. Wrap your app with GlobalProvider

```jsx
// main.jsx
import { GlobalProvider } from './context';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </StrictMode>
);
```

### 2. Use the context in any component

```jsx
import { useGlobalContext } from '../context';

const MyComponent = () => {
  const {
    // State
    isAuthenticated,
    user,
    cart,
    cartTotal,
    theme,
    
    // Actions
    login,
    logout,
    addToCart,
    setTheme
  } = useGlobalContext();

  // Your component logic here
};
```

## Available State & Actions

### State Properties

| Property | Type | Description |
|----------|------|-------------|
| `isAuthenticated` | boolean | User login status |
| `user` | object/null | Current user data |
| `token` | string/null | JWT authentication token |
| `cart` | array | Shopping cart items |
| `cartTotal` | number | Total cart value |
| `loading` | boolean | Global loading state |
| `error` | string/null | Global error message |
| `theme` | string | Current theme ('light'/'dark') |
| `language` | string | Current language code |
| `notifications` | array | Active notifications |

### Action Functions

| Function | Parameters | Description |
|----------|------------|-------------|
| `login(userData, token)` | userData: object, token: string | Authenticate user |
| `logout()` | none | Logout user and clear data |
| `addToCart(item)` | item: object | Add item to cart |
| `removeFromCart(itemId)` | itemId: string/number | Remove item from cart |
| `updateCartItem(itemId, updates)` | itemId, updates: object | Update cart item |
| `clearCart()` | none | Remove all cart items |
| `setLoading(loading)` | loading: boolean | Set global loading state |
| `setError(error)` | error: string | Set global error |
| `clearError()` | none | Clear global error |
| `setTheme(theme)` | theme: string | Change app theme |
| `setLanguage(language)` | language: string | Change app language |
| `addNotification(notification)` | notification: object | Add notification |
| `removeNotification(id)` | id: number | Remove notification |

## Examples

### Authentication

```jsx
const { login, logout, isAuthenticated, user } = useGlobalContext();

const handleLogin = async (credentials) => {
  try {
    const response = await authService.login(credentials);
    login(response.user, response.token);
  } catch (error) {
    console.error('Login failed:', error);
  }
};

const handleLogout = () => {
  logout();
  // Redirect to login page
};
```

### Shopping Cart

```jsx
const { cart, cartTotal, addToCart, removeFromCart } = useGlobalContext();

const handleAddToCart = (product) => {
  addToCart({
    id: product.id,
    name: product.name,
    price: product.price,
    quantity: 1
  });
};

const handleRemoveFromCart = (productId) => {
  removeFromCart(productId);
};
```

### Theme Switching

```jsx
const { theme, setTheme } = useGlobalContext();

const toggleTheme = () => {
  const newTheme = theme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
};
```

### Notifications

```jsx
const { addNotification, removeNotification } = useGlobalContext();

const showSuccessMessage = (message) => {
  addNotification({
    type: 'success',
    title: 'Success',
    message: message
  });
};

const showErrorMessage = (error) => {
  addNotification({
    type: 'error',
    title: 'Error',
    message: error
  });
};
```

## Cart Item Structure

Cart items should have the following structure:

```jsx
const cartItem = {
  id: 'unique-id',           // Required: unique identifier
  name: 'Product Name',      // Required: product name
  price: 99.99,             // Required: product price
  quantity: 1,              // Optional: defaults to 1
  image: 'url',             // Optional: product image
  category: 'category'      // Optional: product category
};
```

## Notification Structure

Notifications should have the following structure:

```jsx
const notification = {
  type: 'success',           // Required: 'success', 'error', 'warning', 'info'
  title: 'Title',            // Required: notification title
  message: 'Message',        // Required: notification message
  duration: 5000,           // Optional: auto-dismiss duration in ms
  action: {                 // Optional: action button
    label: 'Action',
    onClick: () => {}
  }
};
```

## Best Practices

1. **Always use the context hook**: Don't try to access the context directly
2. **Handle errors gracefully**: Use the error state for user feedback
3. **Persist important data**: The context automatically persists tokens and settings
4. **Use loading states**: Show loading indicators during async operations
5. **Keep cart items simple**: Only store essential data in cart items
6. **Clear cart on logout**: The context automatically handles this

## Troubleshooting

### Common Issues

1. **Context not available**: Make sure your component is wrapped with `GlobalProvider`
2. **State not updating**: Check that you're using the correct action function
3. **Cart calculations wrong**: Ensure cart items have valid `price` and `quantity` properties
4. **Theme not persisting**: Check localStorage permissions in your browser

### Debug Mode

You can add console logs to debug context updates:

```jsx
useEffect(() => {
  console.log('Context updated:', { isAuthenticated, user, cart });
}, [isAuthenticated, user, cart]);
```
