import HeadTag from '../source/components/general/HeadTag'

import SignupFormComp from '../source/components/signup/SignupFormComp'



const SignUpPage = () => {

  return (

    <>

      <HeadTag title="Sign Up" description="Join Little Gathering and interact with lots of users by dropping posts and comments. Please enter your details" ogImage='-auth' />

      <SignupFormComp />

    </>

  )

}


export default SignUpPage
