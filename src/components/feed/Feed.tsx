// @mui
import { Stack } from '@mui/material';
// hooks
import { useEffect, useState } from 'react';
// components
import PostCard from '../post/PostCard';

// ----------------------------------------------------------------------

// interface Props {
//   posts: Post[];
// }

export default function Feed(/*{ posts }: Props*/) {
  return (
    <div>
      <Stack spacing={2}>
        <PostCard/>
        <PostCard/>
        <PostCard/>
        <PostCard/>
        {/* {posts.map((post) => (
          <PostCard 
            key={post.id} 
            post={post} 
            />
        ))} */}
      </Stack>
    </div>
  )
}
