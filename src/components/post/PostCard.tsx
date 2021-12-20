import { useState, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import IosShareIcon from '@mui/icons-material/IosShare';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleUpTwoToneIcon from '@mui/icons-material/ArrowCircleUpTwoTone';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleDownTwoToneIcon from '@mui/icons-material/ArrowCircleDownTwoTone';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import {
  Box,
  Link,
  Card,
  Stack,
  Paper,
  Avatar,
  Checkbox,
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
import { green, pink } from '@mui/material/colors';

// utils
// import { fDate } from '../../../../utils/formatTime';
// import { fShortenNumber } from '../../../../utils/formatNumber';
// // components
import PostMoreMenu from 'src/components/post/PostMoreMenu'
import VoteButtonAnimate from '../animate/VoteButtonAnimate';
// import Image from '../../../../components/Image';
// import Iconify from '../../../../components/Iconify';
// import MyAvatar from '../../../../components/MyAvatar';
// import EmojiPicker from '../../../../components/EmojiPicker';

// ----------------------------------------------------------------------

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
      <CardHeader
        disableTypography //allows you to use custom typography
        avatar={<AccountCircleIcon />}
        title={
          <Link to={`/users/102984019284091`} variant="subtitle2" color="text.primary" component={RouterLink}>
            김아담 {/*post.userID*/}
          </Link>
        }
        subheader={
          <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
            2일 전에{/*fDate(post.createdAt)*/}
          </Typography>
        }
        action={<PostMoreMenu/>}
      />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Typography variant="h1">단어</Typography>
        <Typography variant="body1">ㅁㄴㅇㄹㅁㄴㅇㄹ</Typography>
        <Typography variant="body3">ㅋㅋㅋㅋㅋㅋㅋ</Typography>
        <Stack direction="row" alignItems="center">
          <IconButton onClick={handleToggleUpvote}>
            {isUpvoted ? <ArrowCircleUpTwoToneIcon sx={{ fontSize:40, color: green[500] }}/> : <ArrowCircleUpIcon fontSize="medium" /> }
          </IconButton>
          {upvotes-downvotes+".3천"  /*fShortenNumber(likes)*/}
          <VoteButtonAnimate onClick={handleToggleDownvote}>
            {isDownvoted ? <ArrowCircleDownTwoToneIcon sx={{ fontSize:40, color: pink[500] }} /> : <ArrowCircleDownIcon fontSize="medium" /> }
          </VoteButtonAnimate>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick={handleToggleFavorited}>
            {isFavorited ? <BookmarkIcon /> : <BookmarkBorderIcon/>}
          </IconButton>
          <IconButton onClick={handleShare}>
            <IosShareIcon />
          </IconButton>
        </Stack>

      </Stack>
    </Card>
  );
}
