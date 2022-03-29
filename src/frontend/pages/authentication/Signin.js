import './authentication.css';
import { useState } from 'react';
import { Navbar, Footer } from '../../components';
import { useAuthCtx } from '../../context';
import { Link } from 'react-router-dom';
import { SIGNUP } from '../../routes/routes';
import { guestCredentials } from '../../utility/constants';

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    email,
    password,
    emailError,
    passwordError,
    signinRememberMe,
    dispatch,
    handleSignIn
  } = useAuthCtx();

  const onSignInHandler = (e) => {
    e.preventDefault();
    handleSignIn();
  };

  const guestSignIn = (e) => {
    e.preventDefault();
    dispatch({ type: 'SIGNIN-EMAIL', payload: guestCredentials.email });
    dispatch({ type: 'SIGNIN-PASSWORD', payload: guestCredentials.password });
  };

  return (
    <>
      <Navbar noDrawer={true} />
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
          <button
            type='submit'
            className='btn btn--wide btn--auth sb'
            onClick={guestSignIn}
          >
            Sign In as Guest
          </button>
        </form>
        <div className='signin__links'>
          <Link to={SIGNUP} className='forgot sm'>
            Create an Account.
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
