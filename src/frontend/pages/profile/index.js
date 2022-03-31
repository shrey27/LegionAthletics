import { Fragment, useState } from 'react';
import './profile.css';
import { Navbar, Footer } from '../../components';
import ProfileForm from './ProfileForm';
import Address from '../address';
import { Link } from 'react-router-dom';
import { CART, ORDER, WISHLIST } from '../../routes/routes';
import { useAuthCtx } from '../../context';

export default function Profile() {
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [component, setComponent] = useState(<ProfileForm />);
  const { handleSignOut } = useAuthCtx();

  const handleMainContent = (component) => {
    switch (component) {
      case 'ADDRESS':
        setComponent(<Address />);
        break;
      default:
        setComponent(<ProfileForm />);
        break;
    }
    setOptionsOpen(false);
  };

  return (
    <Fragment>
      <Navbar />
      <div className='card profile__container shdw'>
        <div className='hb--box'>
          {/* header */}
          <header className='hb--header'>
            <nav className='navbar'>
              <section className='end xs-s'>
                <span
                  className='slider btn hb--btn'
                  onClick={() => setOptionsOpen((e) => !e)}
                >
                  Account&nbsp;<i className='fas fa-chevron-down'></i>
                </span>
              </section>
            </nav>
          </header>

          {/* aside container */}
          <aside
            className={`hb--aside sm-s shadow ${optionsOpen ? 'hb--open' : ''}`}
          >
            <div className='mg-full'>
              <h1 className='primary sm reg aside__title'>MY ACCOUNT</h1>
              <ul className='stack'>
                <li
                  className='stack__item primary sm'
                  onClick={handleMainContent.bind(this, 'PROFILE')}
                >
                  Profile Settings <i className='fa-solid fa-chevron-right'></i>
                </li>
                <li
                  className='stack__item primary sm'
                  onClick={handleMainContent.bind(this, 'ADDRESS')}
                >
                  Manage Address <i className='fa-solid fa-chevron-right'></i>
                </li>
              </ul>
            </div>
            <div className='mg-full'>
              <h1 className='primary sm reg aside__title'>MY STUFF</h1>
              <ul className='stack'>
                <Link to={CART}>
                  <li className='stack__item primary sm'>
                    My Cart <i className='fa-solid fa-chevron-right'></i>
                  </li>
                </Link>
                <Link to={ORDER}>
                  <li className='stack__item primary sm'>
                    My Orders <i className='fa-solid fa-chevron-right'></i>
                  </li>
                </Link>
                <Link to={WISHLIST}>
                  <li className='stack__item primary sm'>
                    My Wishlist <i className='fa-solid fa-chevron-right'></i>
                  </li>
                </Link>
              </ul>
            </div>
            <button className='btn btn--auth--solid btn--wide' onClick={handleSignOut}>
              Logout
            </button>
          </aside>

          {/* main container */}
          <main className='hb--main hb--open'>{component}</main>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </Fragment>
  );
}
