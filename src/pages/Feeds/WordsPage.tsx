// @mui
import { useParams } from 'react-router';
import Feed from 'src/components/feed/Feed';
//firebase
import { DataQuery, PostOrder } from '../../db/apis/DataQuery';
// components
import Page from '../Page';
// ----------------------------------------------------------------------

export default function WordsPage() {

  const { id } = useParams();
  console.log(id);

  async function getNewPosts() {
    try {
      if (id === undefined) return [];
      return await DataQuery.searchPostByWord(id, PostOrder.Trendscore);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Page title="단어 또는 표현">
      <Feed getNewPosts={getNewPosts} />
    </Page>
  );
}
