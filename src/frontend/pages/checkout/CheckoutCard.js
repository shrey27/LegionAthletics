import './checkout.css';
import { Fragment, useEffect, useState } from 'react';

import { useAuthCtx } from '../../context';

export default function CheckoutCard(props) {
  const { source, title, price, qty, discount } = props;
  const { primaryDetails } = useAuthCtx();

  const [priceDetails, setpriceDetails] = useState({
    totalPrice: 0,
    discountOnPrice: 0,
    delivery: 0,
    net: 0
  });
  const { totalPrice, discountOnPrice, delivery, netPrice } = priceDetails;

  useEffect(() => {
    const totalPrice = price * qty;
    const discountOnPrice = totalPrice * (discount / 100);
    const delivery = totalPrice < 10000 ? 500 : 0;
    const netPrice = totalPrice + delivery - discountOnPrice;
    setpriceDetails({
      totalPrice,
      discountOnPrice,
      delivery,
      netPrice
    });
  }, [price, qty, discount]);

  return (
    <Fragment>
      <div className='card card__summary landscape shdw xs-s'>
        <img src={source} alt='Banner' className='summary card__banner' />
        <section className='card__status xs-s'>
          <h1 className='card__status__margin tag lg sb cen'>Order Details</h1>
          <h1 className='card__status__margin primary md sb cen'>{title}</h1>
          <h1 className='card__status__margin md sb cen'>Quantity: {qty}</h1>
          <h1 className='tag sm cen mg-half'>
            <i className='fa-solid fa-arrow-rotate-left'></i>'7 days Return
            Policy'
          </h1>
        </section>

        <section className='card__address sm-s'>
          <h1 className='text--decoration price md sb cen'>
            Delivery Address Details
          </h1>
          <h1 className='primary sm mg-half'>
            <i className='fa-solid fa-user'></i>
            <span>{`${primaryDetails?.firstname} ${primaryDetails?.lastname}`}</span>
          </h1>

          <div className='address__summary'>
            <span className='primary sm sb'>
              <i className='fa-solid fa-location-dot'></i>
            </span>
            <span className='primary sm sb add__align'>
              <span>
                {!primaryDetails.city
                  ? `${primaryDetails?.address}`
                  : `${primaryDetails?.address}, ${primaryDetails?.city}, ${primaryDetails?.stateLoc}, ${primaryDetails?.pincode}`}
              </span>
            </span>
          </div>

          <h1 className='primary sm sb mg-half'>
            <i className='fa-solid fa-mobile-screen-button'></i>
            <span>{primaryDetails?.phone}</span>
          </h1>
          <h1 className='primary sm sb'>
            <i className='fa-solid fa-envelope'></i>
            <span>{primaryDetails?.email}</span>
          </h1>
          <span className='card__status__tag sm cen sb mg-half xs-s'>
            <i class='fa-solid fa-tags'></i> Applied Coupon ATHLETICS200
          </span>
        </section>

        <section className='card__payment sm-s'>
          <h1 className='text--decoration price cen md sb'>Payment Summary</h1>
          <div className='align'>
            <p className='mg-half'>
              <span className='sm sb'>Price</span>
              <span className='sm sb fl-rt'>₹{totalPrice}</span>
            </p>
            <p className='mg-half'>
              <span className='sm sb'>Discount</span>
              <span className='sm sb fl-rt'>₹{discountOnPrice}</span>
            </p>
            <p className='mg-half'>
              <span className='sm sb'>Delivery</span>
              <span className='sm sb fl-rt'>₹{delivery}</span>
            </p>
            <p className='mg-half'>
              <span className='tag sm bl'>Coupon Discount</span>
              <span className='tag sm bl fl-rt'>₹{200}</span>
            </p>
            <p className='mg-half'>
              <span className='md sb'>TOTAL</span>
              <span className='md sb fl-rt'>₹{netPrice}</span>
            </p>
          </div>
        </section>
      </div>
    </Fragment>
  );
}
