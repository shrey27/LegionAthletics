import { Fragment, useEffect } from 'react';
import './wishlist.css';
import Navbar from '../common/navbar';
import Category from '../common/header/Category';
import Footer from '../common/footer';
import Deals from '../common/deals';
import { useWishlistCtx } from '../context/wishlistContext';
import { useAuthCtx } from '../context/authenticationContext';
import Loader from '../common/Loader';
import { useNavigate } from 'react-router-dom';
import { SIGNIN } from '../../routes';

export default function Wishlist() {
  const navigate = useNavigate();
  const { wishlistLoading, wishlistData } = useWishlistCtx();
  const { userdata } = useAuthCtx();

  useEffect(() => {
    if (!userdata) {
      navigate(SIGNIN);
    }
  }, [userdata, navigate]);

  return (
    <Fragment>
      <Navbar />
      <Category />
      {wishlistLoading ? (
        <Loader />
      ) : (
        <Fragment>
          {wishlistData.length <= 0 ? (
            <div>
              <img
                src='empty.webp'
                alt='empty'
                className='image__empty img--md'
              />
            </div>
          ) : (
            <Deals
              items={wishlistData}
              close={true}
              name='Wishlist Items'
              wishlist={true}
            />
          )}
        </Fragment>
      )}
      <Footer fixed={wishlistData.length === 0} />
    </Fragment>
  );
}
