import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../store/configureStore';
import { fetchCurrentUser } from '../slices/accountSlice';
import { ToastContainer } from 'react-toastify';
import LoadingComponent from '../Components/Common/LoadingComponent';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/Home';
import Header from '../Components/Header';
import SocketClient from '../util/socketClient';
import PrivateRoute from './PrivateRoute';
import NotFoundPage from '../errors/NotFound';
import 'react-toastify/dist/ReactToastify.css';
import { User } from '../models/user';

export const Client = new SocketClient();

function App() {
  const { user } = useAppSelector((state) => state.account);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  const initSocket = useCallback((user: User) => {
    Client.connect(user.token);

    Client.socket?.emit('join', {
      name: user.username || 'anonymous',
      province: user.profile?.address?.daira || '',
      city: user.profile?.address?.commune || '',
      //room: 'test',
    });

    Client.on('message', (value: any) => {
      // console.log('message:', value);
    });
  }, []);

  const initApp = useCallback(async () => {
    try {
      setLoading(true);
      await dispatch(fetchCurrentUser());
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => {
      setLoading(false);
    });
  }, [initApp]);

  useEffect(() => {
    if (user) {
      initSocket(user);
    }
    return () => {
      Client.disconnect();
    };
  }, [initSocket, user]);

  if (loading) return <LoadingComponent message='Initializing Application' />;
  return (
    <div className=' autofill:text-red-500 w-full  min-h-screen select-none text-black dark:text-white bg-gray-200 h-full  border-black dark:border-white dark:bg-black '>
      <ToastContainer position='bottom-right' hideProgressBar />
      <Header />
      <Routes>
        <Route path='*' element={<NotFoundPage />} />
        <Route path='/' element={<HomePage />} />
        <Route path={'/*'}>
          <Route
            path='test/:slug'
            element={
              <Suspense fallback={<div />}>
                <TestPage />
              </Suspense>
            }
          />
          <Route path='account'>
            <Route
              path='login'
              element={
                <Suspense fallback={<div />}>
                  <Login />
                </Suspense>
              }
            />
            <Route
              path='register'
              element={
                <Suspense fallback={<div />}>
                  <Register />
                </Suspense>
              }
            />
          </Route>

          <Route path='properties'>
            <Route
              index
              element={
                <Suspense>
                  <Properties />
                </Suspense>
              }
            />
            <Route
              path='create/'
              element={
                <Suspense fallback={<div />}>
                  <PrivateRoute>
                    <PropertyAddEdit />
                  </PrivateRoute>
                </Suspense>
              }
            />

            <Route
              path='edit/:slug'
              element={
                <Suspense fallback={<div />}>
                  <PrivateRoute>
                    <PropertyAddEdit />
                  </PrivateRoute>
                </Suspense>
              }
            />
            <Route
              path=':slug'
              element={
                <Suspense fallback={<div />}>
                  <PropertyDetails />
                </Suspense>
              }
            />
          </Route>

          <Route path='profile'>
            <Route
              index
              element={
                <Suspense fallback={<div />}>
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                </Suspense>
              }
            />

            <Route
              path='operations'
              element={
                <Suspense fallback={<div />}>
                  <PrivateRoute>
                    <UserOperations />
                  </PrivateRoute>
                </Suspense>
              }
            />
            <Route
              path='properties'
              element={
                <Suspense fallback={<div />}>
                  <PrivateRoute>
                    <UserProperties />
                  </PrivateRoute>
                </Suspense>
              }
            />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

const TestPage = lazy(() => import('../pages/TestPage'));
const Login = lazy(() => import('../pages/Account/LoginPage'));
const Register = lazy(() => import('../pages/Account/RegisterPage'));
const Properties = lazy(() => import('../pages/Properties'));
const PropertyDetails = lazy(() => import('../pages/PropertyDetails'));
const PropertyAddEdit = lazy(() => import('../pages/PropertyCreate'));
const Profile = lazy(() => import('../pages/Profile'));
const UserOperations = lazy(
  () => import('../pages/Profile/UserOperationsPage')
);
const UserProperties = lazy(() => import('../pages/Profile/UserProperties'));

export default App;
