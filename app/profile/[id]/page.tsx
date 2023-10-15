import { UserProfile } from '@common.types';
import Button from '@components/ui/Button';
import { getUserById } from '@lib/actions';
import React from 'react';
import Image from 'next/image';
import ProfilePage from '@components/profile/ProfilePage';

const Profile = async ({ params }: { params: { id: string } }) => {
  const { user } = (await getUserById(params.id)) as { user: UserProfile };

  return (
    <div>
      <ProfilePage user={user} />
    </div>
  );
};

export default Profile;
