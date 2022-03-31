import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { makeServer } from './server';
import { BrowserRouter } from 'react-router-dom';
import {
  CartAPIProvider,
  WishlistProvider,
  AuthProvider,
  ProductsContextProvider,
  AddressContextProvider
} from './frontend/context';

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AddressContextProvider>
          <CartAPIProvider>
            <WishlistProvider>
              <ProductsContextProvider>
                <App />
              </ProductsContextProvider>
            </WishlistProvider>
          </CartAPIProvider>
        </AddressContextProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
