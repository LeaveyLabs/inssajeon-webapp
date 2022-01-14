// @mui
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import Feed from 'src/components/feed/Feed';
//firebase
import { DataQuery, PostOrder } from '../../db/apis/DataQuery';
// components
import Page from '../Page';
// ----------------------------------------------------------------------

export default function WordsPage() {

  const { id } = useParams();

  const queryGenerator = (id:string|undefined) => async function getNewPosts() {
    try {
      if (id === undefined) return [];
      return await DataQuery.searchPostByWord(id, PostOrder.Trendscore);
    } catch (error) {
      console.log(error);
    }
  };

  let [queryCall, setQueryCall] = useState(() => queryGenerator(id));
  
  useEffect(() => {
    setQueryCall(() => queryGenerator(id));
  }, [id]);

  return (
    <Page title="단어 또는 표현">
      <Feed getNewPosts={queryCall} />
    </Page>
  );
}
