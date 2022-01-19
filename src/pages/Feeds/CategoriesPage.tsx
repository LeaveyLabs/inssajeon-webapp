// @mui
import Feed from 'src/components/feed/Feed';
//firebase
import { DataQuery, PostOrder } from '../../db/apis/DataQuery';
// components
import Page from '../Page';
// ----------------------------------------------------------------------

export default function CategoriesPage() {
  
  async function getNewPosts(lastPage: any ) {
    try {
      return await DataQuery.getAllPosts(PostOrder.Trendscore, lastPage);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Page title="cateogires?????? wut">
      <Feed getNewPosts={getNewPosts} />
    </Page>
  );
}
