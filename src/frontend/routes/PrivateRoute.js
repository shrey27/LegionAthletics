import { Fragment } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuthCtx } from '../context';
import { SIGNIN } from './routes';

export default function PrivateRoutes() {
  const { token } = useAuthCtx();
  const location = useLocation();
  return (
    <Fragment>
      {token ? (
        <Outlet />
      ) : (
        <Navigate to={SIGNIN} state={{ from: location }} replace />
      )}
    </Fragment>
  );
}
