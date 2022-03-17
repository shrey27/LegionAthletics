import './navbar.css';
import Drawer from './Drawer';
import { useState } from 'react';
// import { useCartCtx } from '../../context/cartContext';
// import { useWishlistCtx } from '../../context/wishlistContext';
import { useProductsCtx } from '../../context/productsContext';
import { Link } from 'react-router-dom';
import {
  HOMEPAGE,
  // CART,
  // WISHLIST,
  // SIGNIN,
  // SIGNUP
} from '../../../routes';
// import { useAuthCtx } from '../../context/authenticationContext';

export default function Navbar({ noDrawer, showSearchBar }) {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  // const { totalItems } = useCartCtx();
  // const { wishlistData } = useWishlistCtx();
  const { dispatch } = useProductsCtx();
  // const { userdata, handleSignOut } = useAuthCtx();

  const handleSearch = (e) => {
    e.preventDefault();
    const { value } = e.target;
    //route to products page
    setSearch(value);
    dispatch({
      type: 'NAVBAR_ITEM_SEARCH',
      payload: value.toLowerCase()
    });
  };

  const handleSearchClear = () => {
    dispatch({ type: 'NAVBAR_SEARCH_CLEAR' });
    setSearch('');
  };
  return (
    <div>
      <Drawer open={open} setOpen={setOpen} />
      <nav className='navbar xs-s border--btm'>
        {!noDrawer && (
          <span className='nav__icons'>
            <i
              className='fas fa-bars md sb show--drawer'
              onClick={() => setOpen(true)}
            ></i>
          </span>
        )}
        <section className='start'>
          <Link to={HOMEPAGE} className='start link__style'>
            <img className='box__image' src='lalogo.jpg' alt='logo' />
            <span className='box-span'>
              <span className='navbar__title primary'>LEGION ATHLETICS</span>
            </span>
          </Link>
        </section>
        {showSearchBar && (
          <section className='middle'>
            <div className='search--ctr'>
              {!search && <i className='fas fa-search search--btn'></i>}
              <input
                type='text'
                placeholder='Search'
                className='input no--bdr'
                id='user-name'
                name='user-name'
                autoComplete='off'
                value={search}
                onChange={handleSearch}
              />
              {search && (
                <i
                  className='fa-solid fa-xmark search--btn'
                  onClick={handleSearchClear}
                ></i>
              )}
            </div>
          </section>
        )}
        <section className='end'>
          <div className='menu'>
            <span className='menu__btn lg sb primary'>
              <i className='far fa-user-circle'></i>
              <span className='menu__btn__name'>Account</span>
            </span>
            <div className='submenu shadow xs-s'>
              {/* {!userdata && ( */}
                <section className='submenu__btn'>
                  {/* <Link className='btn btn--float' to={SIGNIN}> */}
                    Sign In
                  {/* </Link> */}
                  {/* <Link className='btn' to={SIGNUP}> */}
                    Sign Up
                  {/* </Link> */}
                </section>
              {/* )} */}
              <section className='submenu__items flex-st-ct flex-vertical'>
                {/* <Link to={PROFILE} className='submenu__item sb'>
                  <span>My Profile</span>
                </Link>
                <Link to={ORDERS} className='submenu__item sb'>
                  <span>Orders Summary</span>
                </Link> */}
                {/* <Link to={CART} className='submenu__item sb'>
                  Cart
                  <i
                    icon-badge={totalItems}
                    bdg-size='medium'
                    className='fas fa-shopping-cart nav__icons lg fl-rt'
                  ></i>
                </Link>
                <Link to={WISHLIST} className='submenu__item sb'>
                  Wishlist
                  <i
                    icon-badge={wishlistData.length}
                    bdg-size='medium'
                    className='far fa-heart nav__icons lg fl-rt'
                  ></i>
                </Link> */}
              </section>
              {/* {userdata && ( */}
                <section className='submenu__btn flex-st-ct'>
                  <button
                    className='btn btn--float btn--wide'
                    // onClick={handleSignOut}
                  >
                    Log Out
                  </button>
                </section>
              {/* )} */}
            </div>
          </div>
        </section>
      </nav>
    </div>
  );
}
