import { UserProfile } from '@common.types';
import Button from '@components/Button';
import { getUserById } from '@lib/actions';
import React from 'react';
import Image from 'next/image';
import ProfilePage from '@components/ProfilePage';

interface IProfile {}

const Profile = async ({ params }: { params: { id: string } }) => {
  const { user } = (await getUserById(params.id)) as { user: UserProfile };

  console.log(user);

  return (
    <div>
      <ProfilePage user={user} />
    </div>
  );
};

export default Profile;
