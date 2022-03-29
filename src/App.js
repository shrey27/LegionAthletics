import { availableRoutes } from './frontend/routes/routes';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    // console.log(pathname);
    /* settimeout make sure this run after components have rendered. This will help fixing bug for some views where scroll to top not working perfectly */
    setTimeout(() => {
      window.scrollTo({ top: 0 });
    }, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <div className=''>
      <ScrollToTop />
      {availableRoutes}
      <ToastContainer style={{ fontWeight: '500', fontSize: '1.25rem' }} />
    </div>
  );
}

export default App;
