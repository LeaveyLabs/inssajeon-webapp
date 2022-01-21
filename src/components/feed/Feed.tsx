// @mui
import { Stack } from '@mui/material';
import { DocumentData, DocumentSnapshot } from 'firebase/firestore';
// hooks
import { useEffect, useState } from 'react';
//https://www.npmjs.com/package/react-infinite-scroll-component
import InfiniteScroll from "react-infinite-scroll-component";
import { usePrevious } from 'src/hooks/usePrevious';
// database entities
import { PostEntity } from '../../db/entities/posts/PostEntity';
import { useUpdateEffect } from '../../hooks/useUpdateEffect';
// components
import PostCard from '../post/PostCard';
import NoPostsCard from './NoPostsCard';
import PostSkeleton from './PostSkeleton';

// ----------------------------------------------------------------------

interface Props {
  getNewPosts: (lastPage: DocumentSnapshot<DocumentData>[]) => Promise<PostEntity[] | undefined>
}
/*
BUSINESS LOGIC
Feed initially loads in LOAD_AMOUNT posts into loadedPosts
then immediately moves RENDER_INTERVAL_INITIAL posts from loadedPosts into renderedPosts
as the user scrolls and there are only RENDER_INTERVAL posts left until the end of the screen is reached, move RENDER_INTERVAL posts from loadedPosts into renderedPosts
as the user scrolls and there are only LOAD_INTERVAL posts remaining in loadPosts, then load in LOAD_AMOUNT posts into loadPosts
*/

const RENDER_INTERVAL: number = 10; //render new posts when there are only RENDER_INTERVAL rendered posts left
const RENDER_INTERVAL_INITIAL: number = 20; //render new posts when there
const LOAD_INTERVAL: number = 50; //load new posts when there are only LOAD_INTERVAL loaded posts left
//getNewPosts is paginated on an inteval of 500 posts

export default function Feed( { getNewPosts }: Props ) {
  const [loadedPosts, setLoadedPosts] = useState<PostEntity[]>([]);
  const prevLoadedPosts : PostEntity[] | undefined = usePrevious(loadedPosts);
  const [renderedPosts, setRenderedPosts] = useState<PostEntity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [lastPage, setLastPage] = useState<DocumentSnapshot<DocumentData>[]>([]);

  const loadPosts = async () => {
    console.log("loading posts")
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
        console.log(newPosts.length + " new posts just loaded in:");
      } else {
        throw(new Error("No posts returned from database!"));
      }
    } catch(error) {
      console.log("couldnt get any more posts!");
      setHasMore(false); //communicate to InfiniteScroll that we couldnt load in any more posts
    } finally {
      setIsLoading(false);
    }
  }
  
  //take posts from loadedPosts into renderedPosts
  const renderMorePosts = () => {
    //renderPosts should never be called when there are no more loadedPosts to render
    if (loadedPosts.length === 0) return;

    console.log("will render" + RENDER_INTERVAL + " of these loadedPosts: " );
    //take posts from loadedPosts
    const splicedLoadedPosts = loadedPosts.splice(0, RENDER_INTERVAL);
    setRenderedPosts((prevState : PostEntity[] | undefined) =>  {
      if (!prevState || prevState.length === 0) {
        return splicedLoadedPosts;
      } else {
        return [...prevState, ...splicedLoadedPosts];
      }
    });
    //update loadedPosts now that theyve been sliced
    setLoadedPosts(loadedPosts);
  }

  //getMorePosts gives the infinite scroll more posts
  async function getMorePosts() {
    if (loadedPosts.length === 0) { 
      console.log("gmp1")
      //we dont have any posts, so load our first batch in
      await loadPosts();
    } else if (loadedPosts.length < LOAD_INTERVAL) {
      console.log("gmp2")
      //we are running low on loaded posts. first, lets render more posts on the screen 
      renderMorePosts();
      //now, lets start the async function to load a new batch of posts
      setIsLoading(true);
      await loadPosts();
    } else {
      console.log("gmp3")
      //we already have enough loaded posts, so just render more
      renderMorePosts();
    }
  }

  //loadPosts on page mount
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
  }, [lastPage])

  useUpdateEffect(() => {
    //if we have loaded posts AND beforehand we either had fewer or none, then renderMorePosts!
    if (loadedPosts.length > 0 && (!prevLoadedPosts || loadedPosts.length > prevLoadedPosts.length) ) {
      renderMorePosts();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedPosts])

  return (
    <>
      {renderedPosts.length > 0 ? //NOTICE if InfiniteScroll is taken out of this if statement and rendered immediately, then the useEffect on mount which calls loadPosts() must be deleted
        <InfiniteScroll
          dataLength={renderedPosts.length}
          next={getMorePosts}
          hasMore={hasMore}
          loader={<h4>로딩 중</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>노머 게시물</b>
            </p>
          }
        >
          {renderedPosts.map((post: PostEntity) => (<PostCard key={post.postID} post={post} /> ))}
        </InfiniteScroll>
      : !isLoading &&
        <NoPostsCard/>
      } 
      {isLoading && 
        <Stack spacing={2}>
          <PostSkeleton/>
          <PostSkeleton/>
          <PostSkeleton/>
          <PostSkeleton/>
        </Stack>
      }
    </>
  )
}



        //sort newPosts by trendscore
        //***** currently we dont need to sort because incoming data is already sorted */
        // newPosts.sort((a: PostEntity, b: PostEntity) => {
        //   return a.metrics.trendscore - b.metrics.trendscore; //return negative value if first element is smaller. smaller elements first
        // })