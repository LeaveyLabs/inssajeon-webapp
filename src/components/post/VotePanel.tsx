import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleDownTwoToneIcon from '@mui/icons-material/ArrowCircleDownTwoTone';
// @mui
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleUpTwoToneIcon from '@mui/icons-material/ArrowCircleUpTwoTone';
import { Box, Typography } from '@mui/material';
import { green, pink } from '@mui/material/colors';
import { useState } from 'react';
import { PostInteraction } from 'src/db/apis/PostInteraction';
import { PostEntity } from 'src/db/entities/posts/PostEntity';
import useAuth from 'src/hooks/useAuth';
//utils
import { fDecimal } from 'src/utils/formatNumber';
// // components
import VoteButton from './VoteButton';
import TransitionAlert from '../auth/TransitionAlert';
import { useSignupDialog } from 'src/layouts/dashboard';

interface VotePanelProps {
  post: PostEntity;
}

export default function VotePanel( {post} : VotePanelProps) {
  const { authedUser } = useAuth();
  const [isVoting, setIsVoting] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [upvotes, setUpvotes] = useState(post.upvotes.length);
  const [downvotes, setDownvotes] = useState(post.downvotes.length);
  const [isUpvoted, setIsUpvoted] = useState(authedUser ? post.upvotes.includes(authedUser.nonauth.id) : false);
  const [isDownvoted, setIsDownvoted] = useState(authedUser ? post.downvotes.includes(authedUser.nonauth.id) : false);
  const handleSignupDialogOpen = useSignupDialog();
  
  const handleToggleUpvote = async () => {
    setIsVoting(true);
    if (!authedUser) {
      handleSignupDialogOpen()
    } else if (isUpvoted) { //unupvote
      try {
        setIsUpvoted(false);
        setUpvotes((prevUpvotes) => prevUpvotes - 1);
        await PostInteraction.unvotePost(authedUser.nonauth.id, post.postID);
      } catch (error: any) {
        setIsAlert(true)
        console.error(error.message)
      }
    }
    else if (isDownvoted) { //undownvote and upvote
      try {
        setIsDownvoted(false);
        setDownvotes((prevDownvotes) => prevDownvotes - 1);
        setIsUpvoted(true);
        setUpvotes((prevUpvotes) => prevUpvotes + 1);
        await PostInteraction.unvotePost(authedUser.nonauth.id, post.postID);
        await PostInteraction.upvotePost(authedUser.nonauth.id, post.postID);
      } catch (error: any) {
        setIsAlert(true)
        console.error(error.message)
      }
    }
    else { //upvote
      try {
        setUpvotes((prevUpvotes) => prevUpvotes + 1);
        setIsUpvoted(true);
        await PostInteraction.upvotePost(authedUser.nonauth.id, post.postID);
      } catch (error: any) {
        setIsAlert(true)
        console.error(error.message)
      }
    }
    setIsVoting(false);
  }

  const handleToggleDownvote = async () => {
    setIsVoting(true);
    if (!authedUser) {
      handleSignupDialogOpen()
    } else  if (isDownvoted) { //undownvote
      try {
        setIsDownvoted(false);
        setDownvotes((prevDownvotes) => prevDownvotes - 1);
        await PostInteraction.unvotePost(authedUser.nonauth.id, post.postID);
      } catch (error: any) {
        setIsAlert(true)
        console.error(error.message)
      }
    }
    else if (isUpvoted) { //unupvote and downvote
      try {
        setIsUpvoted(false);
        setUpvotes((prevUpvotes) => prevUpvotes - 1);
        setIsDownvoted(true);
        setDownvotes((prevDownvotes) => prevDownvotes + 1);
        await PostInteraction.unvotePost(authedUser.nonauth.id, post.postID);
        await PostInteraction.downvotePost(authedUser.nonauth.id, post.postID);
      } catch (error: any) {
        setIsAlert(true)
        console.error(error.message)
      }
    }
    else { //downvote
      try {
        setIsDownvoted(true);
        setDownvotes((prevDownvotes) => prevDownvotes + 1);
        await PostInteraction.downvotePost(authedUser.nonauth.id, post.postID);
      } catch (error: any) {
        setIsAlert(true)
        console.error(error.message)
      }
    }
    setIsVoting(false);
  }

  return (
    <>
      <Box sx={{display: 'flex', justifyContent:'center', height:30, width:30 }}>
        <VoteButton disabled={isVoting} onClick={handleToggleUpvote}>
          {isUpvoted ? <ArrowCircleUpTwoToneIcon sx={{ fontSize:35, color: green[500] }}/> : <ArrowCircleUpIcon fontSize="medium" /> }
        </VoteButton>
      </Box>
      <Box sx={{display: 'flex', justifyContent:'center', alignItems:'center', height:40, width:'auto', minWidth:25, marginX:'3px' }}>
        <Typography >
          {fDecimal(upvotes-downvotes)}
        </Typography>
      </Box>
      <Box sx={{display: 'flex', justifyContent:'center', height:30, width:30, }}>
        <VoteButton disabled={isVoting} onClick={handleToggleDownvote} >
          {isDownvoted ? <ArrowCircleDownTwoToneIcon sx={{ fontSize:35, color: pink[500] }} /> : <ArrowCircleDownIcon fontSize="medium" /> }
        </VoteButton>
      </Box>
      {isAlert &&
        <TransitionAlert errorMessage={"오류가 발생했습니다."} onClose={()=>setIsAlert(false)} sx={{ ml: 2 }}/>
      }
    </>
  );
}
