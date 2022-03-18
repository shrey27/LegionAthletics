import { createContext, useContext, useReducer, useEffect } from 'react';
import { CART_ENDPOINT } from '../../apiEndpoints';
import { useAuthCtx } from './authenticationContext';
import axios from 'axios';

//Cart Management context
const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { cartListData, addItemToCart, updateCartItem, deleteFromCart } =
    useCartAPICtx();

  const addToCart = (item) => {
    const index = cartListData.findIndex((e) => e.pid === item.pid);
    if (index < 0) {
      addItemToCart(item);
    } else {
      return;
    }
  };

  const incQty = (pid) => {
    updateCartItem(pid, true);
  };

  const decQty = (pid, qty) => {
    if (qty <= 1) {
      deleteFromCart(pid);
    } else {
      updateCartItem(pid, false);
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
  addedCartPID: []
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
        cartListData: [...action.payload]
      };
    case 'API_FAILURE':
      return {
        ...state,
        cartLoading: false,
        cartError: 'TECHNICAL ISSUE. PLEASE TRY AGAIN AFTER SOME TIME'
      };
    case 'UPDATE_CART_PID':
      const pidArray = state.cartListData;
      return {
        ...state,
        addedCartPID: pidArray.map((elem) => elem.pid)
      };
    default:
      return { ...defaultCartState };
  }
};

const CartAPIProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartApiReducerFunc, defaultCartState);
  const { cartLoading, cartError, cartListData, addedCartPID } = state;
  const { token } = useAuthCtx();

  const getCartList = async () => {
    if (token) {
      dispatch({ type: 'API_REQUEST' });
      try {
        const storedCart = JSON.parse(localStorage.getItem('userData')).cart;
        if (storedCart) {
          dispatch({ type: 'API_RESPONSE', payload: storedCart });
        } else {
          const resp = await axios.get(CART_ENDPOINT, {
            headers: {
              authorization: token
            }
          });
          const dataList = resp.data.cart;
          dispatch({ type: 'API_RESPONSE', payload: dataList });
        }
        dispatch({ type: 'UPDATE_CART_PID' });
      } catch (err) {
        console.log('GET-CART-ERROR', err);
        dispatch({ type: 'API_FAILURE' });
      }
    }
  };

  const addItemToCart = async (objectData) => {
    dispatch({ type: 'API_REQUEST' });
    try {
      const resp = await axios.post(
        CART_ENDPOINT,
        {
          product: {
            _id: objectData.pid,
            ...objectData
          }
        },
        {
          headers: {
            authorization: token
          }
        }
      );
      const dataList = resp.data.cart;
      dispatch({ type: 'API_RESPONSE', payload: dataList });
      dispatch({ type: 'UPDATE_CART_PID' });

      const datatoUpdate = JSON.parse(localStorage.getItem('userData'));
      datatoUpdate.cart = [...dataList];
      localStorage.setItem('userData', JSON.stringify(datatoUpdate));
    } catch (err) {
      console.log('POST-CART-ERROR', err);
      dispatch({ type: 'API_FAILURE' });
    }
  };

  const deleteFromCart = async (id) => {
    dispatch({ type: 'API_REQUEST' });
    try {
      const resp = await axios.delete(CART_ENDPOINT + '/' + id, {
        headers: {
          authorization: token
        }
      });
      const dataList = resp.data.cart;
      const storedData = JSON.parse(localStorage.getItem('userData'));
      storedData.cart = [...dataList];
      dispatch({ type: 'API_RESPONSE', payload: dataList });
      dispatch({ type: 'UPDATE_CART_PID' });
      localStorage.setItem('userData', JSON.stringify(storedData));
    } catch (err) {
      dispatch({ type: 'API_FAILURE' });
      console.log('DELETE-WISHLIST-ERROR', err);
    }
  };

  const updateCartItem = async (id, inc) => {
    dispatch({ type: 'API_REQUEST' });
    try {
      const resp = await axios.post(
        CART_ENDPOINT + '/' + id,
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
      const dataList = resp.data.cart;
      const storedData = JSON.parse(localStorage.getItem('userData'));
      storedData.cart = [...dataList];

      dispatch({ type: 'API_RESPONSE', payload: dataList });
      dispatch({ type: 'UPDATE_CART_PID' });
      localStorage.setItem('userData', JSON.stringify(storedData));
    } catch (err) {
      dispatch({ type: 'API_FAILURE' });
      console.log('DELETE-WISHLIST-ERROR', err);
    }
  };

  useEffect(() => {
    getCartList();
    return () => console.log('cart list clean up');
  }, []);

  useEffect(() => {
    if (!token) {
      dispatch({ type: 'CLEAR_ALL' });
    } else {
      const storedcart = JSON.parse(localStorage.getItem('userData')).cart;
      dispatch({ type: 'API_RESPONSE', payload: storedcart });
    }
  }, [token]);

  return (
    <CartAPIContext.Provider
      value={{
        cartLoading,
        cartError,
        cartListData,
        getCartList,
        addedCartPID,
        addItemToCart,
        deleteFromCart,
        updateCartItem
      }}
    >
      <CartProvider>{children}</CartProvider>
    </CartAPIContext.Provider>
  );
};

const useCartAPICtx = () => useContext(CartAPIContext);

export { useCartCtx, useCartAPICtx, CartAPIProvider };
