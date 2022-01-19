// @mui
import Feed from 'src/components/feed/Feed';
//firebase
import { DataQuery, PostOrder } from '../../db/apis/DataQuery';
// components
import Page from '../Page';
// ----------------------------------------------------------------------

export default function HomePage() {
  async function getNewPosts() {
    try {
      return await DataQuery.getAllPosts(PostOrder.Trendscore);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Page title="홈">
      <Feed getNewPosts={getNewPosts} />
    </Page>
  );
}
