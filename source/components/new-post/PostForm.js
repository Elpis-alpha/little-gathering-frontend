import { useRef, useState, useEffect } from 'react'

import { Oval } from 'react-loader-spinner'

import styled from 'styled-components'

import { useSelector } from 'react-redux'

import { createPost } from '../../api'

import Cookies from 'universal-cookie'

import { useRouter } from 'next/router'


const PostForm = () => {

  const router = useRouter()

  const titleRef = useRef(null)

  const textRef = useRef(null)

  const buttonRef = useRef(null)

  const cookies = new Cookies()

  const token = cookies.get('user-token')

  const { available } = useSelector(store => store.user)

  const [buttonValue, setButtonValue] = useState("Publish")


  useEffect(() => {

    if (!available) {

      buttonRef.current.disabled = true

    } else {

      buttonRef.current.disabled = false

    }

  }, [available])

  const createPostX = async e => {

    e.preventDefault()

    const title = titleRef.current.value.trim();

    const text = textRef.current.value.trim();

    if (title.length < 1) { return false }

    if (text.length < 1) { return false }

    if (buttonRef.current.disabled === true) { return false }

    buttonRef.current.disabled = true

    setButtonValue(<div className="acct-load">Publishing Post <Oval color="#f4f4f4" height="1rem" wrapperStyle={{ paddingLeft: ".5rem" }} width="1rem" /></div>)

    const postCreation = await fetch(createPost(), {

      method: 'POST',

      headers: {

        'Content-type': 'application/json',

        'Authorization': `Bearer ${token}`

      },

      body: JSON.stringify({ title, text, downVotes: [], upVotes: [], })

    })

    const postCreationData = await postCreation.json()

    setButtonValue('Publish')

    buttonRef.current.disabled = false

    router.push('/')

  }

  return (

    <PostFormStyle>

      <div className="heading">

        <h1 className="title">Create a new Post</h1>

        <p>Write something for everyone at the little gathering to see</p>

      </div>

      <form onSubmit={createPostX}>

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

    </PostFormStyle>

  )

}

const PostFormStyle = styled.div`

  .heading{
    width: 100%;
    text-align: center;
    color: black;
    padding: 1rem;
    padding-top: 2rem;
    padding-bottom: .5rem;

    .title{
      font-size: 2rem;
      line-height: 3rem;
      /* padding: 0.5rem 0; */
    }

    p{
      font-size: 1rem;
    }
  }

  .form-pack{
    width: 100%;
    padding: 2rem;
    padding-top: 0;
    padding-bottom: 1rem;

    label{
      display: block;
      width: 100%;
      color: black;
      font-weight: bold;
    }

    input{
      width: 100%;
      outline: none;
      border: 1px solid grey;
      padding: .1rem .5rem;
      border-radius: .3rem;
      background-color: transparent;
      transition: background-color .5s, border .5s;
      display: block;
    }

    textarea{
      width: 100%;
      min-height: 20vh;
      outline: none;
      border: 1px solid grey;
      display: block;
      padding: .1rem .5rem;
      border-radius: .3rem;
      background-color: transparent;
      transition: background-color .5s, border .5s;
    }

    button{
      padding: .1rem 1rem;
      width: 100%;
      background-color: #3c73e9;
      color: white;
      border: none; outline: none;
      border-radius: .3rem;
      cursor: pointer;
      transition: box-shadow .5s;

      &:disabled{
        opacity: .5;
      }

      .acct-load{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 2rem;
      }

      &:hover{
        box-shadow: 0 0 3px 0 blue;
      }
      
    }

  }
 
 
`

export default PostForm
