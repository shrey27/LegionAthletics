import './authentication.css';
import { useState } from 'react';
import Navbar from '../common/navbar';
import Footer from '../common/footer';
import { useAuthCtx } from '../context/authenticationContext';
import { Link } from 'react-router-dom';
import { SIGNUP } from '../../routes';

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    email,
    password,
    emailError,
    passwordError,
    signinError,
    signinRememberMe,
    dispatch,
    handleSignIn
  } = useAuthCtx();

  const onSignInHandler = (e) => {
    e.preventDefault();
    handleSignIn();
  };

  return (
    <>
      <Navbar noDrawer={true} />
      {<h1 className='tag cen md sb mg-full'>{signinError}</h1>}
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
              onFocus={() => dispatch({ type: 'CLEAR-ALL-ERRORS' })}
              required
            />
            <h1 className='input__error'>{emailError}</h1>
          </div>
          <div className='authentication__input'>
            <label htmlFor='password__signin' className='label'>
              Enter Password
            </label>
            <div className='input__container'>
              <input
                className='input input__password sm-s'
                type={showPassword ? 'text' : 'password'}
                name='password__signin'
                id='password__signin'
                autoComplete='off'
                placeholder='Password'
                value={password}
                onChange={(e) =>
                  dispatch({ type: 'SIGNIN-PASSWORD', payload: e.target.value })
                }
                onBlur={() => dispatch({ type: 'CLEAR-ALL-ERRORS' })}
                required
              />
              <i
                className='fa-solid fa-eye input__eye'
                onClick={() => setShowPassword((e) => !e)}
              ></i>
            </div>

            <h1 className='input__error'>{passwordError}</h1>
          </div>
          <div className='flex-ct-st signin__remember'>
            <input
              className='sm-s'
              type='checkbox'
              name='remember__signin'
              id='remember__signin'
              checked={signinRememberMe}
              onChange={(e) => dispatch({ type: 'SIGNIN-REMEMBER-ME' })}
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
