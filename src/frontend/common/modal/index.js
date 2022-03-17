import './modal.css';

export default function Modal({
  modalOpen,
  setModalOpen,
  returnFlag,
  returnOrderhandler
}) {
  return (
    <div className={`modal ${modalOpen && 'modal__open'} flex-ct-ct`} wide='40'>
      <div
        className='modal__background'
        onClick={() => setModalOpen(false)}
      ></div>
      <div className='modal__content sharp md-s'>
        <h1 className='tertiary md sb cen'>Please Confirm</h1>
        <p className='md sb cen mg-half'>
          Are you sure you want to {returnFlag ? 'cancel' : 'return'} this order
          ?
        </p>
        <div className='flex-ct-ct'>
          <button
            className='btn btn--auth--solid sb'
            onClick={returnOrderhandler}
          >
            Proceed
          </button>
          <button
            className='btn btn--error sb'
            onClick={() => setModalOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
      <span className='modal__close' onClick={() => setModalOpen(false)}>
        <i className='fas fa-times-circle'></i>
      </span>
    </div>
  );
}
