import HomePage from './frontend/homepage';
import Products from './frontend/products';
import Product from './frontend/product';
import Cart from './frontend/cart';
import Wishlist from './frontend/wishlist';
import Signin from './frontend/authentication/Signin';
import Signup from './frontend/authentication/Signup';
import MockAPI from './MockAPI';

import { Routes, Route } from 'react-router-dom';

export const HOMEPAGE = '/';
export const PRODUCTS = '/products';
export const CART = '/cart';
export const WISHLIST = '/wishlist';
export const SIGNIN = '/signin';
export const SIGNUP = '/signup';
export const MOCKAPI = '/mock-api';

export const availableRoutes = (
  <Routes>
    <Route path={HOMEPAGE} element={<HomePage />} />
    <Route path={PRODUCTS} element={<Products />} />
    <Route path={`${PRODUCTS}/:productId`} element={<Product />} />
    <Route path={CART} element={<Cart />} />
    <Route path={WISHLIST} element={<Wishlist />} />
    <Route path={SIGNIN} element={<Signin />} />
    <Route path={SIGNUP} element={<Signup />} />
    <Route path={MOCKAPI} element={<MockAPI />} />
  </Routes>
);
