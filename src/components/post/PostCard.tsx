//react
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
//mui
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CircleIcon from '@mui/icons-material/Circle';
import IosShareIcon from '@mui/icons-material/IosShare';
import {
  Avatar,
  Box, Card, Divider, Link, Stack, Typography
} from '@mui/material';
// components
import PostMoreButton from 'src/components/post/PostMoreButton';
import { PostEntity } from 'src/db/entities/posts/PostEntity';
//hooks
import useAuth from 'src/hooks/useAuth';
import { PAGE_PATHS } from 'src/routing/paths';
import { useSignupDialog } from 'src/layouts/dashboard';
// utils
import { fDate } from 'src/utils/formatTime';
import getAvatarColor from 'src/utils/getAvatarColor';
import DesktopCopyButton from './DesktopCopyButton';
import VotePanel from './VotePanel';
import TrendingIcons from './TrendingIcons';
import { PostInteraction } from 'src/db/apis/PostInteraction';
import UnstyledWhenDisabledIconButton from './UnstyledWhenDisabledIconButton';

// ----------------------------------------------------------------------

interface PostCardProps {
  post: PostEntity;
}

export default function PostCard( { post }: PostCardProps ) {
  const { authedUser } = useAuth();
  const handleSignupDialogOpen = useSignupDialog();
  const [isInteracting, setIsInteracting] = useState(false);
  const [isFavorited, setIsFavorited] = useState(authedUser ? authedUser.nonauth.activity.favorites.includes(post.postID) : false);

  let canNativeMobileShare = 'canShare' in navigator; //checks if user's device has a native share functionality
  //window.navigator.canShare() //this is the 'proper' way according to mozilla to check if canShare, but im getting errors using this method. use this workaround detailed here instead: https://stackoverflow.com/questions/57345539/navigator-canshare-in-typescript-permissions-denied

  const handleToggleFavorited = async () => {
    setIsInteracting(true);
    if (!authedUser) {
      handleSignupDialogOpen();
    } else if (isFavorited) {
      try {
        setIsFavorited(prevIsFavorited => !isFavorited);
        await PostInteraction.unfavoritePost(authedUser.nonauth.id, post.postID)
      } catch (error: any) {
        console.error(error.message);
        setIsFavorited(prevIsFavorited => !isFavorited);
      }
    } else { //!isFavorited
      try {
        setIsFavorited(prevIsFavorited => !isFavorited);
        await PostInteraction.favoritePost(authedUser.nonauth.id, post.postID)
      } catch (error: any) {
        console.error(error.message);
        setIsFavorited(prevIsFavorited => !isFavorited);
      }
    }
    setIsInteracting(false);
  }

  //TODO add proper icons (in src/public folder) so that share action on Kakao/kakaostory/naver is accompanied by our logo
  //TODO add a custom share popup for devices with width small enough to be mobile which dont qualify for navigator.share (would much rather create a custom share feature than just have them use copy button)
  const handleNativeMobileShare = async () => {
    setIsInteracting(true);
    try {
      await navigator.share({
        //title: "title of post!", //mozilla: "the title may be ignored"
        //text: 'Check out this post on 인싸전!', using the text property makes the share image go away :( so leave it off
        url: `https://inssajeon.com/post/${post.postID}`,
      })
      if (authedUser) {
        await PostInteraction.sharePost(authedUser.nonauth.id, post.postID);
      }
    } catch (error: any) {
      console.error('Something went wrong sharing. error: ', error);
    }
    setIsInteracting(false);
  }

  return (
    <Card >
      <Box sx={{ px:2, height:60, display:'flex', flexDirection: "row", alignItems:"center", justifyContent:"center", }}>
        <Avatar sx={{mx:1, width:30, height:30, bgcolor: getAvatarColor(post.userProfile.username) }} src={post.userProfile.picPath} />
        <Link to={`${PAGE_PATHS.dashboard.profile}/${post.userProfile.username}`} variant="subtitle1" color="text.primary" component={RouterLink}>{post.userProfile.username}</Link>
        <CircleIcon sx={{ color:'gray',fontSize: 4, ml:2 }}/>
        <Typography variant="caption" sx={{ mx:2,color: 'text.secondary' }}>{fDate((post.timestamp.toDate()))}</Typography>
        <TrendingIcons post={post} />
        <Box sx={{ flexGrow: 1 }} />
        <PostMoreButton post={post} />
      </Box>
      <Divider variant="middle" />
      <Stack  spacing={3} sx={{ p: 3, whiteSpace: 'pre-line'}}> {/*whitespace: pre-line generates newline for firebase strings*/}
        <Typography variant="h1">{post.word}</Typography>
        <Typography variant="body1">{post.definition}</Typography>
        <Typography variant="body3">{post.quote}</Typography>
      </Stack>
      <Box sx={{ p:2, height:60, display:'flex', flexDirection: "row", alignItems:"center", justifyContent:"center", }}>
        <VotePanel post={post}/>
        <Box sx={{ flexGrow: 1 }} />
        <UnstyledWhenDisabledIconButton disabled={isInteracting} onClick={handleToggleFavorited}>
          {isFavorited ? <BookmarkIcon /> : <BookmarkBorderIcon/>}
        </UnstyledWhenDisabledIconButton>
        {canNativeMobileShare && 
          <UnstyledWhenDisabledIconButton disabled={isInteracting} onClick={handleNativeMobileShare}>
            <IosShareIcon />
          </UnstyledWhenDisabledIconButton>}
        {!canNativeMobileShare &&
          <DesktopCopyButton isDisabled={isInteracting} postID={post.postID}/>}
      </Box>
    </Card>
  );
}
