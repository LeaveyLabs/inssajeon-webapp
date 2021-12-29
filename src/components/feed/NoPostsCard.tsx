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

// ----------------------------------------------------------------------

export default function NoPostsCard( ) {
  //const { user } = useAuth();

  // //notes on custom hook for menu
  // //https://github.com/jcoreio/material-ui-popup-state
  // return (
  //   <Card >
  //     <Box sx={{ px:2, height:60, display:'flex', flexDirection: "row", alignItems:"center", justifyContent:"center", }}>
  //       <AccountCircleIcon sx={{mx:1}} />
  //       <Link to={`/users/102984019284091`} variant="subtitle1" color="text.primary" component={RouterLink}>
  //           {post.userProfile.username}
  //         </Link>
  //       <CircleIcon sx={{ color:'gray',fontSize: 4, ml:2 }}/>
  //       <Typography variant="caption" sx={{ mx:2,color: 'text.secondary' }}>
  //           {fDate((post.timestamp.toDate()))} {/*2일 전에 fDate(post.createdAt)*/}
  //       </Typography>
  //       <LocalFireDepartmentIcon sx={{ color: red[500] }}/>
  //       <Box sx={{ flexGrow: 1 }} />
  //       <PostMoreButton/>
  //     </Box>
  //     <Divider variant="middle" />
  //     <Stack spacing={3} sx={{ p: 3 }}>
  //       <Typography variant="h1">{post.word}</Typography>
  //       <Typography variant="body1">{post.definition}</Typography>
  //       <Typography variant="body3">{post.quote}</Typography>
  //     </Stack>
  //     <Box sx={{ p:2, height:60, display:'flex', flexDirection: "row", alignItems:"center", justifyContent:"center", }}>
  //       <VotePanel/>
  //       <Box sx={{ flexGrow: 1 }} />
  //       <IconButton onClick={handleToggleFavorited}>
  //         {isFavorited ? <BookmarkIcon /> : <BookmarkBorderIcon/>}
  //       </IconButton>
  //       {isMobile && 
  //         <IconButton sx={{}} onClick={handleMobileShare}>
  //           <IosShareIcon />
  //         </IconButton>}
  //       {!isMobile &&
  //         <DesktopCopyButton/>}
  //     </Box>
  //   </Card>
  // );
}
