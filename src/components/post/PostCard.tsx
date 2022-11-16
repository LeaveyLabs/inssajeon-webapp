//react
//mui
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CircleIcon from '@mui/icons-material/Circle';
import IosShareIcon from '@mui/icons-material/IosShare';
import { Box, Card, Divider, Link, Stack, Typography, useTheme } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// components
import PostMoreButton from 'src/components/post/PostMoreButton';
import { PostInteraction } from 'src/db/apis/PostInteraction';
import { PostEntity } from 'src/db/entities/posts/PostEntity';
//hooks
import useAuth from 'src/hooks/useAuth';
import { useSignupDialog } from 'src/layouts/dashboard';
import { PAGE_PATHS } from 'src/routing/paths';
// utils
import { fDate } from 'src/utils/formatTime';
import CustomAvatar from '../experimental/CustomAvatar';
import DesktopCopyButton from './DesktopCopyButton';
import TrendingIcons from './TrendingIcons';
import UnstyledWhenDisabledIconButton from './UnstyledWhenDisabledIconButton';
import VotePanel from './VotePanel';

// ----------------------------------------------------------------------

export enum PostCardType {
  floatToTop = 'floatToTop',
}

interface PostCardProps {
  post: PostEntity;
  postCardType?: PostCardType;
}

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  '&.MuiCard-root': {
    boxShadow: theme.shadows[5],
  },
    width: '97%',
    marginLeft: 'auto',
    marginRight: 'auto',
}));

export default function PostCard( { post, postCardType }: PostCardProps ) {
  const { authedUser } = useAuth();
  const theme = useTheme();
  const handleSignupDialogOpen = useSignupDialog();
  const [isInteracting, setIsInteracting] = useState(false);
  const [isFavorited, setIsFavorited] = useState(authedUser ? authedUser.nonauth.activity.favorites.includes(post.postID) : false);

  let canNativeMobileShare = 'canShare' in navigator; //checks if user's device has a native share functionality
  //window.navigator.canShare() //this is the 'proper' way according to mozilla to check if canShare, but im getting errors using this method. use this workaround detailed here instead: https://stackoverflow.com/questions/57345539/navigator-canshare-in-typescript-permissions-denied

  const floatToTopCSS = {
    backgroundColor: alpha(theme.palette.primary.main, 0.15),
  }

  const flexbreak = {
    flexBasis: '100%',
    height: 0,
  }

  const handleToggleFavorited = async () => {
    setIsInteracting(true);

    /* Cannot toggle the favorite button without an authUser */
    if (!authedUser) handleSignupDialogOpen();

    /* If already favorited ... */
    else if (isFavorited) {
      try {
        /* Unfavorite the UI element of the post */
        setIsFavorited(prevIsFavorited => false);
        /* Remove favorite from the current auth instance */
        const i = authedUser.nonauth.activity.favorites.indexOf(post.postID);
        if (i !== -1) authedUser.nonauth.activity.favorites.splice(i, 1);
        /* Add favorite to the database */
        await PostInteraction.unfavoritePost(authedUser.nonauth.id, post.postID);
      }
      catch (error: any) {
        console.error(error.message);
        /* If there's an error, do not change the status of the button.  */
        setIsFavorited(prevIsFavorited => true);
      }
    }

    /* If not favorited yet ... */
    else {
      try {
        /* Favorite the UI element of the post */
        setIsFavorited(prevIsFavorited => true);
        /* Add favorite to the current auth instance */
        authedUser.nonauth.activity.favorites.push(post.postID);
        /* Add favorite to the database */
        await PostInteraction.favoritePost(authedUser.nonauth.id, post.postID)
      } catch (error: any) {
        console.error(error.message);
        /* If there's an error, do not change the status of the button. */
        setIsFavorited(prevIsFavorited => false);
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
    <StyledCard sx={postCardType === PostCardType.floatToTop ? floatToTopCSS : {} } >
      <Box sx={{ px:2, height:60, display:'flex', flexDirection: "row", alignItems:"center", justifyContent:"center", }}>
        <RouterLink to={`${PAGE_PATHS.dashboard.profile}/${post.userProfile.username}`}>
          <CustomAvatar sx={{mr:1, width:theme.spacing(3), height:theme.spacing(3) }} id={post.userID} picPath={post.userProfile.picPath} />
        </RouterLink>
        <Link sx={{maxWidth:'80%'}} noWrap to={`${PAGE_PATHS.dashboard.profile}/${post.userProfile.username}`} variant="subtitle2" color="text.primary" component={RouterLink}>{post.userProfile.username}</Link>
        <CircleIcon sx={{ color:'gray',fontSize: 4, ml:2 }}/>
        <Typography variant="caption" sx={{flexShrink:0, mx:2,color: 'text.secondary' }}>{fDate((post.timestamp.toDate()))}</Typography>
        <TrendingIcons post={post} />
        <Box sx={{ flexGrow: 1 }} />
        <PostMoreButton post={post} />
      </Box>
      <Divider variant="fullWidth" />
      <Stack spacing={4} sx={{ p: 3, mb:theme.spacing(4), whiteSpace: 'pre-line'}}> {/*whitespace: pre-line generates newline for firebase strings*/}
        <Typography sx={{ wordWrap:'break-word', wordBreak: 'keep-all'}} variant="h1">{post.word}</Typography>
        <Typography sx={{ wordWrap:'break-word', wordBreak: 'keep-all'}} variant="body1">{post.definition}</Typography>
        <Typography sx={{ wordWrap:'break-word', wordBreak: 'keep-all'}} variant="body3">{post.quote}</Typography>
      </Stack>
      <Box sx={{ pr:theme.spacing(3.5), pb:theme.spacing(2), height:'auto', display:'flex', flexDirection: "row", alignItems:"center", justifyContent:"center", }}>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ flexWrap: 'nowrap', maxWidth:'60%', height:'auto', display:'flex', flexDirection: "row", alignItems:"center", justifyContent:"center", }}>
          {post.tags.map((tag: String, i, arr) => { 
            return <Typography sx={{ml:theme.spacing(1)}}  noWrap  variant="body2">{`#${tag}  `} </Typography>
          })}
        </Box>
      </Box>
      <Divider variant="fullWidth" />

      <Box sx={{ px:2, height:60, display:'flex',  flexDirection: "row", alignItems:"center", justifyContent:"center", }}>
        {/* <Box sx={{flexBasis: '100%', height: 0, margin: 0, border: 0}} /> this code was trying to set a break in flexbox. couldnt get it to work */} 
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
    </StyledCard>
  );
}
