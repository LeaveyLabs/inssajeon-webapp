import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleDownTwoToneIcon from '@mui/icons-material/ArrowCircleDownTwoTone';
// @mui
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleUpTwoToneIcon from '@mui/icons-material/ArrowCircleUpTwoTone';
import { Box, Typography } from '@mui/material';
import { green, pink } from '@mui/material/colors';
import { useState } from 'react';
//utils
import { fDecimal } from 'src/utils/formatNumber';
// // components
import VoteButtonAnimate from '../animate/VoteButtonAnimate';

// interface Props
//   post: Post;
// }

export default function VotePanel(/*{ post }: Props*/) {
  //const { user } = useAuth();
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);

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
    <>
      <Box sx={{display: 'flex', justifyContent:'center', height:30, width:30 }}>
        <VoteButtonAnimate onClick={handleToggleUpvote}>
          {isUpvoted ? <ArrowCircleUpTwoToneIcon sx={{ fontSize:35, color: green[500] }}/> : <ArrowCircleUpIcon sx={{}}fontSize="medium" /> }
        </VoteButtonAnimate>
      </Box>
      <Box sx={{display: 'flex', justifyContent:'center', alignItems:'center', height:40, width:'auto', minWidth:25, marginX:'3px' }}>
        <Typography >
          {fDecimal(upvotes-downvotes)  /*fShortenNumber(likes)*/}
        </Typography>
      </Box>
      <Box sx={{display: 'flex', justifyContent:'center', height:30, width:30, }}>
        <VoteButtonAnimate onClick={handleToggleDownvote} >
          {isDownvoted ? <ArrowCircleDownTwoToneIcon sx={{ fontSize:35, color: pink[500] }} /> : <ArrowCircleDownIcon fontSize="medium" /> }
        </VoteButtonAnimate>
      </Box>
    </>
  );
}
