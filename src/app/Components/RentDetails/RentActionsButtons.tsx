import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import agent from '../../api/agent';
import { Rent } from '../../models/rent';
import { removeRent, updateRent } from '../../slices/rentsSlice';
import { useAppDispatch, useAppSelector } from '../../store/configureStore';

interface Props {
  rent: Rent;
}
type rentAction = 'accept' | 'reject' | 'delete';

export default function RentActionsButtons({ rent }: Props) {
  const [busy, setBusy] = useState(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.account);
  const [action, setAction] = useState<rentAction | null>(null);
  const isPropertyOwner = !!user && rent.receiver.id === user.profile.id;

  function getActionContent(rentAction: rentAction | null) {
    switch (rentAction) {
      case 'delete':
        return (
          <Dialog
            key={action}
            title='Delete Request'
            body='This action is permanent, do you want to proceed?'
            onClose={(value) => {
              if (value) {
                handleDeleteRequest();
              }
              setAction(null);
            }}
            isDelete
          />
        );

      case 'reject':
        return (
          <Dialog
            key={action}
            title={`${isPropertyOwner ? 'Reject' : 'Cancel'} Request`}
            body={`This action is permanent and irreversible, do you want to proceed with the ${
              isPropertyOwner ? 'Rejection' : 'Cancellation'
            }?`}
            onClose={(value) => {
              if (value) {
                handleRejectRequest();
              }
              setAction(null);
            }}
            isDelete
          />
        );

      case 'accept':
        return (
          <Dialog
            key={action}
            title='Accept Request'
            body={`This action is will validate the rent operation, do you want to proceed?`}
            onClose={(value) => {
              if (value) {
                handleAcceptRequest();
              }
              setAction(null);
            }}
          />
        );

      default:
        break;
    }
  }

  async function handleAcceptRequest() {
    try {
      setBusy(true);
      await agent.Rents.acceptRequest(rent.id);
      dispatch(updateRent({ id: rent.id, changes: { status: 'operation' } }));
      rent.status = 'operation';
    } catch (error) {
      console.log(error);
    } finally {
      setBusy(false);
    }
  }

  async function handleRejectRequest() {
    try {
      setBusy(true);
      await agent.Rents.cancelRequest(rent.id);
      const status = isPropertyOwner ? 'rejected' : 'cancelled';
      dispatch(
        updateRent({
          id: rent.id,
          changes: { status },
        })
      );
      rent.status = status;
    } catch (error) {
      console.log(error);
    } finally {
      setBusy(false);
    }
  }

  async function handleDeleteRequest() {
    try {
      setBusy(true);
      await agent.Rents.delete(rent.id);
      dispatch(removeRent(rent.id));
    } catch (error) {
      console.log(error);
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <div className=' flex flex-row gap-x-6'>
        {rent.status === 'request' && (
          <>
            {isPropertyOwner && (
              <button
                onClick={() => setAction('accept')}
                className={`${buttonStyle} bg-green-800 hover:bg-green-400 hover:shadow-green-600`}
              >
                {busy ? 'Wait' : 'Accept'}
              </button>
            )}
            <button
              onClick={() => setAction('reject')}
              className={`${buttonStyle} ${
                isPropertyOwner
                  ? 'bg-orange-800 hover:bg-orange-400 hover:shadow-orange-600'
                  : 'bg-red-800 hover:bg-red-400 hover:shadow-red-600'
              } bg-orange-800 hover:bg-orange-400 hover:shadow-orange-600`}
            >
              {busy ? 'Wait' : isPropertyOwner ? 'Reject' : 'Cancel'}
            </button>
          </>
        )}
        {(rent.status === 'cancelled' || rent.status === 'rejected') &&
          !isPropertyOwner && (
            <button
              onClick={() => setAction('delete')}
              className={`${buttonStyle} bg-red-800 hover:bg-red-300 hover:shadow-red-500`}
            >
              {busy ? 'Wait' : 'Delete'}
            </button>
          )}
      </div>

      <AnimatePresence exitBeforeEnter>
        {action !== null && (
          <motion.div
            variants={containerVariants}
            initial='initial'
            animate='animate'
            exit='exit'
            className='fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-90 flex items-center justify-center'
          >
            {getActionContent(action)}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

interface DialogProps {
  title: string;
  body: string;
  okText?: string;
  cancelText?: string;
  isDelete?: boolean;
  onClose: (value: boolean) => void;
}
function Dialog({
  title,
  body,
  okText = 'Ok',
  cancelText = 'Cancel',
  isDelete = false,
  onClose,
}: DialogProps) {
  return (
    <motion.div
      variants={dialogVariants}
      className='bg-white dark:bg-gray-900 px-10 py-5 rounded-lg max-w-lg'
    >
      <p className=' font-Primary text-xl uppercase font-thin border-b pb-1 mb-5'>
        {title}
      </p>
      <p className=' font-Secondary text-base mb-5'>{body}</p>
      <div
        className={`flex lg:ml-auto ${
          isDelete
            ? 'flex-row-reverse lg:justify-start'
            : 'flex-row lg:justify-end'
        } gap-x-5 pt-5 justify-center  items-center  w-full `}
      >
        <button
          className={`${buttonStyle} bg-gray-600 hover:border-y-gray-100 hover:shadow-gray-300`}
          onClick={() => onClose(false)}
        >
          {cancelText}
        </button>
        <button
          className={`${buttonStyle} ${
            isDelete
              ? 'bg-red-800 hover:border-y-red-300 hover:shadow-red-500'
              : 'bg-sky-800 hover:border-y-sky-100 hover:shadow-sky-300'
          }`}
          onClick={() => onClose(true)}
        >
          {okText}
        </button>
      </div>
    </motion.div>
  );
}

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.38, delayChildren: 0.2 },
  },
  exit: { opacity: 0 },
};

const dialogVariants = {
  initial: { opacity: 0, x: -200 },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: { opacity: 0, x: 200 },
};
const buttonStyle =
  ' px-5 py-1 font-Primary uppercase font-thin text-base text-white rounded-md  hover:-translate-y-1 transition-all duration-200 hover:shadow-lg hover:scale-105  ';
