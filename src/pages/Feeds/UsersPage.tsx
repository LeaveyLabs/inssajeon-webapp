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

export default function UsersPage() {
  async function getNewPosts() {
    try {
      return await DataQuery.getAllPosts(PostOrder.Trendscore); //TODO change
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Page title="사용자들">
      <Feed getNewPosts={getNewPosts} />
    </Page>
  );
}