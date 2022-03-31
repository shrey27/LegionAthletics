import { createContext, useContext, useReducer } from 'react';

import axios from 'axios';

const AddressContext = createContext();

const useAddressCtx = () => useContext(AddressContext);

const addressState = {
  firstname: '',
  lastname: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  stateLoc: '',
  pincode: '',
  addressLoader: false,
  errorFields: []
};

const addressReducerFunction = (state, action) => {
  switch (action.type) {
    case 'SET_FIRSTNAME':
      return {
        ...state,
        firstname: action.payload
      };
    case 'SET_LASTNAME':
      return {
        ...state,
        lastname: action.payload
      };
    case 'SET_EMAIL':
      return {
        ...state,
        email: action.payload
      };
    case 'SET_PHONE':
      return {
        ...state,
        phone: action.payload
      };
    case 'SET_ADDRESS':
      return {
        ...state,
        address: action.payload
      };
    case 'SET_CITY':
      return {
        ...state,
        city: action.payload
      };
    case 'SET_STATE':
      return {
        ...state,
        stateLoc: action.payload
      };
    case 'SET_PINCODE':
      return {
        ...state,
        pincode: action.payload
      };
    case 'CLEAR_ERRORS':
      return {
        ...state,
        errorFields: []
      };
    case 'ERROR_FIELDS':
      return {
        ...state,
        errorFields: action.payload
      };
    default:
      return {
        ...state
      };
  }
};

const AddressContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(addressReducerFunction, addressState);

  const validationAddress = (addressObject) => {
    const {
      firstname,
      lastname,
      phone,
      email,
      address,
      city,
      stateLoc,
      pincode
    } = addressObject;
    const errors = [];
    if (!firstname) errors.push('firstname');
    if (!lastname) errors.push('lastname');
    if (!phone) errors.push('phone');
    if (!address) errors.push('address');
    if (!email) errors.push('email');
    if (!city) errors.push('city');
    if (!stateLoc) errors.push('stateLoc');
    if (!pincode) errors.push('pincode');

    if (errors.length) {
      dispatch({ type: 'ERROR_FIELDS', payload: [...errors] });
      return false;
    }
    return true;
  };

  return (
    <AddressContext.Provider value={{ ...state, dispatch, validationAddress }}>
      {children}
    </AddressContext.Provider>
  );
};

export { AddressContextProvider, useAddressCtx };
