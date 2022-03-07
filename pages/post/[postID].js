import { getPost } from '../../source/api'

import HeadTag from '../../source/components/general/HeadTag'

import Post from '../../source/components/individual/Post'


const IndividualPostPage = ({ data }) => {

  return (

    <>

      <HeadTag title={data.post.title} description={data.post.text} />

      <Post post={data.post} owner={data.owner} comments={data.comments} />

    </>

  )

}

export const getServerSideProps = async ({ params }) => {

  const postID = params.postID

  const response = await fetch(getPost(postID))

  const data = await response.json()


  return {

    props: { data }

  }

}


export default IndividualPostPage
