import { useRef, useState, useEffect } from 'react'

import { Oval } from 'react-loader-spinner'

import styled from 'styled-components'

import { useSelector } from 'react-redux'

import { deletePost, editPost } from '../../api'

import Cookies from 'universal-cookie'

import { useRouter } from 'next/router'


const PostForm = ({ post, owner }) => {

  const router = useRouter()

  const titleRef = useRef(null)

  const textRef = useRef(null)

  const buttonRef = useRef(null)

  const deleteRef = useRef(null)

  const cookies = new Cookies()

  const token = cookies.get('user-token')

  const { available, data } = useSelector(store => store.user)

  const [buttonValue, setButtonValue] = useState("Publish")

  const [deleteValue, setDeleteValue] = useState("Delete Post")

  useEffect(() => {

    if (!available) {

      buttonRef.current.disabled = true

    } else {

      buttonRef.current.disabled = true

      if (data.email === owner.email) {

        buttonRef.current.disabled = false

      }

    }

  }, [available])

  const editPostX = async e => {

    e.preventDefault()

    const title = titleRef.current.value.trim();

    const text = textRef.current.value.trim();

    if (title.length < 1) { return false }

    if (text.length < 1) { return false }

    if (!available) { return false }

    if (data.email !== owner.email) { return false }

    if (buttonRef.current.disabled === true) { return false }

    buttonRef.current.disabled = true

    setButtonValue(<div className="acct-load">Publishing Post <Oval color="#f4f4f4" height="1pc" wrapperStyle={{ paddingLeft: ".5pc" }} width="1pc" /></div>)

    const postEdit = await fetch(editPost(post._id), {

      method: 'PATCH',

      headers: {

        'Content-type': 'application/json',

        'Authorization': `Bearer ${token}`

      },

      body: JSON.stringify({ title, text })

    })

    const postEditData = await postEdit.json()

    setButtonValue('Publish')

    buttonRef.current.disabled = false

    router.push(`/post/${post._id}`)

  }

  const deletePostX = async e => {

    e.preventDefault()

    if (!available) { return false }

    if (data.email !== owner.email) { return false }

    if (deleteRef.current.disabled === true) { return false }

    deleteRef.current.disabled = true

    setButtonValue(<div className="acct-load">Deleting Post <Oval color="#f4f4f4" height="1pc" wrapperStyle={{ paddingLeft: ".5pc" }} width="1pc" /></div>)

    const postDelete = await fetch(deletePost(post._id), {

      method: 'DELETE',

      headers: {

        'Content-type': 'application/json',

        'Authorization': `Bearer ${token}`

      }

    })

    const postDeleteData = await postDelete.json()

    setButtonValue('Delete Post')

    deleteRef.current.disabled = false

    router.push(`/`)

  }

  useEffect(() => {

    titleRef.current.value = post.title

    textRef.current.value = post.text

  }, [])

  return (

    <PostFormStyle>

      <div className="heading">

        <h1 className="title">Edit Your Post</h1>

        <p>Write something for everyone at the little gathering to see</p>

      </div>

      <form onSubmit={editPostX}>

        <div className="form-pack">

          <label htmlFor="pop-tit">Title</label>

          <input ref={titleRef} type="text" id='pop-tit' name='pop-tit-name' autoComplete='off' required placeholder='Title...' />

        </div>

        <div className="form-pack" >

          <label htmlFor="pop-cont">Text</label>

          <textarea ref={textRef} name="pop-cont-na" id="pop-cont" required placeholder='Something awesome...'></textarea>

        </div>

        <div className="form-pack end">

          <button ref={buttonRef}>{buttonValue}</button>

        </div>

      </form>

      <div className="form-pack"><button className='delete' onClick={deletePostX} ref={deleteRef}>{deleteValue}</button></div>

    </PostFormStyle>

  )

}

const PostFormStyle = styled.div`

  .heading{
    width: 100%;
    text-align: center;
    color: black;
    padding: 1pc;
    padding-top: 2pc;
    padding-bottom: .5pc;

    .title{
      font-size: 2pc;
      line-height: 3pc;
      /* padding: 0.5pc 0; */
    }

    p{
      font-size: 1pc;
    }
  }

  .form-pack{
    width: 100%;
    padding: 2pc;
    padding-top: 0;
    padding-bottom: 1pc;

    label{
      display: block;
      width: 100%;
      color: black;
      font-weight: bold;
    }

    input{
      width: 100%;
      outline: none;
      border: 0 solid grey;
      box-shadow: 0 0 2px rgba(0,0,0,.5);
      padding: .1pc .5pc;
      border-radius: .3pc;
      background-color: transparent;
      transition: background-color .5s, border .5s;
      display: block;
    }

    textarea{
      width: 100%;
      min-height: 20vh;
      outline: none;
      border: 0px solid grey;
      box-shadow: 0 0 2px rgba(0,0,0,.5);
      display: block;
      padding: .1pc .5pc;
      border-radius: .3pc;
      background-color: transparent;
      transition: background-color .5s, border .5s;
    }

    button{
      padding: .1pc 1pc;
      width: 100%;
      background-color: #3c73e9;
      color: white;
      border: none; outline: none;
      border-radius: .3pc;
      cursor: pointer;
      transition: box-shadow .5s;

      &:disabled{
        opacity: .5;
      }

      .acct-load{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 2pc;
      }

      &:hover{
        box-shadow: 0 0 3px 0 blue;
      }

      &.delete{
        background-color: #bb2b21;
      }

      &.delete:hover{
        box-shadow: 0 0 3px 0 red;
      }
      
    }

  }
 
 
`

export default PostForm
