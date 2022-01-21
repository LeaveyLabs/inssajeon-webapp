// @mui
import { useState } from 'react';
import { useParams } from 'react-router';
import Feed from 'src/components/feed/Feed';
import { useUpdateEffect } from 'src/hooks/useUpdateEffect';
//firebase
import { DataQuery, PostOrder } from '../../db/apis/DataQuery';
// components
import Page from '../Page';
// ----------------------------------------------------------------------

const queryGenerator = (id:string|undefined) => async function getNewPosts(lastPage: any) {
  try {
    if (id === undefined) return [];
    return await DataQuery.searchPostByWord(id, PostOrder.Trendscore, lastPage);
  } catch (error) {
    console.log(error);
  }
};

export default function WordsPage() {
  const { id } = useParams();
  let [wordQueryCall, setWordQueryCall] = useState(() => queryGenerator(id));

  useUpdateEffect(() => {
    setWordQueryCall(() => queryGenerator(id));
  }, [id]);

  return (
    <Page title="단어 또는 표현">
      <Feed getNewPosts={wordQueryCall} />
    </Page>
  );
}
