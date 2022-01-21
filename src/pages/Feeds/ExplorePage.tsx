// @mui
import Feed from 'src/components/feed/Feed';
//firebase
import { DataQuery, PostOrder } from '../../db/apis/DataQuery';
// components
import Page from '../Page';
// ----------------------------------------------------------------------

export default function ExplorePage() {
  async function getNewPosts(lastPage: any ) {
    try {
      return await DataQuery.getAllPosts(PostOrder.Trendscore, lastPage); //TODO change
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Page title="법주별">
      <Feed getNewPosts={getNewPosts} />
    </Page>
  );
}
