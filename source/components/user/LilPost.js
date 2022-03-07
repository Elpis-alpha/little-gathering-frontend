import Link from "next/link"
import styled from "styled-components"

const LilPost = ({ post }) => {

  return (

    <PostStyle>

      <Link href={`/post/${post._id}`}><a>

        <div className="title">{post.title}</div>

        <div className="text">{post.text}</div>

        <div className="over-f"></div>

      </a></Link>

    </PostStyle>

  )

}

const PostStyle = styled.div`
  background-color: #f4f4f4;
  padding: 1rem;
  display: block;
  margin-bottom: 1rem;
  border-radius: 1rem;
  box-shadow: 0 0 5px 0 white ;
  transform: scale(1);
  transition: transform .5s;

  .title{
    font-size: 1rem;
    font-weight: bold;
  }

  .text{
    max-height: 4.8rem;
    overflow: hidden;
    white-space: pre-wrap;
  }

  .over-f{
    max-height: 3rem;
    height: 100%;
    width: 100%;
    position: absolute;
    bottom: 0; left: 0;
    background-color: #b3b3b3;
    background: linear-gradient(to bottom, transparent, #f4f4f4);
  }

  a{
    text-decoration: none;
    color: inherit;
    display: block;
  }

  &:hover{
    transform: scale(1.03);
  }
`

export default LilPost