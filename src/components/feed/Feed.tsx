// @mui
import { Stack } from '@mui/material';
// hooks
import { useEffect, useState } from 'react';
//https://www.npmjs.com/package/react-infinite-scroll-component
import InfiniteScroll from "react-infinite-scroll-component";
import { usePrevious } from 'src/hooks/usePrevious';
// database entities
import { PostEntity } from '../../db/entities/posts/PostEntity';
// components
import PostCard from '../post/PostCard';
import NoPostsCard from './NoPostsCard';
import PostSkeleton from './PostSkeleton';

// ----------------------------------------------------------------------

interface Props {
  getNewPosts: () => Promise<PostEntity[] | undefined>
}

export default function Feed( { getNewPosts }: Props ) {
  let [posts, setPosts] = useState<PostEntity[]>();
  let [isLoading, setIsLoading] = useState(true);

  async function fetchPosts() {
    try {
      let referenceToLastPage = lastPage;
      const newPosts : PostEntity[] | undefined = await getNewPosts(referenceToLastPage); //referenceToLastPage is modified appropriately in getNewPosts
      console.log("ref to last page");console.log(referenceToLastPage);
      setLastPage(referenceToLastPage);
      if (newPosts && newPosts.length > 0) {
        if(loadedPosts.length > 0) {
          setLoadedPosts( [...loadedPosts, ...newPosts] );
        } else {
          setLoadedPosts([...newPosts]);
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

  useEffect(() => {
    loadPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //if user was already on this page and is now searching for a new word
  useUpdateEffect(() => {
    //reset all data
    setLoadedPosts([]);
    setRenderedPosts([]);
    setIsLoading(true);
    setHasMore(true);
    setLastPage([]);
  }, [getNewPosts])

  //when lastPage is reset to 0, load more posts
  useUpdateEffect(() => {
    console.log('useupdateeffect on last page')
    if (lastPage.length === 0) {
      loadPosts();
    }
    updatePostFetching();
  }, [getNewPosts])

  useEffect(() => { //sort posts -- TODO change this when we stop reading "all posts from firebase" at once
    if (posts) {
      posts.sort((a: PostEntity, b: PostEntity) => {
        return a.metrics.trendscore - b.metrics.trendscore; //return negative value if first element is smaller. smaller elements first
      })
    }
  }, [posts])

  //TODO code to handle rendering another 10 posts as user scrolls down (should be able to find this online)
  //TODO look into lists vs stack: is stack really the best way to display posts as you scroll down?
  return (
    <>
      {isLoading ? 
        <Stack spacing={2}>
          <PostSkeleton/>
          <PostSkeleton/>
          <PostSkeleton/>
          <PostSkeleton/>
          <PostSkeleton/>
        </Stack>
      : posts ?
        <Stack spacing={2}>
          {posts.map((post: PostEntity) => (<PostCard key={post.postID} post={post} /> ))}
        </Stack>
      :
      <NoPostsCard/>
      }
    </>
  )
}