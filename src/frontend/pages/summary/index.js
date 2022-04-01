import './summary.css';
import { Fragment } from 'react';
import SummaryCard from './SummaryCard';
import { useCartAPICtx } from '../../context';
import { Loader, Navbar, Footer, Deals } from '../../components';
import { homepageItems } from '../../utility/constants';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../../routes/routes';

export default function Orders() {
  const {
    cartLoading,
    orders: { cartList }
  } = useCartAPICtx();

  return (
    <Fragment>
      <Navbar />
      {!cartList?.length ? (
        <img src='empty.webp' alt='empty' className='image__empty img--md' />
      ) : (
        <div className='mg-full'>
          <h1 className='primary lg sb cen mg-full'>ORDER SUMMARY</h1>
          <hr />
          <hr />
          <div className='card--container'>
            {cartLoading ? (
              <Loader />
            ) : (
              cartList?.map((elem, index) => {
                return <SummaryCard key={elem._id} {...elem} />;
              })
            )}
          </div>
        </div>
      )}
      <Deals
        items={[...homepageItems].slice(-4)}
        name='Best-Sellers'
        noButton={true}
      />
      <div className='flex-ct-ct xs-s'>
        <Link className='btn btn--error btn--lg sb cen' to={PRODUCTS}>
          View All
        </Link>
      </div>
      <Footer />
    </Fragment>
  );
}
