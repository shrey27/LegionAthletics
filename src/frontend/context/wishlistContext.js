import axios from 'axios';
import { createContext, useContext, useReducer, useEffect } from 'react';
import { GET_WISHLIST, POST_WISHLIST } from '../../apiEndpoints';
import { useAuthCtx } from './authenticationContext';

const WishListContext = createContext();

const defaultState = {
  wishlistLoading: false,
  wishListError: '',
  wishlistData: [],
  addedPID: []
};
const wishlistApiReducerFunc = (state, action) => {
  switch (action.type) {
    case 'API_REQUEST':
      return {
        ...state,
        wishlistLoading: true,
        wishListError: ''
      };
    case 'API_RESPONSE':
      return {
        ...state,
        wishlistLoading: false,
        wishListError: '',
        wishlistData: [...action.payload]
      };
    case 'API_FAILURE':
      return {
        ...state,
        wishlistLoading: false,
        wishListError: 'TECHNICAL ISSUE. PLEASE TRY AGAIN AFTER SOME TIME'
      };
    case 'UPDATE_WISHLIST_PID':
      const pidArray = state.wishlistData;
      return {
        ...state,
        addedPID: pidArray.map((elem) => elem.pid)
      };
    default:
      return { ...defaultState };
  }
};

const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistApiReducerFunc, defaultState);
  const { wishlistLoading, wishlistData, addedPID, wishListError } = state;
  const { token } = useAuthCtx();

  const getWishlist = async () => {
    dispatch({ type: 'API_REQUEST' });
    try {
      const storedWishlist = JSON.parse(
        localStorage.getItem('userData')
      ).wishlist;
      if (storedWishlist) {
        dispatch({ type: 'API_RESPONSE', payload: storedWishlist });
      } else {
        const resp = await axios.get(GET_WISHLIST);
        dispatch({ type: 'API_RESPONSE', payload: resp.data.wishlist });
      }
      dispatch({ type: 'UPDATE_WISHLIST_PID' });
    } catch (err) {
      console.log('GET-WISHLIST-ERROR', err);
      dispatch({ type: 'API_FAILURE' });
    }
  };

  const addToWishlist = async (pid, objectData) => {
    
    dispatch({ type: 'API_REQUEST' });
    const index = wishlistData.findIndex((e) => e.pid === pid);
    if (index < 0) {
      try {
        const resp = await axios.post(
          POST_WISHLIST,
          {
            product: {
              _id: pid,
              ...objectData
            }
          },
          {
            headers: {
              authorization: token
            }
          }
        );
        const dataList = resp.data.wishlist;
        console.log(dataList);
        dispatch({ type: 'API_RESPONSE', payload: dataList });
        dispatch({ type: 'UPDATE_WISHLIST_PID' });
        const datatoUpdate = JSON.parse(localStorage.getItem('userData'));
        datatoUpdate.wishlist = [...dataList];
        localStorage.setItem('userData', JSON.stringify(datatoUpdate));
      } catch (err) {
        console.log('POST-WISHLIST-ERROR', err);
        dispatch({ type: 'API_FAILURE' });
      }
    }
  };

  const deleteFromWishlist = async (id) => {
    dispatch({ type: 'API_REQUEST' });
    try {
      const token = localStorage.getItem('token');
      const resp = await axios({
        method: 'delete',
        url: GET_WISHLIST + '/' + id,
        headers: {
          authorization: token
        }
      });
      const dataList = resp.data.wishlist;
      const storedData = JSON.parse(localStorage.getItem('userData'));
      storedData.wishlist = [...dataList];
      dispatch({ type: 'API_RESPONSE', payload: dataList });
      dispatch({ type: 'UPDATE_WISHLIST_PID' });
      localStorage.setItem('userData', JSON.stringify(storedData));
    } catch (err) {
      dispatch({ type: 'API_FAILURE' });
      console.log('DELETE-WISHLIST-ERROR', err);
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  useEffect(() => {
    if (!token) {
      dispatch({ type: 'CLEAR_ALL' });
    } else {
      const storedWishlist = JSON.parse(
        localStorage.getItem('userData')
      ).wishlist;
      dispatch({ type: 'API_RESPONSE', payload: storedWishlist });
    }
  }, [token]);

  return (
    <WishListContext.Provider
      value={{
        addedPID,
        wishlistLoading,
        wishlistData,
        addToWishlist,
        wishListError,
        deleteFromWishlist
      }}
    >
      {children}
    </WishListContext.Provider>
  );
};
const useWishlistCtx = () => useContext(WishListContext);

export { useWishlistCtx, WishlistProvider };
