import { useState, useEffect } from 'react';
import '../../pages/address/address.css';
import { useAddressApiCtx } from '../../context/addressContext';
import { addressError } from '../../utility/constants';

export default function ModalAddressForm({ addressObject, setAddressmodal }) {
  const { editAddress } = useAddressApiCtx();
  const [editForm, setEditForm] = useState({
    _id: '',
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    addressField: '',
    city: '',
    stateLoc: '',
    pincode: '',
    errorFields: []
  });

  useEffect(() => {
    setEditForm((e) => ({
      ...e,
      ...addressObject,
      addressField: addressObject.address,
      stateLoc: addressObject.stateLoc
    }));
  }, [addressObject]);

  const { errorFields } = editForm;

  const handleAddressEditSubmit = (e) => {
    e.preventDefault();
    let errors = [];
    for (const key of Object.keys(editForm)) {
      if (!editForm[key]) {
        errors.push(key);
      }
    }
    if (errors.length) {
      setEditForm({ ...editForm, errorFields: [...errors] });
    } else {
      editAddress(editForm._id, editForm);
      setEditForm({ ...editForm, errorFields: [] });
      setAddressmodal(false);
    }
  };

  const handleAddressEditFormCancel = () => {
    setAddressmodal(false);
    setEditForm({ ...editForm, errorFields: [] });
  };

  return (
    <div className='card addressform shdw'>
      <h1 className='lg sb cen xs-s mg-full'>ADD NEW ADDRESS</h1>
      <hr />
      <form
        className='address__form sm-s'
        onSubmit={handleAddressEditSubmit}
        onReset={handleAddressEditFormCancel}
      >
        <div className='address_input_one'>
          <label htmlFor='firstname' className='label'>
            First Name
          </label>
          <input
            className='input sm-s'
            type='text'
            name='firstname'
            id='firstname'
            autoComplete='off'
            value={editForm?.firstname}
            onChange={(e) =>
              setEditForm({ ...editForm, firstname: e.target.value })
            }
            onFocus={() => setEditForm({ ...editForm, errorFields: [] })}
          />
          {errorFields?.includes('firstname') && (
            <h1 className='input__error'>{addressError}</h1>
          )}
        </div>
        <div className='address_input_two'>
          <label htmlFor='lastname' className='label'>
            Last Name
          </label>
          <input
            className='input sm-s'
            type='text'
            name='lastname'
            id='lastname'
            autoComplete='off'
            value={editForm?.lastname}
            onChange={(e) =>
              setEditForm({ ...editForm, lastname: e.target.value })
            }
            onFocus={() => setEditForm({ ...editForm, errorFields: [] })}
          />
          {errorFields?.includes('lastname') && (
            <h1 className='input__error'>{addressError}</h1>
          )}
        </div>
        <div className='address_input_three'>
          <label htmlFor='addr__email' className='label'>
            Email
          </label>
          <input
            className='input sm-s'
            type='text'
            name='addr__email'
            id='addr__email'
            autoComplete='off'
            value={editForm?.email}
            onChange={(e) =>
              setEditForm({ ...editForm, email: e.target.value })
            }
            onFocus={() => setEditForm({ ...editForm, errorFields: [] })}
          />
          {errorFields?.includes('email') && (
            <h1 className='input__error'>{addressError}</h1>
          )}
        </div>
        <div className='address_input_four'>
          <label htmlFor='addr__phone' className='label'>
            Phone
          </label>
          <input
            className='input sm-s'
            type='text'
            name='addr__phone'
            id='addr__phone'
            autoComplete='off'
            value={editForm?.phone}
            onChange={(e) =>
              setEditForm({ ...editForm, phone: e.target.value })
            }
            onFocus={() => setEditForm({ ...editForm, errorFields: [] })}
          />
          {errorFields?.includes('phone') && (
            <h1 className='input__error'>{addressError}</h1>
          )}
        </div>
        <div className='address_input_five'>
          <label htmlFor='addr' className='label'>
            Address
          </label>
          <input
            className='input sm-s'
            type='text'
            name='addr'
            id='addr'
            autoComplete='off'
            value={editForm?.addressField}
            onChange={(e) =>
              setEditForm({ ...editForm, addressField: e.target.value })
            }
            onFocus={() => setEditForm({ ...editForm, errorFields: [] })}
          />
          {errorFields?.includes('addressField') && (
            <h1 className='input__error'>{addressError}</h1>
          )}
        </div>
        <div className='address_input_six'>
          <label htmlFor='addr__city' className='label'>
            City
          </label>
          <input
            className='input sm-s'
            type='text'
            name='addr__city'
            id='addr__city'
            autoComplete='off'
            value={editForm?.city}
            onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
            onFocus={() => setEditForm({ ...editForm, errorFields: [] })}
          />
          {errorFields?.includes('city') && (
            <h1 className='input__error'>{addressError}</h1>
          )}
        </div>
        <div className='address_input_seven'>
          <label htmlFor='addr__state' className='label'>
            State
          </label>
          <input
            className='input sm-s'
            type='text'
            name='addr__state'
            id='addr__state'
            autoComplete='off'
            value={editForm?.stateLoc}
            onChange={(e) =>
              setEditForm({ ...editForm, stateLoc: e.target.value })
            }
            onFocus={() => setEditForm({ ...editForm, errorFields: [] })}
          />
          {errorFields?.includes('stateLoc') && (
            <h1 className='input__error'>{addressError}</h1>
          )}
        </div>
        <div className='address_input_eight'>
          <label htmlFor='addr__pincode' className='label'>
            PINCODE
          </label>
          <input
            className='input sm-s'
            type='text'
            name='addr__pincode'
            id='addr__pincode'
            autoComplete='off'
            value={editForm?.pincode}
            onChange={(e) =>
              setEditForm({ ...editForm, pincode: e.target.value })
            }
            onFocus={() => setEditForm({ ...editForm, errorFields: [] })}
          />
          {errorFields?.includes('pincode') && (
            <h1 className='input__error'>{addressError}</h1>
          )}
        </div>
        <button type='submit' className='btn btn--auth--solid sb'>
          SUBMIT
        </button>
        <button type='reset' className='btn btn--error--solid sb'>
          CANCEL
        </button>
      </form>
    </div>
  );
}
