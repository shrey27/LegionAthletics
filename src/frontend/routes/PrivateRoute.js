import { Fragment } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { SIGNIN } from './routes';

export default function PrivateRoutes() {
  const token = localStorage.getItem('token');
  return <Fragment>{token ? <Outlet /> : <Navigate to={SIGNIN} />}</Fragment>;
}
