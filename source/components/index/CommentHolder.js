import styled from 'styled-components'

import { useSelector } from "react-redux"

import { ThreeDots, Oval } from 'react-loader-spinner'

import { useEffect, useState } from 'react'

import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useDispatch } from 'react-redux'

import Comment from './Comment'

import { postComments, createComment, editComment } from '../../api'

import { setCommentShow, setCommentValue } from '../../store/actions/commentAction'

import Cookies from 'universal-cookie'

const CommentHolder = ({ comments, _id }) => {

  const dispatch = useDispatch()

  const cookies = new Cookies()

  const token = cookies.get('user-token')

  const [visibleComments, setvisibleComments] = useState("")

  const [moreComments, setMoreComments] = useState(false)

  const [sendingComment, setSendingComment] = useState(false)

  const [loadingMore, setLoadingMore] = useState(false)

  const { available } = useSelector(store => store.user)

  const { show: showCommentForm, value: commentValue, edit } = useSelector(store => store.commentForm)

  const loadMoreHandler = async () => {

    if (loadingMore) { return false }

    setLoadingMore(true)

    const commentResponse = await fetch(postComments(0, visibleComments.length + 5, _id))

    const comments = await commentResponse.json()

    setvisibleComments(comments.slice(0, visibleComments.length + 4))

    if (visibleComments.length + 4 === comments.length) { setMoreComments(false) }

    setLoadingMore(false)

  }

  const saySomethingHandler = () => {

    if (_id === showCommentForm) {

      dispatch(setCommentShow(""))

    } else {

      dispatch(setCommentShow(_id))

    }

  }

  const createCommentX = async (e) => {

    e.preventDefault()

    if (commentValue.trim() === "") { return false }

    if (!available) { return false }

    if (sendingComment) { return false }

    setSendingComment(true)

    let returnValue = { post: _id, text: commentValue.trim() }; let url = createComment(); let method = 'POST'

    if (typeof edit === 'string') { returnValue = { text: commentValue.trim() }; url = editComment(edit); method = 'PATCH'; }

    const creationResponse = await fetch(url, {

      method: method,

      headers: {

        'Content-type': 'application/json',

        'Authorization': `Bearer ${token}`

      },

      body: JSON.stringify(returnValue)

    })

    const creationData = await creationResponse.json()

    const commentResponse = await fetch(postComments(0, 3, _id))

    const commentsX = await commentResponse.json()

    if (commentsX.length > 2) { setMoreComments(true) }

    setvisibleComments(commentsX.slice(0, 2))

    setSendingComment(false)

    dispatch(setCommentShow(""))

  }

  useEffect(() => {

    if (typeof comments === "object") {

      if (comments.length > 2) { setMoreComments(true) }

      setvisibleComments(comments.slice(0, 2))

    }

  }, [comments])

  return (

    <CommentHolderStyle>

      {showCommentForm === _id && <form onSubmit={createCommentX} className='comment-form'>

        <div className="form-pack">

          <input type="text" placeholder='Write your comment here...' value={commentValue} onInput={e => dispatch(setCommentValue(e.target.value))} />

          <button>{sendingComment ? <Oval width="1rem" height="1rem" secondaryColor='black' color='white' /> : <FontAwesomeIcon icon={faPaperPlane} width="1rem" />}</button>

        </div>

      </form>}

      {typeof visibleComments === "object" ?

        <>

          {visibleComments.length > 0 ?

            <>

              {visibleComments.map(comment => <Comment key={comment._id} comment={comment} />)}

              {moreComments && <span className='v-more' onClick={loadMoreHandler}>{!loadingMore ? <>View more</> : <Oval height="1.15rem" width="1.15rem" color='white' secondaryColor='white' />}</span>}

            </>

            :

            <div className='no-comments'>

              No Comments Yet! {available && <>Be the first to <span onClick={saySomethingHandler}>say something</span></>}

            </div>}

        </>

        :

        <div className='loading-comments'>

          <ThreeDots color='#000' height="3rem" width="7rem" />

          <div>Loading Comments</div>

        </div>

      }

    </CommentHolderStyle>

  )

}

const CommentHolderStyle = styled.div`

  .comment-form{
    display: flex;
    padding-right: 1rem;
    padding-left: 3rem;
    width: 100%;
    flex-direction: column;
    align-items: center;

    .form-pack{
      display: flex;
      align-items: center;
      width: 100%;

      input{
        border: 0 none; outline: 0 none;
        flex: 1;
        border: 1px solid grey;
        background-color: transparent;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
      }
      
      button{
        margin-left: .5rem;
        align-self: stretch;
        border: 0 none; outline: 0 none;
        border: 1px solid #c3c3c3;
        background-color: #c3c3c3;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  .no-comments{
    font-size: 1rem;
    text-align: center;

    span{
      text-decoration: underline;
      cursor: pointer;
    }
  }

  .loading-comments{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    div{
      padding: .5rem;
    }
  }

  .v-more{
    margin-left: 3rem;
    margin-bottom: .5rem;
    cursor: pointer;
    width: calc(100% - 3rem);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #3c73e9;
    background-color: #3c73e9;
    border-radius: 0.3rem;
    color: white;
    transition: border .5s, box-shadow .5s;

    &:hover{
      box-shadow: 0 0 5px 2px #3c73e9;
      border: 1px solid transparent;
    }
  }
`

export default CommentHolder
