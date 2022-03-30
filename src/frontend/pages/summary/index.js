import './summary.css';
import { Fragment } from 'react';
import SummaryCard from './SummaryCard';
import { useCartAPICtx } from '../../context';
import { Loader, Navbar, Footer } from '../../components';

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

      <Footer fixed={!cartList?.length} />
    </Fragment>
  );
}
