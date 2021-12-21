import { useState, useRef } from 'react';
// @mui
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleUpTwoToneIcon from '@mui/icons-material/ArrowCircleUpTwoTone';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleDownTwoToneIcon from '@mui/icons-material/ArrowCircleDownTwoTone';
import { Container, Grid, Box, Typography } from '@mui/material';
import { green, pink } from '@mui/material/colors';

// // components
import VoteButtonAnimate from '../animate/VoteButtonAnimate';

// interface Props {
//   post: Post;
// }

export default function VotePanel(/*{ post }: Props*/) {
  //const { user } = useAuth();
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);
  const [upvotes, setUpvotes] = useState(100);
  const [downvotes, setDownvotes] = useState(5);

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

  return (
    <Box sx={{ display:'flex', flexDirection: "row", alignItems:"center", justifyContent:"center", }}>
      <VoteButtonAnimate onClick={handleToggleUpvote}>
        {isUpvoted ? <ArrowCircleUpTwoToneIcon sx={{ fontSize:35, color: green[500] }}/> : <ArrowCircleUpIcon fontSize="medium" /> }
      </VoteButtonAnimate>
      <Typography >
        {upvotes-downvotes+".3천"  /*fShortenNumber(likes)*/}
      </Typography>
      <VoteButtonAnimate onClick={handleToggleDownvote} >
        {isDownvoted ? <ArrowCircleDownTwoToneIcon sx={{ fontSize:35, color: pink[500] }} /> : <ArrowCircleDownIcon fontSize="medium" /> }
      </VoteButtonAnimate>
    </Box>
    // <Grid container spacing={2}>
    //   <Grid item xs={6} md={8}>
    //     <VoteButtonAnimate onClick={handleToggleUpvote}>
    //       {isUpvoted ? <ArrowCircleUpTwoToneIcon sx={{ fontSize:35, color: green[500] }}/> : <ArrowCircleUpIcon fontSize="medium" /> }
    //     </VoteButtonAnimate>
    //   </Grid>
    //   <Grid item xs={6} md={4}>
    //     {upvotes-downvotes+".3천"  /*fShortenNumber(likes)*/}
    //   </Grid>
    //   <Grid item xs={6} md={8}>
    //     <VoteButtonAnimate onClick={handleToggleDownvote}>
    //       {isDownvoted ? <ArrowCircleDownTwoToneIcon sx={{ fontSize:35, color: pink[500] }} /> : <ArrowCircleDownIcon fontSize="medium" /> }
    //     </VoteButtonAnimate>
    //   </Grid>
    // </Grid>
  );
}
