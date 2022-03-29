import axios from 'axios';
import { Fragment, useState } from 'react';
import { Footer, Navbar } from '../../components';
import { useAuthCtx } from '../../context';
import './profile.css';

export default function Profile() {
  const [disable, setDisable] = useState(false);
  const {
    firstName,
    lastName,
    phone,
    email,
    address,
    token,
    addressError,
    phoneError,
    firstNameError,
    lastNameError,
    dispatch
  } = useAuthCtx();

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const userDetails = await axios.post(
        '/api/auth/update',
        {
          username: `${firstName} ${lastName}`,
          phone,
          email,
          address
        },
        {
          headers: {
            authorization: token
          }
        }
      );
      console.log(userDetails);
    } catch (err) {
      console.log('profile details error', err);
    }
  };

  const handleDisable = () => {
    if (disable) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  };

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
              value={email}
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
              Address
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
          {/* <button
            type={disable ? '' : 'submit'}
            className='btn btn--auth--solid sb'
            onClick={handleDisable}
          >
            {disable ? 'UPDATE' : 'EDIT DETAILS'}
          </button> */}
          <button type='submit' className='btn btn--auth--solid sb'>
            SUBMIT
          </button>
          {!disable && (
            <button
              type='submit'
              className='btn btn--auth--error sb'
              onClick={handleDisable}
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
