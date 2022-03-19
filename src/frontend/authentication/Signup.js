import './authentication.css';
import { useState } from 'react';
import Navbar from '../common/navbar';
import Footer from '../common/footer';
import { useAuthCtx } from '../context/authenticationContext';
import { Link } from 'react-router-dom';
import { SIGNIN } from '../../routes';
import { testCredentials } from '../common/constants';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showCnfPassword, setShowCnfPassword] = useState(false);

  const {
    email,
    password,
    username,
    cnfPassword,
    rememberMe,
    dispatch,
    signupError,
    handleSignUp,
    emailError,
    passwordError,
    cnfpasswordError,
    userNameError
  } = useAuthCtx();

  const onSignUpHandler = (e) => {
    e.preventDefault();
    handleSignUp();
  };

  const onUsingTestCredentials = (e) => {
    e.preventDefault();
    dispatch({ type: 'SIGNUP-USERNAME', payload: testCredentials.username });
    dispatch({ type: 'SIGNIN-EMAIL', payload: testCredentials.email });
    dispatch({ type: 'SIGNIN-PASSWORD', payload: testCredentials.password });
    dispatch({
      type: 'CONFIRM-PASSWORD',
      payload: testCredentials.confirmpassword
    });
  };

  return (
    <>
      <Navbar noDrawer={true} />
      {<h1 className='tag cen md sb mg-full'>{signupError}</h1>}
      <div className='card authentication shdw'>
        <h1 className='lg sb cen xs-s mg-full'>SIGN UP</h1>
        <hr />
        <form action='#' className='sm-s'>
          <div className='authentication__input'>
            <label htmlFor='name__signup' className='label'>
              Enter Your Name
            </label>
            <input
              className='input sm-s'
              type='text'
              name='name__signup'
              id='name__signup'
              placeholder='Enter your Name'
              autoComplete='off'
              aria-autocomplete='off'
              value={username}
              onChange={(e) =>
                dispatch({ type: 'SIGNUP-USERNAME', payload: e.target.value })
              }
              onFocus={() => dispatch({ type: 'CLEAR-ALL-ERRORS' })}
              required
            />
            <h1 className='input__error'>{userNameError}</h1>
          </div>
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
              aria-autocomplete='off'
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
            <label htmlFor='password__signup' className='label'>
              Enter Password
            </label>
            <div className='input__container'>
              <input
                className='input input__password sm-s'
                type={showPassword ? 'text' : 'password'}
                name='password__signup'
                id='password__signup'
                autoComplete='off'
                placeholder='Enter Password'
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

          <div className='authentication__input'>
            <label htmlFor='cnf__password__signup' className='label'>
              Confirm Password
            </label>
            <div className='input__container'>
              <input
                className='input input__password sm-s'
                type={showCnfPassword ? 'text' : 'password'}
                name='cnf__password__signup'
                id='cnf__password__signup'
                autoComplete='off'
                placeholder='Re-enter Password'
                value={cnfPassword}
                onChange={(e) =>
                  dispatch({
                    type: 'CONFIRM-PASSWORD',
                    payload: e.target.value
                  })
                }
                onBlur={() => dispatch({ type: 'CLEAR-ALL-ERRORS' })}
                required
              />
              <i
                className='fa-solid fa-eye input__eye'
                onClick={() => setShowCnfPassword((e) => !e)}
              ></i>
            </div>
            <h1 className='input__error'>{cnfpasswordError}</h1>
          </div>
          <div className='flex-ct-st signin__remember'>
            <input
              className='sm-s'
              type='checkbox'
              name='remember__signup'
              id='remember__signup'
              checked={rememberMe}
              onChange={(e) => dispatch({ type: 'REMEMBER-ME' })}
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
          <button
            className='btn btn--wide btn--auth sb'
            onClick={onUsingTestCredentials}
          >
            TEST-CREDENTIALS
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
