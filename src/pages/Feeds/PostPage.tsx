// @mui
import { Container, Typography, Stack } from '@mui/material';
// hooks
import { useEffect, useState } from 'react';
// components
import Page from '../../components/Page';
import Feed from 'src/components/feed/Feed';
//firebase
import { DataQuery, PostOrder } from '../../db/apis/DataQuery';
// ----------------------------------------------------------------------

export default function PostPage() {
  async function getNewPosts() {
    try {
      return await DataQuery.getAllPosts(PostOrder.Trendscore); //TODO change
    } catch (error) {
      console.log(error)
    }
  }

  //TODO insert the word of this post into title below
  return (
    <Page title="게시물">
      <Feed getNewPosts={getNewPosts} />
    </Page>
  );
}