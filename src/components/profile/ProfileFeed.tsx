import { Divider, styled, ToggleButton, ToggleButtonGroup, useTheme } from '@mui/material';
import React, { useState } from 'react';
import Feed from 'src/components/feed/Feed';
import { DataQuery, PostInteractionType, PostOrder } from 'src/db/apis/DataQuery';
import { UserEntity } from 'src/db/entities/users/UserEntity';
import useAuth from 'src/hooks/useAuth';
import { useUpdateEffect } from 'src/hooks/useUpdateEffect';
import ProfileCard from './ProfileCard';

interface ProfileCardProps {
  profileUser: UserEntity;
}

enum FeedSelection {
  submissions = 'recent',
  favorites = 'favorites',
}

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  border: 0,
  marginTop: theme.spacing(1/2),
  marginBottom: theme.spacing(1/2),
  '& .MuiToggleButtonGroup-root': {

  },
  '& .MuiToggleButtonGroup-grouped': {
    //margin: theme.spacing(0.5),
  },
}));


export default function ProfileFeed( { profileUser }: ProfileCardProps ) {
  const [feedSelection, setFeedSelection] = useState<FeedSelection>(FeedSelection.submissions)

  const handleFeedSelectionToggle = (event: React.MouseEvent<HTMLElement>, newFeedSelection: FeedSelection | null) => {
    if (newFeedSelection !== null) {
      setFeedSelection(newFeedSelection);
    }
  };

  const queryGenerator = (feedSelection: FeedSelection) => async function getNewPosts(lastPage: any) {
    try {
      console.log("NEW FEED SELECTION: " + feedSelection)
      return await DataQuery.searchPostByUserID(profileUser.id, PostInteractionType.Submission, PostOrder.Trendscore, lastPage);
    } catch (error) {
      console.log(error)
    }
  };
  let [feedSelectionQueryCall, setFeedSelectionQueryCall] = useState(() => queryGenerator(feedSelection));
  
  useUpdateEffect(() => {
    setFeedSelectionQueryCall(() => queryGenerator(feedSelection));
  }, [feedSelection]);

  return (
    <> 
      <ProfileCard profileUser={profileUser} />
      <Divider variant="fullWidth" />
      <StyledToggleButtonGroup fullWidth value={feedSelection} exclusive onChange={handleFeedSelectionToggle}>
        <ToggleButton disableRipple value={FeedSelection.submissions}>게시물</ToggleButton>
        <ToggleButton disableRipple value={FeedSelection.favorites}>저장됨</ToggleButton>
      </StyledToggleButtonGroup>
      {/* <Divider sx={{mb:theme.spacing(2)}} variant="fullWidth" /> */}
      <Feed getNewPosts={feedSelectionQueryCall} />
    </>
  )
}
