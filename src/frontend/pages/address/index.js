import { Fragment, useState } from 'react';
import AddressForm from './AddressForm';
import './address.css';
import { useAddressApiCtx } from '../../context';
import { Loader } from '../../components';

export default function Address() {
  const [slide, setSlide] = useState(false);
  const {
    state: { addressList, addressLoader }
  } = useAddressApiCtx();

  return (
    <Fragment>
      {addressLoader ? (
        <Loader />
      ) : (
        <div>
          <div
            className={`card address addressformCtr ${slide && 'slide'}`}
            onClick={() => setSlide(true)}
          >
            {!slide && (
              <h1>
                <i class='fa-solid fa-plus'></i> Add new Address
              </h1>
            )}
            <div className={`addressform ${slide && 'slide'}`}>
              <AddressForm setSlide={setSlide} />
            </div>
          </div>
          <div className='card address'>
            {addressList.map((elem) => {
              const {
                firstname,
                lastname,
                phone,
                email,
                address,
                city,
                state,
                pincode,
                type
              } = elem;
              return (
                <div className='addressbar shdw'>
                  <div className='addressbar__border'>
                    <span>
                      <i class='fa-solid fa-location-dot'></i> {type}
                    </span>
                    <span className='addressbar__btn'>Delete</span>
                  </div>
                  <h1 className='addressbar__name'>
                    <i class='fa-solid fa-user'></i>
                    <span>{`${firstname} ${lastname}`}</span>&nbsp;&nbsp;
                    <span>{`${phone}`}</span>
                  </h1>
                  <h1 className='addressbar__email'>
                    <i class='fa-solid fa-envelope'></i>
                    {`${email}`}
                  </h1>
                  <h1 className='addressbar__address'>
                    <i class='fa-solid fa-location-dot'></i>
                    {`${address}, ${city}, ${state}, ${pincode}`}
                  </h1>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Fragment>
  );
}
