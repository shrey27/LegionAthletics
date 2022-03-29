import './cart.css';
import { Fragment, useEffect, useState } from 'react';
import { Navbar, Footer, Loader } from '../../components';
import Category from '../../components/header/Category';
import CartItem from './CartItem';
import { useCartAPICtx } from '../../context';
import { ORDER } from '../../routes/routes';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { cartLoading, cartListData, cartError, dispatch } = useCartAPICtx();
  const navigate = useNavigate();
  const [cartPrice, setCartPrice] = useState({
    total: 0,
    discount: 0,
    net: 0,
    delivery: 0
  });

  useEffect(() => {
    const calculateTotal = () => {
      const total = cartListData.reduce((acc, curr) => {
        return acc + curr.price * curr.qty;
      }, 0);
      const discount = cartListData.reduce((acc, curr) => {
        return acc + (curr.qty * curr.price * curr.discount) / 100;
      }, 0);
      const delivery = total - discount > 10000 ? 0 : 500;
      const net = total - discount + delivery;
      return { total, discount, net, delivery };
    };
    const cartPriceObject = calculateTotal();

    setCartPrice(cartPriceObject);
  }, [cartListData]);

  const proceedFunction = () => {
    const cartArray = cartListData.map((elem) => {
      const productTotal = elem.price * elem.qty;
      const discountOnProduct = productTotal * (elem.discount / 100);
      const delivery = productTotal > 10000 ? 0 : 500;
      return { ...elem, productTotal, discountOnProduct, delivery };
    });
    dispatch({
      type: 'UPDATE_CART_LIST',
      payload: { remainingAmount: cartPrice.net, cartList: [...cartArray] }
    });
    dispatch({ type: 'API_RESPONSE', payload: [] });
    dispatch({ type: 'UPDATE_CART_PID', payload: [] });
    navigate(ORDER);
  };

  return (
    <>
      <Navbar />
      <Category />
      {cartLoading ? (
        <Loader />
      ) : (
        <Fragment>
          {cartError ? (
            <h1 className='tag md cen sb mg-full'>{cartError}</h1>
          ) : cartListData.length === 0 ? (
            <img
              src='empty.webp'
              alt='empty'
              className='image__empty img--md'
            />
          ) : (
            <div className='cart sm-s'>
              <div className='cart__container'>
                {cartListData &&
                  cartListData.map((elem, index) => {
                    return <CartItem key={index * 2} {...elem} />;
                  })}
              </div>
              <div className='cart__box shdw md-s'>
                <h1 className='md sb'>CART ITEMS</h1>
                <hr />
                <p className='mg-half'>
                  <span className='sm sb'>Price</span>
                  <span className='sm sb fl-rt'>₹{cartPrice.total}</span>
                </p>
                <p className='mg-half'>
                  <span className='sm sb'>Discount</span>
                  <span className='sm sb fl-rt'>₹{cartPrice.discount}</span>
                </p>
                <p className='mg-half'>
                  <span className='sm sb'>Delivery</span>
                  <span className='sm sb fl-rt'>₹{cartPrice.delivery}</span>
                </p>
                <hr />
                <p className='mg-half'>
                  <span className='sm sb'>TOTAL</span>
                  <span className='sm sb fl-rt'>₹{cartPrice.net}</span>
                </p>
                <hr />
                <button
                  className='btn btn--wide btn--dark mg-half bd'
                  onClick={proceedFunction}
                >
                  Proceed To Checkout
                </button>
              </div>
            </div>
          )}
        </Fragment>
      )}
      <Footer fixed={!cartListData.length} />
    </>
  );
}
