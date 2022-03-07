import { useEffect, useRef, useState } from "react"

import { Grid } from "react-loader-spinner"

import styled from "styled-components"

import { getUserPicture } from "../../api"

import { datetoTimeStr } from "../../controllers/TimeCtrl"

import Link from "next/link"


const Comment = ({ comment, owner }) => {

  const userImageRef = useRef(null)

  const [imageItem, setimageItem] = useState(undefined)

  const createDate = new Date(comment.createdAt)

  // Fix user image
  useEffect(async () => {

    // Fetch user Images
    const userImage = new Image()

    userImage.src = getUserPicture(comment.owner)

    userImage.onload = () => {

      try {

        userImage.alt = comment.name

        setimageItem(true)

        userImageRef.current.innerHTML = ''

        userImageRef.current.appendChild(userImage)

      } catch (error) {

        console.log(error);

      }

    }

    userImage.onerror = () => {

      const avatarImage = new Image()

      avatarImage.src = '/images/avatar-small.png'

      avatarImage.onload = () => {

        try {

          avatarImage.alt = 'avatar'

          setimageItem(true)

          userImageRef.current.innerHTML = ''

          userImageRef.current.appendChild(avatarImage)

        } catch (error) {

          console.log(error);

        }

      }

    }

  }, [])

  return (

    <CommentStyle>

      <div className="comment-boxH">

        <div className="user-image" ref={userImageRef}>

          {imageItem === undefined && <Grid height="100%" width="100%" color="#7c7c7c" wrapperStyle={{ transform: "scale(.8)" }} />}

        </div>

        <div className="comment-det">

          <div className="comment-content">{comment.text}</div>

          <div className="other-func">

            <div className="func"></div>

            <div className="details">

              <div className="commenter-email"><Link href={`/user/${owner.email}`}><a> - {owner.email}</a></Link></div>

              <div className="comment-stamp">{datetoTimeStr(createDate)} on {`${createDate.getDate()}/${createDate.getMonth()+1}/${createDate.getFullYear()}`}</div>

            </div>

          </div>

        </div>

      </div>

    </CommentStyle>

  )

}

const CommentStyle = styled.div`

  margin-left: 2rem;
  padding: .5rem 0;
  display: block;
  border-bottom: 1px solid #f0f0f0;

  
  .comment-boxH{

    &{
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }

    .user-image{
      width: 3rem;
      height: 3rem;
      display: inline-block;
      
      img{
        width: 100%;
        height: 100%;
        border-radius: 1rem;
        object-fit: cover;
      }
    }

    .comment-det{
      flex: 1;
      padding-left: 1rem;

      .comment-content{
        padding-bottom: 1rem;

        button{
          display: inline-block;
          padding-left: .5rem;
          border-radius: .25rem;
          border: 0 none;
          outline: 0 none;
          background-color: transparent;
          cursor: pointer;
          color: blue;

          &:hover{
            text-decoration: underline;
          }
        }
      }

      .other-func{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        position: absolute;
        bottom: 0; left: 0;
        padding-left: 1rem;

        .details{
          display: flex;

          a{
            color: #6a6aff;
            display: inline-block;
            padding-right: 0.5rem;

            &:hover{text-decoration: underline;}
          }
        }

      }

      .func{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        
        .func-icon{
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          width: 1rem;
          height: 1rem;
          padding: 0.1rem;
          margin-right: .5rem;
          transition: transform .5s;

          &:hover{
            transform: scale(1.2);
          }
        }
      }

    }

  }

  &:last-of-type{
    border: 0 none;
  }
`

export default Comment //  250
