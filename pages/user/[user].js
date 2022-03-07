import HeadTag from "../../source/components/general/HeadTag"

import UserComp from "../../source/components/user/UserComp"
import { getUserbyEmail, getUserbyID } from "../../source/api"



const UserPage = ({ user, posts, comments }) => {

  return (

    <>

      <HeadTag />

      <UserComp user={user} posts={posts} comments={comments} />

    </>

  )

}


export const getServerSideProps = async ({ params }) => {

  const email = params.user

  const dataResponse = await fetch(getUserbyEmail(email))

  const data = await dataResponse.json()

  return {

    props: { ...data }

  }

}


export default UserPage
