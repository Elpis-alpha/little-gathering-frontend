import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { useState, useRef } from "react"

import { useRouter } from 'next/router'

import { useDispatch } from "react-redux"

import styled from "styled-components"

import { isEmail } from "validator"

import { Oval } from "react-loader-spinner"

import Cookies from "universal-cookie"

import { createUser, userExistence } from "../../api"

import { setUserData } from "../../store/actions/userAction"


const LoginFormComp = () => {

  const dispatch = useDispatch()

  const router = useRouter()

  const cookie = new Cookies()

  const emailRef = useRef(null)

  const usernameRef = useRef(null)

  const passwordRef = useRef(null)

  const passwordXRef = useRef(null)

  const buttonRef = useRef(null)

  const [buttonValue, setButtonValue] = useState("Create Account")

  const [emailLoaderShow, setemailLoaderShow] = useState()

  const [passwordShow, setPasswordShow] = useState("password")

  const [passwordXShow, setPasswordXShow] = useState("password")

  const [username, setUsername] = useState("")

  const [email, setEmail] = useState("")

  const [password, setPassword] = useState("")

  const [passwordX, setPasswordX] = useState("")

  const togglePassword = () => {

    if (passwordShow === "password") setPasswordShow("text")

    else setPasswordShow("password")

  }

  const togglePasswordX = () => {

    if (passwordXShow === "password") setPasswordXShow("text")

    else setPasswordXShow("password")

  }

  const usernameHandler = (e) => {

    const input = e.currentTarget

    setUsername(input.value)

    if (input.value.trim().length < 1) {

      usernameRef.current.innerText = 'Invalid Username'

      input.classList.remove('good')

      input.classList.add('bad')

    } else {

      usernameRef.current.innerText = ''

      input.classList.remove('bad')

      input.classList.add('good')

    }

  }

  const emailHandler = (e) => {

    const input = e.currentTarget

    setEmail(input.value)

    setemailLoaderShow(false)

    if (!isEmail(input.value.trim())) {

      emailRef.current.innerText = 'Invalid Email'

      input.classList.remove('good')

      input.classList.add('bad')

    } else {

      emailRef.current.innerText = ''

      input.classList.remove('bad')

      input.classList.add('good')

    }

  }

  const uniqueEmailHandler = async (e) => {

    const input = e.currentTarget

    if (emailRef.current.innerText === "") {

      setemailLoaderShow(true)

      const existence = await fetch(userExistence(email.trim()))

      const existenceData = await existence.json()

      if (existenceData.message === 'user does not exist') {

        emailRef.current.innerText = ''

        input.classList.remove('bad')

        input.classList.add('good')

      } else {

        emailRef.current.innerText = 'Email is taken'

        input.classList.remove('good')

        input.classList.add('bad')

      }

      setemailLoaderShow(false)

      setEmail(input.value.trim())

    }

  }

  const passwordHandler = (e) => {

    const input = e.currentTarget

    setPassword(input.value)

    if (input.value.trim().length < 5) {

      passwordRef.current.innerText = 'Password is too short'

      input.classList.remove('good')

      input.classList.add('bad')

    } else {

      passwordRef.current.innerText = ''

      input.classList.remove('bad')

      input.classList.add('good')

      if (passwordX !== input.value.trim()) {

        passwordXRef.current.previousElementSibling.classList.remove('good')

        passwordXRef.current.previousElementSibling.classList.add('bad')

        passwordXRef.current.innerText = "Passwords don't match"

      } else {

        passwordXRef.current.previousElementSibling.classList.add('good')

        passwordXRef.current.previousElementSibling.classList.remove('bad')

        passwordXRef.current.innerText = ""

      }

    }

  }

  const passwordXHandler = (e) => {

    const input = e.currentTarget

    setPasswordX(input.value)

    if (input.value.trim().length < 5) {

      passwordXRef.current.innerText = 'Password is too short'

      input.classList.remove('good')

      input.classList.add('bad')

    } else {

      passwordXRef.current.innerText = ''

      input.classList.remove('bad')

      input.classList.add('good')

      if (password !== input.value.trim()) {

        passwordRef.current.previousElementSibling.classList.remove('good')

        passwordRef.current.previousElementSibling.classList.add('bad')

        passwordRef.current.innerText = "Passwords don't match"

      } else {

        passwordRef.current.previousElementSibling.classList.add('good')

        passwordRef.current.previousElementSibling.classList.remove('bad')

        passwordRef.current.innerText = ""

      }

    }

  }

  const createAccount = async e => {

    e.preventDefault()

    const button = buttonRef.current

    const invalidData = () => {

      setButtonValue('Create Account')

      button.disabled = false

    }

    if (button.disabled) { return false }

    button.disabled = true


    // Validate Password Data

    setButtonValue(<div className="acct-load">Validating Data  <Oval color="#f4f4f4" height="1rem" wrapperStyle={{ paddingLeft: ".5rem" }} width="1rem" /></div>)

    if (!isEmail(email)) { emailRef.current.previousElementSibling.focus(); return invalidData() }

    if (username.length < 1) { usernameRef.current.previousElementSibling.focus(); return invalidData() }

    if (password.length < 5) { passwordRef.current.previousElementSibling.focus(); return invalidData() }

    if (password !== passwordX) { passwordXRef.current.previousElementSibling.focus(); return invalidData() }

    const existence = await fetch(userExistence(email))

    const existenceData = await existence.json()

    if (existenceData.message !== 'user does not exist') { emailRef.current.previousElementSibling.focus(); return invalidData() }


    // Create Account

    setButtonValue(<div className="acct-load">Creating Account <Oval color="#f4f4f4" height="1rem" wrapperStyle={{ paddingLeft: ".5rem" }} width="1rem" /></div>)

    const userData = { name: username, email, password }

    const userCreation = await fetch(createUser(), {

      method: 'POST',

      headers: {

        'Content-type': 'application/json',

      },

      body: JSON.stringify(userData)

    })

    const userCreationData = await userCreation.json()

    dispatch(setUserData(userCreationData.user))

    cookie.set('user-token', userCreationData.token, { path: '/', expires: new Date(90 ** 7) })

    setButtonValue('Create Account')

    button.disabled = false

    router.push('/')

  }

  return (

    <LoginFormStyle>

      <form name="el-dksauu" onSubmit={createAccount}>

        <div className="image-pack">

          <img src="/logo.png" alt="logo" />

        </div>

        <div className="form-title">

          <h1>Sign Up</h1>

          <p>Join Little Gathering and interact with lots of users by dropping posts and comments. Please enter your details</p>

          {/* {data.error !== "" && <div className='error-txt'>{data.error}</div>} */}

        </div>

        <div className="form-pack">

          <label htmlFor="el-dsadas">Username</label>

          <input type="name" id="el-dsadas" required name="el-udsauhk-dsadas" placeholder="Enter your Username" value={username} onInput={usernameHandler} onFocus={usernameHandler} onBlur={e => setUsername(e.target.value.trim())} />

          <small className="valid-error" ref={usernameRef}></small>

        </div>

        <div className="form-pack">

          <label htmlFor="el-kjsad">Email</label>

          <input type="email" id="el-kjsad" required name="el-udsauhk-kjsad" placeholder="Enter your Email" value={email} onInput={emailHandler} onFocus={emailHandler} onBlur={uniqueEmailHandler} />

          {emailLoaderShow && <div className="check-icon"><div><Oval height="100%" /></div></div>}

          <small className="valid-error" ref={emailRef}></small>

        </div>

        <div className="form-pack">

          <label htmlFor="el-sadmand">Password</label>

          <div className="password-hol">

            <div className="password-pack">

              <input required type={passwordShow} id='el-sadmand' name='el-udsauhk-sdaXX' placeholder="●●●●●●" value={password} onInput={passwordHandler} onFocus={passwordHandler} onBlur={e => setPassword(e.target.value.trim())} />

              <small className="valid-error pass" ref={passwordRef}></small>

              <div className="eye-icon"><div onClick={togglePassword}>

                {passwordShow === "password" && <FontAwesomeIcon icon={faEye} />}

                {passwordShow === "text" && <FontAwesomeIcon icon={faEyeSlash} />}

              </div></div>

            </div>

            <div className="password-pack">

              <input required type={passwordXShow} id='el-sadmandX' name='el-udsauhk-sdaYY' placeholder="●●●●●●" value={passwordX} onInput={passwordXHandler} onFocus={passwordXHandler} onBlur={e => setPasswordX(e.target.value.trim())} />

              <small className="valid-error pass" ref={passwordXRef}></small>

              <div className="eye-icon"><div onClick={togglePasswordX}>

                {passwordXShow === "password" && <FontAwesomeIcon icon={faEye} />}

                {passwordXShow === "text" && <FontAwesomeIcon icon={faEyeSlash} />}

              </div></div>

            </div>

          </div>

        </div>

        <div className="form-pack end">

          <button ref={buttonRef}>{buttonValue}</button>

        </div>

      </form>

    </LoginFormStyle>

  )

}


