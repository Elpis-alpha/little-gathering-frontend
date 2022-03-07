import Link from "next/link"

import { useEffect, useRef, useState } from "react"

import styled from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { faComment, faPencil, faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons"

import { getUserPicture, likePost, dislikePost } from "../../api"

import { useSelector } from "react-redux"

import Cookies from 'universal-cookie'

import { datetoDateStr, datetoTimeStr } from "../../controllers/TimeCtrl"

import { Grid, Oval } from "react-loader-spinner"

import CommentHolder from "./CommentHolder"


const Post = ({ post, owner, comments }) => {

  const cookies = new Cookies()

  const token = cookies.get('user-token')

  const userImageRef = useRef(null)

  const { available, data } = useSelector(store => store.user)

  const [showCommentForm, setShowCommentForm] = useState("")

  const [likeLoader, setLikeLoader] = useState(false)

  const [dislikeLoader, setdislikeLoader] = useState(false)

  const [imageItem, setimageItem] = useState(undefined)

  const [likesNum, setLikesNum] = useState(post.likes)

  const [dislikesNum, setDislikesNum] = useState(post.dislikes)


  // Fix user image
  useEffect(async () => {

    // Fetch user Images
    const userImage = new Image()

    userImage.src = getUserPicture(owner._id)

    userImage.onload = () => {

      try {

        userImage.alt = owner.name

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


  const likePostHandler = async (e) => {

    if (!available) { return false }

    if (likeLoader) { return false }

    setLikeLoader(true)

    const likeResponse = await fetch(likePost(post._id), {

      method: 'PATCH',

      headers: {

        'Content-type': 'application/json',

        'Authorization': `Bearer ${token}`

      },

    })

    const likeData = await likeResponse.json()

    setLikesNum(likeData.likes)

    setDislikesNum(likeData.dislikes)

    setLikeLoader(false)

  }

  const dislikePostHandler = async (e) => {

    if (!available) { return false }

    if (dislikeLoader) { return false }

    setdislikeLoader(true)

    const dislikeResponse = await fetch(dislikePost(post._id), {

      method: 'PATCH',

      headers: {

        'Content-type': 'application/json',

        'Authorization': `Bearer ${token}`

      },

    })

    const dislikeData = await dislikeResponse.json()

    setDislikesNum(dislikeData.dislikes)

    setLikesNum(dislikeData.likes)

    setdislikeLoader(false)

  }

  const saySomethingHandler = () => {

    if (post._id === showCommentForm) {

      setShowCommentForm("")

    } else {

      setShowCommentForm(post._id)

    }

  }


  return (

    <PostStyle>

      <div className="post-holder">

        <div className="post-title">{post.title}</div>

        <div className="user-data">

          <div className="user-image" ref={userImageRef}>

            {imageItem === undefined && <Grid height="100%" width="100%" color="#7c7c7c" wrapperStyle={{ transform: "scale(.8)" }} />}

          </div>

          <Link href={`/user/${owner.email}`}><a>

            <div className="user-info">

              <div className="username">{owner.name}</div>

              <div className="email">{owner.email}</div>

            </div>

          </a></Link>

          <div className="post-stamp">

            <div className="time">{datetoTimeStr(new Date(post.createdAt))}</div>

            <div className="time">{datetoDateStr(new Date(post.createdAt))}</div>

          </div>

        </div>

        <div className="post-content">{post.text}</div>

        <div className="post-modifications">

          <div className="left-side">

            <div className="post-u-item" onClick={likePostHandler}>

              <>{likeLoader ?

                <><Oval height="calc(1.1rem - 6px)" width="1.1rem" color="black" secondaryColor="black" /></>

                :

                <>

                  <FontAwesomeIcon icon={faThumbsUp} className="li-icon" color={likesNum.includes(data._id) ? '#000' : '#7d7d7d'} />

                  <div>{likesNum.length}</div>

                </>
              }</>

            </div>

            <div className="post-u-item" onClick={dislikePostHandler}>

              <>{dislikeLoader ?

                <><Oval height="calc(1.1rem - 6px)" width="1.1rem" color="black" secondaryColor="black" /></>

                :

                <>

                  <FontAwesomeIcon icon={faThumbsDown} color={dislikesNum.includes(data._id) ? '#000' : '#7d7d7d'} className="li-icon" />

                  <div>{dislikesNum.length}</div>

                </>
              }</>

            </div>

            {available && (data.email === owner.email && <>

              <Link href={`/post/edit/${post._id}`}><a>

                <div className="post-edit">

                  <FontAwesomeIcon icon={faPencil} color="#3c79b7" />

                </div>

              </a></Link>

            </>)}

          </div>

          <div className="right-side">

            {available && <button className="reply" onClick={saySomethingHandler}><span>Say Something</span> <FontAwesomeIcon icon={faComment} height="1.2rem" /></button>}

          </div>

        </div>

        <div className="comments-holder"><CommentHolder comments={comments} showCommentForm={showCommentForm} setShowCommentForm={setShowCommentForm} owner={owner} _id={post._id} /></div>

      </div>

    </PostStyle>

  )

}

const PostStyle = styled.div`

  &{
    display: inline-block;
    padding: 1.5rem 2rem;
    width: 100%;
  }

  .post-holder{

    &{
      padding: 2rem;
      padding-bottom: 1rem;
      border-radius: 2rem;
      background: linear-gradient(145deg, #cacaca, #f0f0f0);
      box-shadow:  20px 20px 60px #bebebe,-20px -20px 60px #ffffff;
    }

    a{
      display: block;
      color: inherit;
      text-decoration: none;
    }

    .post-title{
      font-size: 1.5rem;
      font-weight: bold;
      line-height: 2rem;
      padding-bottom: .5rem;

      a{
        transition: color .5s;

        &:hover{
          color: #4b4b4b;
          text-decoration: underline;
        }
      }
    }

    .post-content{
      padding-bottom: 1rem;
      white-space: pre-wrap;
      
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

    .user-data{
      display: flex;
      justify-content: flex-start;
      padding-bottom: .5rem;

      .user-image{
        width: 4rem;
        height: 4rem;
        display: inline-block;

        img{
          width: 100%;
          height: 100%;
          border-radius: 1rem;
          object-fit: cover;
        }
      }

      .user-info{
        padding-left: .7rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        font-weight: bold;
        height: 100%;

        &:hover{
          text-decoration: underline;
        }
      }

      .post-stamp{
        margin: auto 0;
        text-align: right;
        padding-left: .7rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        font-weight: bold;
        height: 100%;
        flex: 1;

        div{
          width: 100%;
        }
      }

    }

    .post-modifications{
      display: flex;
      align-items: center;
      justify-content: space-between;

      .left-side{
        display: flex;
        align-items: center;
        justify-content: flex-start;

        .post-u-item{
          display: flex;
          align-items: center;
          border-radius: .5rem;
          padding: 0.5rem .5rem;
          background-color: #cacaca;
          cursor: pointer;
          font-weight: bold;
          margin-right: .5rem;
          transition: background-color .5s, box-shadow .5s;

          .li-icon{
            width: 1.1rem;
            height: 1.1rem;
            display: inline-block;
          }
          
          div{
            display: inline-block;
            padding-left: .3rem;
            line-height: .9rem;
            font-size: .9rem;
          }

          &:hover{
            background-color: #a0a0a0;
            box-shadow: 2px 2px 5px 0 black;
          }

          &.done{
            background-color: #a4a4a4;
          }
        }

        .post-edit{
          height: 2.1rem;
          width: 2.5rem;
          padding: .7rem;
          display: flex;
          align-items: center;
          background-color: #bebebe;
          cursor: pointer;
          border-radius: .5rem;
          transition: background-color .5s, box-shadow .5s;

          &:hover{
            background-color: #a0a0a0;
            box-shadow: 2px 2px 5px 0 black;
          }
        }
      }

      .right-side{
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;

        .reply{
          border: 0 none; outline: 0 none;
          padding: 0.1rem 1rem;
          background-color: #3c73e9;
          border: 1px solid #3c73e9;
          cursor: pointer;
          color: white;
          border-radius: .3rem;
          transition: border .5s, box-shadow .5s;
          display: flex;
          align-items: center;

          span{
            display: inline-block;
            padding-right: .5rem;
          }

          &:hover{
            box-shadow: 0 0 5px 2px #3c73e9;
            border: 1px solid transparent;
          }
        }
      }

    }

    .comments-holder{
      border-top: 5px dotted #c7c7c7;
      margin-top: 1rem;
      padding-top: 1rem;
    }

  }

`

export default Post
