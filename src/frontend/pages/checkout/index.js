import './checkout.css';
import { Fragment } from 'react';
import CheckoutCard from './CheckoutCard';
import { useCartAPICtx } from '../../context';
import { Loader, Navbar, Footer } from '../../components';
import { CART } from '../../routes/routes';
import { Link } from 'react-router-dom';

export default function Checkout() {
  const {
    cartLoading,
    ordercart: { cartList }
  } = useCartAPICtx();

  return (
    <Fragment>
      <Navbar />
      {!cartList?.length ? (
        <img src='empty.webp' alt='empty' className='image__empty img--md' />
      ) : (
        <div className='mg-full'>
          <h1 className='primary lg sb cen mg-full'>CHECKOUT SUMMARY</h1>
          <hr />
          <hr />
          <div className='card--container'>
            {cartLoading ? (
              <Loader />
            ) : (
              cartList?.map((elem, index) => {
                return <CheckoutCard key={elem._id} {...elem} />;
              })
            )}
          </div>
          <div className='flex-ct-ct mg-full'>
            <Link to={CART} className='btn btn--auth btn--large md sb'>
              Update Cart Items
            </Link>
            <button className='btn btn--auth--solid btn--large md sb'>
              Proceed To Payment
            </button>
          </div>
        </div>
      )}
      <Footer fixed={!cartList?.length} />
    </Fragment>
  );
}
