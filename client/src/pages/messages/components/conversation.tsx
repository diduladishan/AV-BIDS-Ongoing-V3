import { format } from 'date-fns';
import { FC, useEffect, useState } from 'react';
import { Conversation as ConversationType, User } from '../../../types';
import api from '../../../utils/api';

interface ConversationProps {
  currentUser: User | null;
  conversation: ConversationType;
  onDelete: () => void;
}

const Conversation: FC<ConversationProps> = ({
  conversation,
  currentUser,
  onDelete,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const friendId = conversation?.members?.find((m) => m !== currentUser?._id);

    const getUser = async () => {
      try {
        const res = await api(`/users/${friendId}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  // const handleSwipe = (e: React.TouchEvent<HTMLDivElement>) => {
  //   // Adjust the threshold as needed
  //   const swipeThreshold = 50;
  //   const startX = e.touches[0].clientX;

  //   const handleTouchMove = (e: TouchEvent) => {
  //     const currentX = e.touches[0].clientX;
  //     const deltaX = startX - currentX;

  //     if (deltaX > swipeThreshold) {
  //       // Swiped left, trigger the onDelete callback
  //       onDelete();
  //       document.removeEventListener('touchmove', handleTouchMove);
  //     }
  //   };

  //   const handleTouchEnd = () => {
  //     document.removeEventListener('touchmove', handleTouchMove);
  //     document.removeEventListener('touchend', handleTouchEnd);
  //   };

  //   document.addEventListener('touchmove', handleTouchMove);
  //   document.addEventListener('touchend', handleTouchEnd);
  // };
  return (
    <div>
      <div className='border-b border-[#EDECF1] p-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-3'>
              <div className='bg-[#957fef] w-8 h-8 rounded-full flex justify-center items-center text-[#fff]'>
                {user?.firstName.charAt(0)}
                {user?.lastName.charAt(0)}
              </div>
            </div>

            <div className='flex flex-col'>
              <h2 className='text-[18px] font-semibold'>
                {user && user?.firstName} {user && user?.lastName}
              </h2>
              <p>Subject: AV Requirements</p>
            </div>
          </div>
          <p>
            {conversation.createdAt
              ? format(new Date(conversation.createdAt as Date), 'MMM dd')
              : 'Invalid Date'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Conversation;


