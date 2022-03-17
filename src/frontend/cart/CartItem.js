import './cart.css';
import { useCartCtx } from '../context/cartContext';
import { useWishlistCtx } from '../context/wishlistContext';
import { useCartAPICtx } from '../context/cartContext';

export default function CartItem(props) {
  const { pid, source, title, price, mrp, discount, qty } = props;
  const { incQty, decQty } = useCartCtx();
  const { addToWishlist } = useWishlistCtx();
  const { deleteFromCart } = useCartAPICtx();

  const handleMoveToWishlist = () => {
    addToWishlist(pid, { ...props });
    deleteFromCart(pid);
  };

  return (
    <div className='cart__landscape shdw'>
      <img src={source} alt='Banner' className='card__banner' />
      <section className='cart__content'>
        <h1 className='cart__align primary lg sb'>{title}</h1>
        <p className='cart__align'>
          <span className='tag sm sb price--pmy'>₹{price}</span>
          <span className='primary sm xs-s sb price--sec'>₹{mrp}</span>
          <span className='sm sb price--ter'>{discount}% off</span>
        </p>
        <h1 className='cart__align'>
          {qty === 1 ? (
            <i
              className='fa-regular fa-trash-can btn qty--btn'
              name='del'
              onClick={decQty.bind(this, pid, qty)}
            ></i>
          ) : (
            <i
              className='fas fa-minus btn qty--btn'
              name='dec'
              onClick={decQty.bind(this, pid, qty)}
            ></i>
          )}
          <span className='quantity'>{qty}</span>
          <i
            className='fas fa-plus btn qty--btn'
            name='inc'
            onClick={incQty.bind(this, pid)}
          ></i>
        </h1>
        <div className='btn--shift'>
          <button className='btn btn--auth' onClick={handleMoveToWishlist}>
            Move to Wishlist
          </button>
        </div>
      </section>
    </div>
  );
}
