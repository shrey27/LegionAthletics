import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { makeServer } from './server';
import { BrowserRouter } from 'react-router-dom';
import { ProductsContextProvider } from './frontend/context/productsContext';
import { AuthProvider } from './frontend/context/authenticationContext';
import { WishlistProvider } from './frontend/context/wishlistContext';

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <WishlistProvider>
          <ProductsContextProvider>
            <App />
          </ProductsContextProvider>
        </WishlistProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
