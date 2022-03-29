import { createContext, useContext, useReducer, useEffect } from 'react';
import { CARTAPI } from '../../apiEndpoints';
import { useAuthCtx } from './authenticationContext';
import axios from 'axios';
import { ToastMessage } from '../common/toast';
//Cart Management context
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
  const { cartLoading, cartError, cartListData, addedCartPID } = state;
  const { token } = useAuthCtx();

  const addItemToCart = async (objectData) => {
    dispatch({ type: 'API_REQUEST' });
    try {
      const resp = await axios.post(
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
      const dataList = resp.data.cart;
      dispatch({ type: 'API_RESPONSE', payload: dataList });
      dispatch({ type: 'UPDATE_CART_PID' });

      const datatoUpdate = JSON.parse(localStorage.getItem('userData'));
      datatoUpdate.cart = [...dataList];
      localStorage.setItem('userData', JSON.stringify(datatoUpdate));
      ToastMessage('Product added to cart', 'success');
    } catch (err) {
      console.log('POST-CART-ERROR', err);
      dispatch({ type: 'API_FAILURE' });
      ToastMessage('Try adding product again', 'error');
    }
  };

  const deleteFromCart = async (id) => {
    dispatch({ type: 'API_REQUEST' });
    try {
      const resp = await axios.delete(CARTAPI + '/' + id, {
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
      ToastMessage('Product was delted from cart', 'info');
    } catch (err) {
      dispatch({ type: 'API_FAILURE' });
      console.log('DELETE-WISHLIST-ERROR', err);
      ToastMessage('Try deleting product again', 'error');
    }
  };

  const updateCartItem = async (id, inc) => {
    dispatch({ type: 'API_REQUEST' });
    try {
      const resp = await axios.post(
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
      const dataList = resp.data.cart;
      const storedData = JSON.parse(localStorage.getItem('userData'));
      storedData.cart = [...dataList];

      dispatch({ type: 'API_RESPONSE', payload: dataList });
      dispatch({ type: 'UPDATE_CART_PID' });
      localStorage.setItem('userData', JSON.stringify(storedData));
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

  // useEffect(() => {
  //   if (!token) {
  //     dispatch({ type: 'CLEAR_ALL' });
  //   } else {
  //     const storedcart = JSON.parse(localStorage.getItem('userData')).cart;
  //     dispatch({ type: 'API_RESPONSE', payload: storedcart });
  //   }
  // }, [token]);

  return (
    <CartAPIContext.Provider
      value={{
        cartLoading,
        cartError,
        cartListData,
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
