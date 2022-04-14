import './modal.css';
import ModalAddressForm from './ModalAddressForm';

export function AddressModal({ setAddressmodal, addressObject }) {
  return (
    <div className='modal modal__open flex-ct-ct' wide='40'>
      <div
        className='modal__background'
        onClick={() => setAddressmodal(false)}
      ></div>

      <ModalAddressForm
        addressObject={addressObject}
        setAddressmodal={setAddressmodal}
      />

      <span className='modal__close' onClick={() => setAddressmodal(false)}>
        <i className='fas fa-times-circle'></i>
      </span>
    </div>
  );
}
