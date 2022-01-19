// @mui
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Feed from 'src/components/feed/Feed';
import PostCard, { PostCardType } from 'src/components/post/PostCard';
import { PostEntity } from 'src/db/entities/posts/PostEntity';
//firebase
import { DataQuery, PostOrder } from '../../db/apis/DataQuery';
// components
import Page from '../Page';
// ----------------------------------------------------------------------

export default function PostPage() {
  const [pagePost, setPagePost] = useState<PostEntity | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  async function getPagePost() {
    try {
      if (!id) return [];
      const pagePost = await DataQuery.searchPostByPostID(id);
      console.log(id)
      console.log(pagePost);
      if (pagePost.length !== 0) {
        setPagePost(pagePost[0]);
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    getPagePost();
  }, [id])

  async function getNewPosts(lastPage: any ) {
    try {
      let remainingPosts = await DataQuery.getAllPosts(PostOrder.Trendscore, lastPage);
      let remainingPostsWithoutPagePost = remainingPosts.filter(post => {
        return post.postID !== pagePost?.postID
      })
      return remainingPostsWithoutPagePost;
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Page title={pagePost ? `${pagePost.word}` : "결과 없음"}> 
      {!loading && pagePost ? 
        <PostCard postCardType={PostCardType.floatToTop} key={pagePost.postID} post={pagePost} />
      : 
        <div>
          cant find dat post
        </div>
      }
      <Feed getNewPosts={getNewPosts} />
    </Page>
  );
}
