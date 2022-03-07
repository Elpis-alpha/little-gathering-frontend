import { getPost } from '../../../source/api';

import PostForm from '../../../source/components/edit-post/PostForm'

import HeadTag from '../../../source/components/general/HeadTag'


const PostPage = ({ post, owner }) => {

  return (

    <>

      <HeadTag />

      <PostForm post={post} owner={owner} />

    </>

  )

}

export const getServerSideProps = async ({ params }) => {

  const postID = params.postID

  const response = await fetch(getPost(postID))

  const data = await response.json()


  return {

    props: { ...data }

  }

}

export default PostPage
