import { useState, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import IosShareIcon from '@mui/icons-material/IosShare';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import CircleIcon from '@mui/icons-material/Circle';
import {
  Box,
  Link,
  Card,
  Stack,
  Divider,
  Typography,
  IconButton,
} from '@mui/material';
import { green, pink, red } from '@mui/material/colors';
//hooks

// utils
// import { fDate } from '../../../../utils/formatTime';
// import { fShortenNumber } from '../../../../utils/formatNumber';

// // components
import PostMoreButton from 'src/components/post/PostMoreButton'
import VotePanel from './VotePanel';
import DesktopCopyButton from './DesktopCopyButton';
import { PostEntity } from 'src/db/entities/posts/PostEntity';
import { fDate } from 'src/utils/formatTime';
// ----------------------------------------------------------------------


interface PostCardProps {
  post: PostEntity;
}

//TODO create isMobile hook
//is it bad for this to be checked here? aka just once on the load, and not on rerenders?
const isMobile = /Mobi/i.test(window.navigator.userAgent) 

export default function PostCard( { post }: PostCardProps ) {
  //const { user } = useAuth();
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isMobileCheck, setIsMobileCheck] = useState(false);
  const [upvotes, setUpvotes] = useState(100);
  const [downvotes, setDownvotes] = useState(5);

  const handleToggleFavorited = () => {
    setIsFavorited(prevIsFavorited => !isFavorited);
  }

  const handleMobileShare = () => {
    navigator
      .share({
        title: "title of post!",
        text: 'Check out this post on 인싸전!',
        url: document.location.href,
      })
      .then(() => {
        //TODO a little "successful share" icon?
      })
      .catch(error => {
        console.error('Something went wrong sharing the blog', error);
      });
  }

  //notes on custom hook for menu
  //https://github.com/jcoreio/material-ui-popup-state
  return (
    <Card >
      <Box sx={{ px:2, height:60, display:'flex', flexDirection: "row", alignItems:"center", justifyContent:"center", }}>
        <AccountCircleIcon sx={{mx:1}} />
        <Link to={`/users/${post.userProfile.username}`} variant="subtitle1" color="text.primary" component={RouterLink}>
            {post.userProfile.username}
          </Link>
        <CircleIcon sx={{ color:'gray',fontSize: 4, ml:2 }}/>
        <Typography variant="caption" sx={{ mx:2,color: 'text.secondary' }}>
            {fDate((post.timestamp.toDate()))} {/*2일 전에 fDate(post.createdAt)*/}
        </Typography>
        <LocalFireDepartmentIcon sx={{ color: red[500] }}/>
        <Box sx={{ flexGrow: 1 }} />
        <PostMoreButton/>
      </Box>
      <Divider variant="middle" />
      <Stack spacing={3} sx={{ p: 3 }}>
        <Typography variant="h1">{post.word}</Typography>
        <Typography variant="body1">{post.definition}</Typography>
        <Typography variant="body3">{post.quote}</Typography>
      </Stack>
      <Box sx={{ p:2, height:60, display:'flex', flexDirection: "row", alignItems:"center", justifyContent:"center", }}>
        <VotePanel/>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton onClick={handleToggleFavorited}>
          {isFavorited ? <BookmarkIcon /> : <BookmarkBorderIcon/>}
        </IconButton>
        {isMobile && 
          <IconButton sx={{}} onClick={handleMobileShare}>
            <IosShareIcon />
          </IconButton>}
        {!isMobile &&
          <DesktopCopyButton/>}
      </Box>
    </Card>
  );
}
