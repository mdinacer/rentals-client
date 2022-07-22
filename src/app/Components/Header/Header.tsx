import { MenuAlt3Icon, UserIcon, XIcon } from '@heroicons/react/solid';

import { LogoutIcon } from '@heroicons/react/outline';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signOut } from '../../slices/accountSlice';
import { useAppDispatch, useAppSelector } from '../../store/configureStore';
import useMediaQuery from '../../util/mediaQuery';

const logo = 'Kiraa';

export default function Header() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.account);
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const links = [
    { title: 'accueil', path: '/' },
    { title: 'propriétés', path: '/properties' },
    { title: 'à propos', path: '/about' },
    { title: 'contact', path: '/contact' },
  ];
  const loginElement = { title: 'Se connecter', path: '/account/login' };
  const logoutElement = { title: 'Se déconnecter', path: '/' };

  useEffect(() => {
    if (!isMobile && open) {
      setOpen(false);
    }
  }, [isMobile, open]);

  return (
    <nav className='fixed top-0 left-0 w-screen h-auto  bg-black z-10  py-1 text-white flex items-center justify-between drop-shadow-md'>
      <div className='w-full xl:container  px-5 mx-auto flex items-center justify-between relative'>
        <Link to={'/'}>
          <p className=' font-Primary text-3xl'>{logo}</p>
        </Link>

        {!isMobile && (
          <ul className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 list-none flex flex-row gap-x-5 items-center '>
            {links.map((link, index) => (
              <li
                key={index}
                className={`${
                  pathname === link.path
                    ? ' opacity-100 text-yellow-500 dark:text-indigo-500 font-bold'
                    : 'text-inherit opacity-50 font-normal'
                } hover:scale-110 transition-all duration-300`}
              >
                <Link to={link.path}>
                  <p className={' font-Primary text-lg uppercase font-thin'}>
                    {link.title}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {!isMobile &&
          (user ? (
            <div className='flex flex-row gap-x-5 items-center'>
              <Link to={'/profile'} className={'px-5'}>
                <div className=' flex flex-row items-center justify-center gap-x-2'>
                  {user.profile?.image ? (
                    <div className=' h-8 w-8 rounded-full overflow-hidden'>
                      <img
                        src={user.profile.image}
                        alt={user.username}
                        className=' object-cover'
                      />
                    </div>
                  ) : (
                    <UserIcon className='h-6 w-6' />
                  )}
                  <p className=' font-Primary text-xl font-thin capitalize'>
                    {user.username}
                  </p>
                </div>
              </Link>
              <Link
                to={logoutElement.path}
                onClick={() => dispatch(signOut())}
                className={
                  ' font-Primary font-thin text-base uppercase py-1 px-3 rounded-md flex flex-row gap-x-2 items-center'
                }
              >
                <LogoutIcon className='h-6 w-6 text-red-500' />
                <p>{logoutElement.title}</p>
              </Link>
            </div>
          ) : (
            <Link
              to={loginElement.path}
              onClick={() => setOpen(false)}
              className={
                ' font-Primary text-lg uppercase font-thin bg-yellow-500 dark:bg-indigo-500 py-1 px-3 rounded-'
              }
            >
              {loginElement.title}
            </Link>
          ))}

        {isMobile && (
          <div>
            {user && (
              <Link
                to={'/profile'}
                title='menuButton'
                type='button'
                className={
                  ' font-Primary text-lg uppercase font-thin  py-1 px-3 rounded-md'
                }
              >
                <UserIcon className='h-8 w-8' />
              </Link>
            )}
            <button
              title='menuButton'
              type='button'
              onClick={() => setOpen((prev) => !prev)}
              className={
                ' font-Primary text-lg uppercase font-thin  py-1 px-3 rounded-md'
              }
            >
              <MenuAlt3Icon className='h-8 w-8' />
            </button>
          </div>
        )}
      </div>

      <AnimatePresence exitBeforeEnter>
        {isMobile && open && (
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{
              stiffness: 250,
              duration: 0.3,
            }}
            className='flex absolute top-0 left-0 w-screen h-screen bg-gradient-to-br bg-gray-800 dark:from-slate-900 dark:to-black items-center justify-center'
          >
            <button
              title='menuButton'
              type='button'
              onClick={() => setOpen(false)}
              className={
                'absolute top-0 right-0 m-5 font-Primary text-lg uppercase font-thin  py-1 px-3 rounded-md'
              }
            >
              <XIcon className='h-8 w-8' />
            </button>
            <ul className=' list-none flex flex-col gap-y-3'>
              {links.map((link, index) => (
                <li className='list-item' key={index}>
                  <Link
                    onClick={() => setOpen(false)}
                    to={link.path}
                    className={'font-Primary text-4xl uppercase font-thin'}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}

              <li className='list-item'>
                {user ? (
                  <Link
                    to={logoutElement.path}
                    onClick={() => {
                      dispatch(signOut());
                      setOpen(false);
                    }}
                    className={
                      'mt-5 font-Primary w-full text-lg uppercase font-thin text-red-500 py-1  rounded-md flex flex-row gap-x-2 items-center'
                    }
                  >
                    <p className={'font-Primary text-4xl uppercase font-thin'}>
                      {logoutElement.title}
                    </p>
                  </Link>
                ) : (
                  <Link
                    to={loginElement.path}
                    onClick={() => setOpen(false)}
                    className={'font-Primary text-4xl uppercase font-thin'}
                  >
                    {loginElement.title}
                  </Link>
                )}
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
