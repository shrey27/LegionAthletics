import { Slide, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ToastMessage = (msg, type) =>
  toast(msg, {
    position: 'bottom-left',
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    type: type,
    transition: Slide,
    theme: 'dark'
  });
