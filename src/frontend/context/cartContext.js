import { createContext, useContext, useReducer, useEffect } from 'react';
import { CARTAPI } from '../routes/routes';
import { useAuthCtx } from './authenticationContext';
import axios from 'axios';
import { ToastMessage } from '../components/toast';
import { useLocalStorage } from '../helpers';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { cartListData, addItemToCart, updateCartItem, deleteFromCart } =
    useCartAPICtx();

  const addToCart = (item) => {
    const index = cartListData.findIndex((e) => e._id === item._id);
    if (index < 0) {
      addItemToCart(item);
    } else {
      return;
    }
  };

  const incQty = (_id) => {
    updateCartItem(_id, true);
  };

  const decQty = (_id, qty) => {
    if (qty <= 1) {
      deleteFromCart(_id);
    } else {
      updateCartItem(_id, false);
    }
  };

  return (
    <CartContext.Provider
      value={{ totalItems: cartListData.length, incQty, decQty, addToCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
const useCartCtx = () => useContext(CartContext);

// Cart API context
const CartAPIContext = createContext();

const defaultCartState = {
  cartLoading: false,
  cartError: '',
  cartListData: [],
  addedCartPID: [],
  ordercart: {},
  orders: []
};
const cartApiReducerFunc = (state, action) => {
  switch (action.type) {
    case 'API_REQUEST':
      return {
        ...state,
        cartLoading: true,
        cartError: ''
      };
    case 'API_RESPONSE':
      return {
        ...state,
        cartLoading: false,
        cartError: '',
        cartListData: action.payload
      };
    case 'API_FAILURE':
      return {
        ...state,
        cartLoading: false,
        cartError: 'TECHNICAL ISSUE. PLEASE TRY AGAIN AFTER SOME TIME'
      };
    case 'UPDATE_CART_PID':
      return {
        ...state,
        addedCartPID: action.payload
      };
    case 'CHECKOUT_DETAILS':
      return {
        ...state,
        ordercart: action.payload
      };
    case 'UPDATE_ORDERS':
      return {
        ...state,
        orders: action.payload
      };
    case 'STOP_LOADER':
      return {
        ...state,
        cartLoading: false
      };
    default:
      return { ...defaultCartState };
  }
};

const CartAPIProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartApiReducerFunc, defaultCartState);
  const { addedCartPID } = state;
  const { token } = useAuthCtx();
  const { updateLocalStorage } = useLocalStorage();

  const addItemToCart = async (objectData) => {
    dispatch({ type: 'API_REQUEST' });
    try {
      const {
        data: { cart }
      } = await axios.post(
        CARTAPI,
        {
          product: {
            _id: objectData._id,
            ...objectData
          }
        },
        {
          headers: {
            authorization: token
          }
        }
      );
      updateLocalStorage('cart', cart);
      dispatch({ type: 'API_RESPONSE', payload: [...cart] });
      const idArray = cart.map((elem) => elem._id);
      dispatch({ type: 'UPDATE_CART_PID', payload: idArray });
      ToastMessage('Product added to cart', 'success');
    } catch (err) {
      console.log('POST-CART-ERROR', err);
      dispatch({ type: 'API_FAILURE' });
      ToastMessage('Try adding product again', 'error');
    }
  };

  const handleOrderPlaced = async (tempObj) => {
    dispatch({ type: 'API_REQUEST' });
    dispatch({ type: 'UPDATE_ORDERS', payload: tempObj });
    try {
      await axios.delete(CARTAPI + '/all', {
        headers: {
          authorization: token
        }
      });
      dispatch({ type: 'API_RESPONSE', payload: [] });
      dispatch({ type: 'UPDATE_CART_PID', payload: [] });
      updateLocalStorage('cart', []);
    } catch (err) {
      console.log('Delete all cart Items error', err);
    }
    ToastMessage('Payment Completed! Order is Placed', 'success');
  };

  const deleteFromCart = async (id) => {
    dispatch({ type: 'API_REQUEST' });
    try {
      const {
        data: { cart }
      } = await axios.delete(CARTAPI + '/' + id, {
        headers: {
          authorization: token
        }
      });
      updateLocalStorage('cart', cart);
      dispatch({ type: 'API_RESPONSE', payload: [...cart] });
      const idArray = cart.map((elem) => elem._id);
      dispatch({ type: 'UPDATE_CART_PID', payload: idArray });
      ToastMessage('Product was deleted from cart', 'info');
    } catch (err) {
      dispatch({ type: 'API_FAILURE' });
      console.log('DELETE-WISHLIST-ERROR', err);
      ToastMessage('Try deleting product again', 'error');
    }
  };

  const updateCartItem = async (id, inc) => {
    dispatch({ type: 'API_REQUEST' });
    try {
      const {
        data: { cart }
      } = await axios.post(
        CARTAPI + '/' + id,
        {
          action: {
            type: `${inc ? 'increment' : 'decrement'}`
          }
        },
        {
          headers: {
            authorization: token
          }
        }
      );
      updateLocalStorage('cart', cart);
      dispatch({ type: 'API_RESPONSE', payload: [...cart] });
      dispatch({ type: 'UPDATE_CART_PID' });
      const idArray = cart.map((elem) => elem._id);
      dispatch({ type: 'UPDATE_CART_PID', payload: idArray });
      ToastMessage('Quantity was updated', 'info');
    } catch (err) {
      dispatch({ type: 'API_FAILURE' });
      console.log('DELETE-WISHLIST-ERROR', err);
      ToastMessage('Try updating the quantity again', 'error');
    }
  };

  useEffect(() => {
    const getCartList = async () => {
      dispatch({ type: 'API_REQUEST' });
      try {
        const {
          data: { cart }
        } = await axios.get(CARTAPI, {
          headers: {
            authorization: token
          }
        });
        dispatch({ type: 'API_RESPONSE', payload: [...cart] });
        const idArray = cart.map((elem) => elem._id);
        dispatch({ type: 'UPDATE_CART_PID', payload: idArray });
      } catch (err) {
        console.log('GET-CART-ERROR', err);
        dispatch({ type: 'API_FAILURE' });
      }
    };
    if (token) getCartList();
  }, [token]);

  return (
    <CartAPIContext.Provider
      value={{
        ...state,
        dispatch,
        addedCartPID,
        addItemToCart,
        deleteFromCart,
        updateCartItem,
        handleOrderPlaced
      }}
    >
      <CartProvider>{children}</CartProvider>
    </CartAPIContext.Provider>
  );
};

const useCartAPICtx = () => useContext(CartAPIContext);

export { useCartCtx, useCartAPICtx, CartAPIProvider };
