// @mui
import Feed from 'src/components/feed/Feed';
//firebase
import { DataQuery, PostOrder } from '../../db/apis/DataQuery';
// components
import Page from '../Page';
// ----------------------------------------------------------------------

export default function ExplorePage() {
  async function getNewPosts() {
    try {
      return await DataQuery.getAllPosts(PostOrder.Trendscore); //TODO change
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Page title="explore?????? wut">
      <Feed getNewPosts={getNewPosts} />
    </Page>
  );
}
