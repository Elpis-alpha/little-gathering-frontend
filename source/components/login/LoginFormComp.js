import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { useEffect, useState, useRef } from "react"

import styled from "styled-components"

import { Oval } from "react-loader-spinner"

import Cookies from "universal-cookie"

import { loginUser } from "../../api"

import { setUserData } from "../../store/actions/userAction"

import { useRouter } from 'next/router'

import { useDispatch } from "react-redux"


const LoginFormComp = () => {

  const dispatch = useDispatch()

  const router = useRouter()

  const cookie = new Cookies()

  const buttonRef = useRef(null)

  const [email, setEmail] = useState("")

  const [password, setPassword] = useState("")

  const [loginError, setLoginError] = useState("")

  const [buttonValue, setButtonValue] = useState("Login")

  const [passwordShow, setPasswordShow] = useState("password")

  const togglePassword = () => {

    if (passwordShow === "password") setPasswordShow("text")

    else setPasswordShow("password")

  }

  useEffect(() => {

    if (loginError !== "") {

      setTimeout(() => {

        setLoginError("")

      }, 1000);

    }

  }, [loginError])


  const loginUserUI = async e => {

    e.preventDefault()

    const button = buttonRef.current

    if (button.disabled) { return false }

    button.disabled = true

    const loginData = { email, password }

    setButtonValue(<div className="acct-load">Validating Credentials  <Oval color="#f4f4f4" height="1rem" wrapperStyle={{ paddingLeft: ".5rem" }} width="1rem" /></div>)

    const userLogin = await fetch(loginUser(), {

      method: 'POST',

      headers: {

        'Content-type': 'application/json',

      },

      body: JSON.stringify(loginData)

    })

    const userLoginData = await userLogin.json()

    if (userLoginData.error) {

      button.disabled = false

      setLoginError("Invalid Email or Password")

      setButtonValue('Login')

    } else {

      dispatch(setUserData(userLoginData.user))

      cookie.set('user-token', userLoginData.token, { path: '/', expires: new Date(90 ** 7) })

      button.disabled = false

      setButtonValue('Login')

      router.push('/')

    }

  }

  return (

    <LoginFormStyle>

      <form name="el-udsauhk" onSubmit={loginUserUI}>

        <div className="image-pack">

          <img src="/logo.png" alt="logo" />

        </div>

        <div className="form-title">

          <h1>Welcome back</h1>

          <p>A lot have happened since you left! Kindly enter your details to log in</p>

          {loginError !== "" && <div className='error-txt'>{loginError}</div>}

        </div>

        <div className="form-pack">

          <label htmlFor="el-ksaa">Email</label>

          <input type="email" id="el-ksaa" name="el-udsauhk-sda" placeholder="Enter your Email" value={email} onInput={e => setEmail(e.currentTarget.value.trim())} />

        </div>

        <div className="form-pack">

          <label htmlFor="el-kdsa">Password</label>

          <input required type={passwordShow} id='el-kdsa' name='el-udsauhk-sda' placeholder="●●●●●●" value={password} onInput={e => setPassword(e.currentTarget.value.trim())} />

          <div className="eye-icon"><div onClick={togglePassword}>

            {passwordShow === "password" && <FontAwesomeIcon icon={faEye} />}

            {passwordShow === "text" && <FontAwesomeIcon icon={faEyeSlash} />}

          </div></div>

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

    .change-auth{
      width: 100%;
      text-align: center;
      padding-top: .5rem;

      span.link-me{
        display: inline-block;
        color: #3c73e9;
        cursor: pointer;
      }

      span.link-me:hover{
        text-decoration: underline;
      }
    }

    .eye-icon{
      position: absolute;
      right: 0; top: 0;
      height: 100%;
      padding-top: 1.6rem;
      padding-bottom: 1rem;
      padding-right: .5rem;
      width: 1.5rem;
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
