import { Fragment, useState } from 'react';
import AddressForm from './AddressForm';
import './address.css';
import { useAddressApiCtx } from '../../context';
import { Loader } from '../../components';

export default function Address() {
  const [slide, setSlide] = useState(false);
  const {
    state: { addressList, addressLoader },
    deleteAddress
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
                <i className='fa-solid fa-plus'></i> Add new Address
              </h1>
            )}
            <div className={`addressform ${slide && 'slide'}`}>
              <AddressForm setSlide={setSlide} />
            </div>
          </div>
          <div className='card address'>
            {addressList.map((elem) => {
              const {
                _id,
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
                <div className='addressbar shdw' key={_id}>
                  <div className='addressbar__border'>
                    <span>
                      <i className='fa-solid fa-location-dot'></i> {type}
                    </span>
                    <span
                      className='addressbar__btn'
                      onClick={() => deleteAddress(_id)}
                    >
                      Delete
                    </span>
                  </div>
                  <h1 className='addressbar__name'>
                    <i className='fa-solid fa-user'></i>
                    <span>{`${firstname} ${lastname}`}</span>&nbsp;&nbsp;
                    <span>{`${phone}`}</span>
                  </h1>
                  <h1 className='addressbar__email'>
                    <i className='fa-solid fa-envelope'></i>
                    {`${email}`}
                  </h1>
                  <h1 className='addressbar__address'>
                    <i className='fa-solid fa-location-dot'></i>
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
