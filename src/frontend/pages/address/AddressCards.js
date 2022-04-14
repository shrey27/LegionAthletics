import { Fragment, useState } from 'react';
import AddressForm from './AddressForm';
import './address.css';
import { useAddressApiCtx, useAddressCtx, useAuthCtx } from '../../context';
import { Loader, AddressModal } from '../../components';

export default function AddressCards() {
  const [addressModal, setAddressmodal] = useState(false);
  const [addressObject, setAddressObject] = useState({});
  const { addressList, addressLoader, deleteAddress } = useAddressApiCtx();
  const { setSlide, slide } = useAddressCtx();
  const { handleSetPrimaryAddress } = useAuthCtx();

  const handleEditAddress = (address) => {
    setAddressmodal(true);
    setAddressObject(address);
  };

  return (
    <Fragment>
      {addressModal && (
        <AddressModal
          setAddressmodal={setAddressmodal}
          addressObject={addressObject}
        />
      )}
      <h1 className='primary lg cen sb'>SET PRIMARY DELIVERY ADDRESS</h1>
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
          {!slide && (
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
                  stateLoc,
                  pincode,
                  type
                } = elem;
                return (
                  <div className='addressbar shdw' key={_id}>
                    <div className='addressbar__border'>
                      <span>
                        <i className='fa-solid fa-location-dot'></i> {type}
                      </span>
                      <div className='flex-ct-ct'>
                        <span
                          className='addressbar__btn'
                          onClick={handleEditAddress.bind(this, elem)}
                        >
                          Edit
                        </span>
                        <span
                          className='addressbar__btn__primary'
                          onClick={handleSetPrimaryAddress.bind(this, elem)}
                        >
                          Select
                        </span>
                        <span
                          className='addressbar__btn'
                          onClick={() => deleteAddress(_id)}
                        >
                          Delete
                        </span>
                      </div>
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
                      {`${address}, ${city}, ${stateLoc}, ${pincode}`}
                    </h1>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
}
