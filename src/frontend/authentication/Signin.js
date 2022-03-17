import './authentication.css';
import { useEffect } from 'react';
import Navbar from '../common/navbar';
import Footer from '../common/footer';
import { useAuthCtx } from '../context/authenticationContext';
import { Link } from 'react-router-dom';
import { HOMEPAGE, SIGNUP } from '../../routes';
import { useNavigate } from 'react-router-dom';

export default function Signin() {
  const { email, password, signinError, dispatch, handleSignIn } = useAuthCtx();
  const navigate = useNavigate();

  const onSignInHandler = (e) => {
    e.preventDefault();
    handleSignIn();
  };

  return (
    <>
      <Navbar noDrawer={true} />
      {signinError && <h1 className='tag cen md sb'>{signinError}</h1>}
      <div className='card authentication shdw'>
        <h1 className='lg sb cen xs-s mg-full'>SIGNIN</h1>
        <hr />
        <form action='#' className='sm-s'>
          <div className='authentication__input'>
            <label htmlFor='email__signin' className='label'>
              Enter Your Email ID
            </label>
            <input
              className='input sm-s'
              type='email'
              name='email__signin'
              id='email__signin'
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
            <label htmlFor='password__signin' className='label'>
              Enter Password
            </label>
            <input
              className='input sm-s'
              type='password'
              name='password__signin'
              id='password__signin'
              autoComplete='off'
              placeholder='Password'
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
          <div className='flex-ct-st signin__remember'>
            <input
              className='sm-s'
              type='checkbox'
              name='remember__signin'
              id='remember__signin'
            />
            <label htmlFor='remember__signin' className='label'>
              Remember me
            </label>
          </div>
          <button
            type='submit'
            className='btn btn--wide btn--auth--solid sb'
            onClick={onSignInHandler}
          >
            SIGNIN
          </button>
        </form>
        <div className='signin__links'>
          <a className='forgot sm'>Forgot Password?</a>
          <Link to={SIGNUP} className='forgot sm fl-rt'>
            Sign Up
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
