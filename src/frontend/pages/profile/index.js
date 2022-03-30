import { Fragment } from 'react';
import { Footer, Navbar } from '../../components';
import { useAuthCtx } from '../../context';
import './profile.css';

export default function Profile() {
  const {
    firstName,
    lastName,
    phone,
    email,
    signUpEmail,
    address,
    addressError,
    phoneError,
    firstNameError,
    lastNameError,
    dispatch,
    handleProfileUpdate,
    profileUpdateCancelled,
    disable,
    setDisable
  } = useAuthCtx();

  return (
    <Fragment>
      <Navbar />
      <div className='card profile shdw'>
        <h1 className='lg sb cen xs-s mg-full'>MY PROFILE</h1>
        <hr />
        <form className='sm-s' onSubmit={handleProfileUpdate}>
          <div className='profile_input'>
            <label htmlFor='firstname' className='label'>
              First Name
            </label>
            <input
              className='input sm-s'
              type='text'
              name='firstname'
              id='firstname'
              autoComplete='off'
              value={firstName}
              disabled={disable}
              onChange={(e) =>
                dispatch({ type: 'SIGNUP-FIRSTNAME', payload: e.target.value })
              }
              onFocus={() => dispatch({ type: 'CLEAR-ALL-ERRORS' })}
              required
            />
            {firstNameError && (
              <h1 className='input__error'>{firstNameError}</h1>
            )}
          </div>
          <div className='profile_input'>
            <label htmlFor='lastname' className='label'>
              Last Name
            </label>
            <input
              className='input sm-s'
              type='text'
              name='lastname'
              id='lastname'
              autoComplete='off'
              value={lastName}
              disabled={disable}
              onChange={(e) =>
                dispatch({ type: 'SIGNUP-LASTNAME', payload: e.target.value })
              }
              onFocus={() => dispatch({ type: 'CLEAR-ALL-ERRORS' })}
              required
            />
            {lastNameError && <h1 className='input__error'>{lastNameError}</h1>}
          </div>
          <div className='profile_input'>
            <label htmlFor='profile__email' className='label'>
              Email
            </label>
            <input
              className='input sm-s'
              type='text'
              name='profile__email'
              id='profile__email'
              autoComplete='off'
              value={signUpEmail.length ? signUpEmail : email}
              disabled
            />
          </div>
          <div className='profile_input'>
            <label htmlFor='profile__phone' className='label'>
              Phone
            </label>
            <input
              className='input sm-s'
              type='text'
              name='profile__phone'
              id='profile__phone'
              autoComplete='off'
              value={phone}
              disabled={disable}
              onChange={(e) =>
                dispatch({ type: 'SIGNUP-PHONE', payload: e.target.value })
              }
              onFocus={() => dispatch({ type: 'CLEAR-ALL-ERRORS' })}
              required
            />
            {phoneError && <h1 className='input__error'>{phoneError}</h1>}
          </div>
          <div className='profile_input'>
            <label htmlFor='profile__address' className='label'>
              Delivery Address
            </label>
            <textarea
              className='textarea sm-s'
              type='text'
              name='profile__address'
              id='profile__address'
              autoComplete='off'
              value={address}
              disabled={disable}
              onChange={(e) =>
                dispatch({ type: 'SIGNUP-ADDRESS', payload: e.target.value })
              }
              onFocus={() => dispatch({ type: 'CLEAR-ALL-ERRORS' })}
              required
            ></textarea>
            <h1 className='input__error'>{addressError}</h1>
          </div>
          {disable && (
            <button
              className='btn btn--auth--solid sb'
              onClick={() => setDisable(false)}
            >
              UPDATE
            </button>
          )}
          {!disable && (
            <button type='submit' className='btn btn--auth--solid sb'>
              SUBMIT
            </button>
          )}
          {!disable && (
            <button
              className='btn btn--error--solid sb'
              onClick={profileUpdateCancelled}
            >
              CANCEL
            </button>
          )}
        </form>
      </div>
      <Footer />
    </Fragment>
  );
}
