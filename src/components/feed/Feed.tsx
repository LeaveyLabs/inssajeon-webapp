// @mui
import { Stack } from '@mui/material';
// hooks
import { useEffect, useState } from 'react';
// components
import PostCard from '../post/PostCard';
import NoPostsCard from './NoPostsCard';
import PostSkeleton from './PostSkeleton';
// database entities
import { PostEntity } from '../../db/entities/posts/PostEntity';

// ----------------------------------------------------------------------

interface Props {
  getNewPosts: () => Promise<PostEntity[] | undefined>
}

export default function Feed( { getNewPosts }: Props ) {
  let [posts, setPosts] = useState<PostEntity[]>();
  let [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        let newPosts: PostEntity[] | undefined = await getNewPosts();
        setIsLoading(false)
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
  }, []); //TODO call useEffect to query more posts whenever almost all posts have been rendered

  //TODO code to handle rendering another 10 posts as user scrolls down (should be able to find this online)

  //TODO look into lists vs stack: is stack really the best way to display posts as you scroll down?
  return (
    <div>
      {isLoading ? 
        <Stack spacing={2}>
          <PostSkeleton/>
          <PostSkeleton/>
          <PostSkeleton/>
          <PostSkeleton/>
          <PostSkeleton/>
        </Stack>
      :
        <Stack spacing={2}>
          {posts !== undefined 
            ? 
            posts.map((post: PostEntity) => (
              <PostCard 
                key={post.postID} 
                post={post} 
                />
                ))
            : 
            <NoPostsCard/>
          }
        </Stack>
      }
    </div>
  )
}
