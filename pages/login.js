import HeadTag from '../source/components/general/HeadTag'

import LoginFormComp from '../source/components/login/LoginFormComp'


const LoginPage = () => {

  return (

    <>

      <HeadTag title="Welcome back" description="A lot have happened since you left! Kindly enter your details to log in" ogImage='-auth' />

      <LoginFormComp />

    </>

  )

}


export default LoginPage
