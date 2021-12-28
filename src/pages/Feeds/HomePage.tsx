// @mui
import { Container, Typography, Stack } from '@mui/material';
// hooks
import { useEffect, useState } from 'react';
// components
import Page from '../../components/Page';
import Feed from 'src/components/feed/Feed';
//firebase
import firebaseApp from 'src/firebase';
import { query, orderBy, limit, collection, getFirestore, getDocs, where } from "firebase/firestore";
const database = getFirestore(firebaseApp)

// ----------------------------------------------------------------------


export default function HomePage() {

  const [posts, setPosts] = useState([]);

  function handleClick() {
    getNewPosts()
  }

  useEffect(() => {
    getNewPosts()
  }, []) //just execute on first render for now

  async function getNewPosts() {
    // try {
    //   const postsRef = collection(database, "posts")//.withConverter(postConverter); TODO ADD THIS BACK IN WHEN USING KEVINS ENTITIES
    //   const q = query(postsRef, where("upvotes","<",10000), orderBy("upvotes"), limit(10));
    //   const querySnapshot = await getDocs(q);
    //   querySnapshot.forEach((doc) => {
    //     // console.log(doc.id, " => ", doc.data().word); // doc.data() is never undefined for query doc snapshots
    //     setPosts(prevPosts => {
    //       return [...prevPosts, doc.data()]
    //     })
    //   })
    // } catch (e) {
    //   console.log('error! look here: ' + e)
    // } finally {
    //   //TODO turn off loading
    // }
  }

  return (
    <Page title="홈">
      {/* pass the posts from firebase into the feed below */}
      {/* pass a function like "onRequestMorePosts" */}
      {/* also pass a function like onUpvote, onDownvote, etc? */}
      <Feed/>
    </Page>
  );
}
