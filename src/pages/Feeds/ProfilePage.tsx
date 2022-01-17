// @mui
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import NoProfileCard from 'src/components/profile/NoProfileCard';
import ProfileFeed from 'src/components/profile/ProfileFeed';
import ProfileSkeleton from 'src/components/profile/ProfileSkeleton';
import { UserEntity } from 'src/db/entities/users/UserEntity';
//firebase
import { DataQuery, ProfileOrder } from '../../db/apis/DataQuery';
// components
import Page from '../Page';
// ----------------------------------------------------------------------

export default function ProfilePage() {
  const params = useParams();
  const profileUsername = params.id;
  const [isLoading, setIsLoading] = useState(true);
  const [profileUser, setProfileUser] = useState<UserEntity | null >(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        let response = await DataQuery.searchUserByUserProfile({username: profileUsername}, ProfileOrder.Alphabetical);
        if (response.length > 0) {
          setProfileUser(response[0]);
          setIsLoading(false);
        } 
      } catch {
        console.error("프로필 검색하는 데 오류가 발생했다");
      } finally {
        setIsLoading(false);
      }
    }
    fetchProfile()
  }, [])

  return (
    <Page title={profileUsername}>
      {isLoading ? 
        <ProfileSkeleton/>
      : profileUser ?
        <ProfileFeed profileUser={profileUser} />
      :
        <NoProfileCard/>
      }
    </Page>
  );
}
