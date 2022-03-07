import styled from 'styled-components'

import { useSelector } from "react-redux"

import { Oval } from 'react-loader-spinner'

import { useState } from 'react'

import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Comment from './Comment'

import { createComment } from '../../api'

import Cookies from 'universal-cookie'

const CommentHolder = ({ comments, _id, showCommentForm, setShowCommentForm, owner }) => {

  const cookies = new Cookies()

  const token = cookies.get('user-token')

  const [sendingComment, setSendingComment] = useState(false)

  const { available } = useSelector(store => store.user)

  const [commentValue, setCommentValue] = useState("")

  const saySomethingHandler = () => {

    if (_id === showCommentForm) {

      setShowCommentForm("")

    } else {

      setShowCommentForm(_id)

    }

  }

  const createCommentX = async (e) => {

    e.preventDefault()

    if (commentValue.trim() === "") { return false }

    if (!available) { return false }

    if (sendingComment) { return false }

    setSendingComment(true)

    let returnValue = { post: _id, text: commentValue.trim() }; let url = createComment(); let method = 'POST'

    const creationResponse = await fetch(url, {

      method: method,

      headers: {

        'Content-type': 'application/json',

        'Authorization': `Bearer ${token}`

      },

      body: JSON.stringify(returnValue)

    })

    const creationData = await creationResponse.json()

    setSendingComment(false)

    setShowCommentForm("")

  }

  return (

    <CommentHolderStyle>

      {showCommentForm === _id && <form onSubmit={createCommentX} className='comment-form'>

        <div className="form-pack">

          <input type="text" placeholder='Write your comment here...' value={commentValue} onInput={e => setCommentValue(e.target.value)} />

          <button>{sendingComment ? <Oval width="1rem" height="1rem" secondaryColor='black' color='white' /> : <FontAwesomeIcon icon={faPaperPlane} width="1rem" />}</button>

        </div>

      </form>}

      <>

        {comments.length > 0 ?

          <>

            {comments.map(comment => <Comment key={comment._id} comment={comment} owner={owner} />)}

          </>

          :

          <div className='no-comments'>

            No Comments Yet! {available && <>Be the first to <span onClick={saySomethingHandler}>say something</span></>}

          </div>}

      </>

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
