import { useState, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
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
  Paper,
  Avatar,
  Checkbox,
  Divider,
  TextField,
  Typography,
  CardHeader,
  IconButton,
  AvatarGroup,
  InputAdornment,
  FormControlLabel,
  Radio,
  Button,
} from '@mui/material';
import { green, pink, red } from '@mui/material/colors';

// utils
// import { fDate } from '../../../../utils/formatTime';
// import { fShortenNumber } from '../../../../utils/formatNumber';
// // components
import PostMoreMenu from 'src/components/post/PostMoreMenu'
import VotePanel from './VotePanel';
// import Image from '../../../../components/Image';
// import Iconify from '../../../../components/Iconify';
// import MyAvatar from '../../../../components/MyAvatar';
// import EmojiPicker from '../../../../components/EmojiPicker';


// ----------------------------------------------------------------------


// type Post = {
//   ID: string,
//   userID: string,
//   word: string,
//   description: string,
//   quote: string,
//   tags: string[],
//   upvotes: string[],
//   downvotes: string[],
//   shares: string[],
//   flags: string[],
//   //Profile: posterProfile;
//   timestamp: Date,
//   trendscore: number; //should we store firebase "number" as int or double or what
// };

// type User = {
//   ID: string,
//   userID: string,
//   word: string,
//   description: string,
//   quote: string,
//   tags: string[],
//   upvotes: string[],
//   downvotes: string[],
//   shares: string[],
//   flags: string[],
//   //Profile: posterProfile;
//   timestamp: Date,
//   trendscore: number; //should we store firebase "number" as int or double or what
// };

// Post post = new Post()
// User user = new User()
// User poster = new User()

// interface Props {
//   post: Post;
// }

export default function PostCard(/*{ post }: Props*/) {
  //const { user } = useAuth();
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [upvotes, setUpvotes] = useState(100);
  const [downvotes, setDownvotes] = useState(5);

  const handleToggleFavorited = () => {
    setIsFavorited(prevIsFavorited => !isFavorited)
  }

  const handleToggleUpvote = () => {
    if (isUpvoted) { //unupvote
      setIsUpvoted(false);
      setUpvotes((prevUpvotes) => prevUpvotes - 1);
    }
    else if (isDownvoted) { //undownvote and upvote
      setIsDownvoted(false);
      setDownvotes((prevDownvotes) => prevDownvotes - 1);
      setIsUpvoted(true);
      setUpvotes((prevUpvotes) => prevUpvotes + 1);
    }
    else { //upvote
      setIsUpvoted(true);
      setUpvotes((prevUpvotes) => prevUpvotes + 1);
    }
  }

  const handleToggleDownvote = () => {
    if (isDownvoted) { //undownvote
      setIsDownvoted(false);
      setDownvotes((prevDownvotes) => prevDownvotes - 1);
    }
    else if (isUpvoted) { //unupvote and downvote
      setIsUpvoted(false);
      setUpvotes((prevUpvotes) => prevUpvotes - 1);
      setIsDownvoted(true);
      setDownvotes((prevDownvotes) => prevDownvotes + 1);
    }
    else { //downvote
      setIsDownvoted(true);
      setDownvotes((prevDownvotes) => prevDownvotes + 1);
    }
  }

  const handleShare = () => {

  }

  //notes on custom hook for menu
  //https://github.com/jcoreio/material-ui-popup-state
  return (
    <Card>
      <Box sx={{ px:2, height:60, display:'flex', flexDirection: "row", alignItems:"center", justifyContent:"center", }}>
        <AccountCircleIcon sx={{mx:1}} />
        <Link to={`/users/102984019284091`} variant="subtitle1" color="text.primary" component={RouterLink}>
            김아담 {/*post.userID*/}
          </Link>
        <CircleIcon sx={{ fontSize: 5, ml:2 }}/>
        <Typography variant="caption" sx={{ mx:2,color: 'text.secondary' }}>
          2일 전에{/*fDate(post.createdAt)*/}
        </Typography>
        <LocalFireDepartmentIcon sx={{ color: red[500] }}/>
        <Box sx={{ flexGrow: 1 }} />
        <PostMoreMenu/>
      </Box>
      <Divider variant="middle" />
      <Stack spacing={3} sx={{ p: 3 }}>
        <Typography variant="h1">단어</Typography>
        <Typography variant="body1">ㅁㄴㅇㄹㅁㄴㅇㄹ</Typography>
        <Typography variant="body3">ㅋㅋㅋㅋㅋㅋㅋ</Typography>
      </Stack>
      <Divider variant="middle" />
      <Box sx={{ p:2, height:60, display:'flex', flexDirection: "row", alignItems:"center", justifyContent:"center", }}>
        <VotePanel/>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton onClick={handleToggleFavorited}>
          {isFavorited ? <BookmarkIcon /> : <BookmarkBorderIcon/>}
        </IconButton>
        <IconButton onClick={handleShare}>
          <IosShareIcon />
        </IconButton>
      </Box>
    </Card>
  );
}
