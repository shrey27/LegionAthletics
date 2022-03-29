import { Fragment } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthCtx } from '../context';
import { SIGNIN } from './routes';

export default function PrivateRoutes() {
  const { token } = useAuthCtx();
  return <Fragment>{token ? <Outlet /> : <Navigate to={SIGNIN} />}</Fragment>;
}
