import HeadTag from '../source/components/general/HeadTag'

import PostHolder from '../source/components/index/PostHolder'

import { postList, postComments } from '../source/api'


const HomePage = ({ posts }) => {

  return (

    <>

      <HeadTag />

      <PostHolder posts={posts} />

    </>

  )

}

export const getServerSideProps = async () => {

  const postsResponse = await fetch(postList(0, 10))

  const posts = await postsResponse.json()

  posts.forEach(post => {

    post.readMore = post.text.length > 500

    post.fullText = post.text

    post.text = (post.text.slice(0, 500) + (post.readMore ? '...' : ''))

  });

  return {

    props: { posts }

  }

}


export default HomePage
