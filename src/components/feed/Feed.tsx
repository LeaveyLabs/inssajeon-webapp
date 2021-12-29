// @mui
import { Stack } from '@mui/material';
// hooks
import { useEffect, useState } from 'react';
// components
import PostCard from '../post/PostCard';
// database entities
import { PostEntity } from '../../db/entities/posts/PostEntity';

// ----------------------------------------------------------------------

interface Props {
  getNewPosts: () => Promise<PostEntity[] | undefined>
}

export default function Feed( { getNewPosts }: Props ) {
  let [posts, setPosts] = useState<PostEntity[]>(
    
  );

  useEffect(() => {
    async function fetchPosts() {
      try {
        let newPosts: PostEntity[] | undefined = await getNewPosts();
        if (newPosts !== undefined) {
          if(posts !== undefined ) {
            setPosts( [...posts, ...newPosts] );
          }
          else {
            setPosts([...newPosts]);
          }
        }
        if(newPosts === undefined) {
          throw(new Error("No posts returned from database!"));
        }
      } catch(error) {
        console.error(error);
        //TODO log errors to some separate database
      }
    }

    fetchPosts()
    //setIsLoading(false)
  }, []); //TODO call useEffect to query more posts whenever almost all posts have been rendered

  //TODO code to handle rendering another 10 posts as user scrolls down


  //TODO loading posts graphics on initial feed mount
  return (
    <div>
      <Stack spacing={2}>
        {posts !== undefined 
          ? 
          posts.map((post: PostEntity) => (
            <PostCard 
              key={post.postID} 
              post={post} 
              />
              ))
          : <div>there are neo posts!</div>
        }
      </Stack>
    </div>
  )
}
