import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState
} from 'react';
import { GET_PRODUCTS } from '../../apiEndpoints';
import axios from 'axios';

const ProductsContext = createContext();

const useProductsCtx = () => useContext(ProductsContext);
const defaultState = {
  includeOutOfStock: false,
  onlyFastDelivery: false,
  category: [],
  sortingDirection: '',
  rating: 0,
  priceLimit: 10000,
  search: '',
  selectedInputs: []
};

const reducerFunction = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_OUT_OF_STOCK':
      return {
        ...state,
        includeOutOfStock: !state.includeOutOfStock,
        selectedInputs: [...state.selectedInputs, action.target]
      };
    case 'TOGGLE_ONLY_FAST_DELIVERY':
      return {
        ...state,
        onlyFastDelivery: !state.onlyFastDelivery,
        selectedInputs: [...state.selectedInputs, action.target]
      };
    case 'ADD_CATEGORY':
      return {
        ...state,
        category: action.payload && [...state.category, action.payload],
        selectedInputs: [...state.selectedInputs, action.target]
      };
    case 'REMOVE_CATEGORY':
      return {
        ...state,
        category:
          action.payload &&
          [...state.category].filter((e) => e !== action.payload),
        selectedInputs: [...state.selectedInputs, action.target]
      };
    case 'SET_SORTING_DIRECTION':
      return {
        ...state,
        sortingDirection: action.payload,
        selectedInputs: [...state.selectedInputs, action.target]
      };
    case 'SET_RATING':
      return {
        ...state,
        rating: action.payload,
        selectedInputs: [...state.selectedInputs, action.target]
      };
    case 'SET_PRICE_LIMIT':
      return {
        ...state,
        priceLimit: action.payload,
        selectedInputs: [...state.selectedInputs, action.target]
      };
    case 'NAVBAR_ITEM_SEARCH':
      return {
        ...state,
        search: action.payload
      };
    case 'NAVBAR_SEARCH_CLEAR':
      return {
        ...state,
        search: ''
      };
    case 'CLEAR_ALL':
      return {
        ...defaultState
      };
    default:
      return {
        ...state
      };
  }
};

const sortAndFilterItems = (
  list,
  includeOutOfStock,
  onlyFastDelivery,
  category,
  sortingDirection,
  rating,
  priceLimit,
  search
) => {
  let tempList = [...list];

  tempList = [
    ...tempList.filter((elem) => (includeOutOfStock ? true : !elem.nostock))
  ];

  if (search) {
    tempList = [
      ...tempList.filter((elem) => elem.title.toLowerCase().includes(search))
    ];
  }
  if (onlyFastDelivery) {
    tempList = [...tempList.filter((elem) => elem.fastdelivery)];
  }
  if (rating) {
    tempList = [...tempList.filter((elem) => elem.rating >= rating)];
  }
  if (priceLimit) {
    tempList = [...tempList.filter((elem) => elem.price <= priceLimit)];
  }
  if (category.length !== 0) {
    tempList = [...tempList.filter((elem) => category.includes(elem.category))];
  }

  if (sortingDirection) {
    return sortingDirection === 'LOW_TO_HIGH'
      ? tempList.sort((a, b) => a['price'] - b['price'])
      : tempList.sort((a, b) => b['price'] - a['price']);
  } else {
    return tempList;
  }
};

const ProductsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducerFunction, defaultState);
  const [productList, setProductList] = useState([]);

  const {
    includeOutOfStock,
    onlyFastDelivery,
    category,
    sortingDirection,
    rating,
    priceLimit,
    selectedInputs,
    search
  } = state;

  const filteredData = sortAndFilterItems(
    productList,
    includeOutOfStock,
    onlyFastDelivery,
    category,
    sortingDirection,
    rating,
    priceLimit,
    search
  );

  useEffect(() => {
    (async () => {
      try {
        let resp = await axios.get(GET_PRODUCTS);
        setProductList(resp.data.products);
      } catch (err) {
        console.log('GET-PRODUCTS ERROR FROM USEEFFECT', err);
      }
    })();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        productListing: [...filteredData],
        includeOutOfStock,
        onlyFastDelivery,
        category,
        sortingDirection,
        rating,
        priceLimit,
        dispatch,
        selectedInputs
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

const useProductId = (id) => {
  const { productListing } = useProductsCtx();
  return productListing.find((elem) => elem.pid === id);
};

export { useProductId, useProductsCtx, ProductsContextProvider };
