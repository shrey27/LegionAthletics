import './checkout.css';
import { Fragment, useEffect, useState } from 'react';
import { useLocalStorage } from '../../helpers';
import { PROFILE } from '../../routes/routes';
import { Link } from 'react-router-dom';

export default function CheckoutCard(props) {
  const { source, title, price, qty, discount } = props;

  const [priceDetails, setpriceDetails] = useState({
    totalPrice: 0,
    discountOnPrice: 0,
    delivery: 0,
    net: 0
  });
  const { totalPrice, discountOnPrice, delivery, netPrice } = priceDetails;

  const { storedName, storedSurname, storedEmail, storedAddress, storedPhone } =
    useLocalStorage();
  
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
            <span>{`${storedName} ${storedSurname}`}</span>
          </h1>

          <div className='address__summary'>
            <span className='primary sm sb'>
              <i className='fa-solid fa-location-dot'></i>
            </span>
            <span className='primary sm sb add__align'>
              <span>{storedAddress}</span>
            </span>
          </div>

          <h1 className='primary sm sb mg-half'>
            <i className='fa-solid fa-mobile-screen-button'></i>
            <span>{storedPhone}</span>
          </h1>
          <h1 className='primary sm sb'>
            <i className='fa-solid fa-envelope'></i>
            <span>{storedEmail}</span>
          </h1>

          <Link
            to={PROFILE}
            className='card__status__mode sm cen sb mg-half xs-s'
          >
            Update Delivery Details
          </Link>
        </section>

        <section className='card__payment'>
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
              <span className='md sb'>TOTAL</span>
              <span className='md sb fl-rt'>₹{netPrice}</span>
            </p>
          </div>
        </section>
      </div>
    </Fragment>
  );
}