const LoginFormStyle = styled.div`

  min-height: calc(100vh - 5.5rem);
  display: flex;
  color: black;

  form{

    width: 80%;
    padding: 2rem;
    margin: auto;
    max-width: 600px;

    .image-pack{
      max-width: 40%;
      max-height: 30vh;
      margin: 0 auto;
      display: flex;
      align-items: stretch;
      justify-content: center;

      img{
        display: block;
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
      }

    }
    
    .form-title{
      padding-bottom: .3rem;
      text-align: center;
      padding-top: 1rem;
      
      h1{
        font-size: 2rem;
        line-height: 3rem;
      }

      .error-txt{
        width: 50%;
        background-color: rgba(255, 0, 0, 0.3);
        margin: auto;
        text-align: center;
        padding: .2rem 1rem;
        border-radius: .5rem;
      }

    }

    .form-pack{
      width: 100%;
      padding-bottom: 1rem;

      label{
        display: block;
        width: 100%;
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
      }

      input.bad{
        border: 1px solid rgba(255, 0, 0, 0.5);
        background-color: rgba(255, 0, 0, 0.05);
      }

      input.good{
        border: 1px solid rgba(0, 255, 0, 0.5);
        background-color: rgba(0, 255, 0, 0.05);
      }

    }

    .form-pack.end{
      padding: 0;

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
      }

      button:hover{
        box-shadow: 0 0 3px 0 blue;
      }
    }

    .password-hol{

      display: flex;

      .password-pack{
        flex: 1;
        padding: 0 .5rem;

        &:first-child{
          padding-left: 0;
        }

        &:last-child{
          padding-right: 0;
          
          .eye-icon{
            padding-right: .5rem;
            width: 1.5rem;
          }

        }

        .eye-icon{
          position: absolute;
          right: 0; top: 0;
          height: 100%;
          /* padding-top: 1.6rem; */
          /* padding-bottom: 1rem; */
          padding-right: 1rem;
          width: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          
          div{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;        
            cursor: pointer;
          }

        }

      }

    }

    .valid-error{
      position: absolute;
      bottom: 0; left: 0;
      line-height: 1rem;
      text-align: center;
      right: 0;
      color: red;

      &.pass{
        top: 100%;
        bottom: auto;
        font-size: .7rem;
      }
    }

    .check-icon{
      position: absolute;
      right: 0; top: 0;
      height: 100%;
      padding-top: 1.6rem;
      padding-bottom: 1rem;
      padding-right: .5rem;
      width: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      
      div{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;        
        cursor: pointer;
      }

    }

  }


`

export default LoginFormComp
