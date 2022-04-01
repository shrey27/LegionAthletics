import './checkout.css';
import { Fragment } from 'react';
import CheckoutCard from './CheckoutCard';
import { useCartAPICtx, useAuthCtx } from '../../context';
import { Loader, Navbar, Footer, ToastMessage } from '../../components';
import { CART, ORDER, PROFILEADDRESS } from '../../routes/routes';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/lalogo.jpg';

const loadScript = async (url) => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = url;

    script.onload = () => {
      resolve(true);
      console.log('loaded');
    };

    script.onerror = () => {
      resolve(false);
      console.log('error');
    };

    document.body.appendChild(script);
  });
};

export default function Checkout() {
  const {
    cartLoading,
    ordercart: { remainingAmount, cartList, coupon },
    handleOrderPlaced
  } = useCartAPICtx();

  const { primaryDetails } = useAuthCtx();
  const navigate = useNavigate();

  const displayRazorpay = async () => {
    const res = await loadScript(
      'https://checkout.razorpay.com/v1/checkout.js'
    );

    if (!res) {
      ToastMessage(
        'Razorpay SDK failed to load, check you connection',
        'error'
      );
      return;
    }

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      amount: remainingAmount * 100,
      currency: 'INR',
      name: 'Legion Athletics',
      description: 'Thank you for shopping with us',
      image: `${logo}`,
      handler: function (response) {
        const paymentId = response.razorpay_payment_id;
        if (paymentId) {
          const tempObj = {
            cartList,
            amountPaid: remainingAmount,
            coupon,
            paymentId,
            name: `${primaryDetails?.firstname} ${primaryDetails?.lastname}`,
            phone: primaryDetails?.phone,
            email: primaryDetails?.email,
            deliveryAddress: !primaryDetails.city
              ? `${primaryDetails?.address}`
              : `${primaryDetails?.address}, ${primaryDetails?.city}, ${primaryDetails?.stateLoc}, ${primaryDetails?.pincode}`
          };
          handleOrderPlaced(tempObj);
          navigate(ORDER);
        } else {
          ToastMessage('Payment Failed! Shop Again', 'error');
          navigate(CART);
        }
      },
      prefill: {
        name: `${primaryDetails?.firstname} ${primaryDetails?.lastname}`,
        email: `${primaryDetails?.email}`,
        contact: `${primaryDetails?.phone}`
      },
      notes: {
        address: `${primaryDetails?.address}, ${primaryDetails?.city}, ${primaryDetails?.state}, ${primaryDetails?.pincode}`
      },
      theme: {
        color: '#008190'
      }
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

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
          <div className='flex-ct-ct mg-full'>
            <Link
              to={CART}
              className='card__status__cart sm cen sb mg-half xs-s'
            >
              Update Cart Items
            </Link>
            <Link
              to={PROFILEADDRESS}
              className='card__status__address sm cen sb mg-half xs-s'
            >
              Update Delivery Details
            </Link>
          </div>
          <div className='card--container'>
            {cartLoading ? (
              <Loader />
            ) : (
              cartList?.map((elem, index) => {
                return (
                  <CheckoutCard key={elem._id} {...elem} coupon={coupon} />
                );
              })
            )}
          </div>
        </div>
      )}
      <div className='flex-ct-ct mg-full'>
        <button
          onClick={() => displayRazorpay()}
          className='btn btn--auth--solid btn--large md sb'
        >
          Proceed To Payment
        </button>
      </div>
      <Footer fixed={!cartList?.length} />
    </Fragment>
  );
}
