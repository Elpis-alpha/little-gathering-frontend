import HeadTag from '../source/components/general/HeadTag'

import styled from "styled-components"


const PageNotFound = () => {

  return (

    <PageStyle>

      <HeadTag />

      <div className='nm'>

        <h1>Page Not Found</h1>

        <p>The page you requested for does not exist</p>

      </div>

    </PageStyle>

  )

}

const PageStyle = styled.div`

  .nm{
    text-align: center;
    padding-top: 10vh;

    h1{
      font-size: 2rem;
      line-height: 3rem;
      padding-bottom: 1rem;
    }
    p{
      font-size: 1rem;
    }
  }
`

export default PageNotFound
