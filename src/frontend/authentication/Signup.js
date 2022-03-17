import './authentication.css';
import Navbar from '../common/navbar';
import Footer from '../common/footer';
import { useAuthCtx } from '../context/authenticationContext';
import { Link } from 'react-router-dom';
import { SIGNIN } from '../../routes';

export default function Signup() {
  const { email, password, dispatch, signupError, handleSignUp } = useAuthCtx();

  const onSignUpHandler = (e) => {
    e.preventDefault();
    handleSignUp();
  };

  return (
    <>
      <Navbar noDrawer={true} />
      {signupError && <h1 className='tag cen md sb'>{signupError}</h1>}
      <div className='card authentication shdw'>
        <h1 className='lg sb cen xs-s mg-full'>SIGN UP</h1>
        <hr />
        <form action='#' className='sm-s'>
          <div className='authentication__input'>
            <label htmlFor='email__signup' className='label'>
              Enter Your Email ID
            </label>
            <input
              className='input sm-s'
              type='email'
              name='email__signup'
              id='email__signup'
              placeholder='Enter Email'
              autoComplete='off'
              value={email}
              onChange={(e) =>
                dispatch({ type: 'SIGNIN-EMAIL', payload: e.target.value })
              }
              required
            />
            {!email && (
              <h1 className='input__error'>Enter a valid email address</h1>
            )}
          </div>
          <div className='authentication__input'>
            <label htmlFor='password__signup' className='label'>
              Enter Password
            </label>
            <input
              className='input sm-s'
              type='password'
              name='password__signup'
              id='password__signup'
              autoComplete='off'
              placeholder='Enter Password'
              value={password}
              onChange={(e) =>
                dispatch({ type: 'SIGNIN-PASSWORD', payload: e.target.value })
              }
              required
            />
            {!password && (
              <h1 className='input__error'>Enter a valid password</h1>
            )}
          </div>
          <div className='authentication__input'>
            <label htmlFor='cnf__password__signup' className='label'>
              Confirm Password
            </label>
            <input
              className='input sm-s'
              type='password'
              name='cnf__password__signup'
              id='cnf__password__signup'
              autoComplete='off'
              placeholder='Re-enter Password'
              required
            />
            {!email && (
              <h1 className='input__error'>Enter a valid email address</h1>
            )}
          </div>
          <div className='flex-ct-st signin__remember'>
            <input
              className='sm-s'
              type='checkbox'
              name='remember__signup'
              id='remember__signup'
            />
            <label htmlFor='remember__signup' className='label'>
              Remember me
            </label>
          </div>
          <button
            type='submit'
            className='btn btn--wide btn--auth--solid sb'
            onClick={onSignUpHandler}
          >
            SIGN UP
          </button>
        </form>
        <div className='signin__links'>
          <Link to={SIGNIN} className='already sm'>
            Already have an account?
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
