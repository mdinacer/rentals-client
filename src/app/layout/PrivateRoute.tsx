import { useLocation, Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/configureStore';

export default function PrivateRoute({
  children,
  roles,
}: {
  children: JSX.Element;
  roles?: string[];
}) {
  const { user } = useAppSelector((state) => state.account);
  let location = useLocation();

  if (!user) {
    return <Navigate to='/account/login' state={{ from: location }} />;
  }

  const userHasRequiredRole =
    user && roles && roles?.some((r) => user.roles?.includes(r));

  if (roles && !userHasRequiredRole) {
    console.log('You are not allowed to go there');
    return <Navigate to='/' />;
  }

  return children;
}
