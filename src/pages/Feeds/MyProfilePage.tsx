// @mui
import Feed from 'src/components/feed/Feed';
//firebase
import { DataQuery, PostOrder } from '../../db/apis/DataQuery';
// components
import Page from '../Page';
// ----------------------------------------------------------------------

export default function MyProfilePage() {
  async function getNewPosts() {
    try {
      return await DataQuery.getAllPosts(PostOrder.Trendscore); //TODO change
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Page title="내 프로필">
      <Feed getNewPosts={getNewPosts} />
    </Page>
  );
}
