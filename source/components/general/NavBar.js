import { faSignOut, faSquarePlus, faUserCheck, faUserCog, faUserPlus } from "@fortawesome/free-solid-svg-icons"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import Link from "next/link"

import { useEffect, useState } from "react"

import { useSelector } from "react-redux"

import styled from "styled-components"

import { motion } from "framer-motion"

import Cookie from "universal-cookie"

import { useDispatch } from "react-redux"

import { logoutUser } from "../../api"

import { removeUserData } from "../../store/actions/userAction"

import { useRouter } from "next/router"

import { Sling as Hamburger } from "hamburger-react"


const NavBar = () => {

  const cookies = new Cookie()

  const dispatch = useDispatch()

  const router = useRouter()

  const { available, data } = useSelector(store => store.user)

  const [pageWidth, setPageWidth] = useState(null)

  const [showNav, setShowNav] = useState(false)

  const [closeNav, setCloseNav] = useState(true)

  useEffect(() => {

    const resizeWindow = () => {

      if (typeof window !== undefined) setPageWidth(window.innerWidth)

    }

    window.addEventListener('resize', resizeWindow)

    resizeWindow()

    return () => {

      window.removeEventListener('resize', resizeWindow)

    }

  }, [])

  useEffect(() => {

    if (closeNav === true) {

      setTimeout(() => {

        setShowNav(false)

      }, 1000)

    }

    return () => { }

  }, [closeNav])

  const toggleNav = e => {

    const item = e.currentTarget

    if (!item.disabled) {

      item.disabled = true

      setCloseNav(!closeNav)

      if (closeNav === true) {

        setShowNav(true)

      }

      setTimeout(() => item.disabled = false, 1200);

    }

  }

  const removeNav = e => {

    setCloseNav(true)

  }

  const logoutUserX = async () => {

    const token = cookies.get('user-token')

    const logout = fetch(logoutUser(), {

      method: 'POST',

      headers: {

        'Content-type': 'application/json',

        'Authorization': `Bearer ${token}`

      },

    })

    cookies.remove('user-token')

    dispatch(removeUserData())

    router.push('/login')

  }

  const navChildren = <ul>

    {available ?

      <>

        <li>

          <Link href="/new-post">

            <span>

              New Post

              <span className="icon">

                <FontAwesomeIcon icon={faSquarePlus} color="#0d0d4c" width="1rem" height="1rem" />

              </span>

            </span>

          </Link>

        </li>

        <li>

          <Link href={`/user/${data.email}`}>

            <span>

              Profile

              <span className="icon">

                <FontAwesomeIcon icon={faUserCog} color="#0d0d4c" width="1rem" height="1rem" />

              </span>

            </span>

          </Link>

        </li>

        <li>

          <span onClick={logoutUserX}>

            Logout

            <span className="icon">

              <FontAwesomeIcon icon={faSignOut} color="#0d0d4c" width="1rem" height="1rem" />

            </span>

          </span>

        </li>

      </>

      :

      <>

        <li>

          <Link href="/login">

            <span>

              Log in

              <span className="icon">

                <FontAwesomeIcon icon={faUserCheck} color="#0d0d4c" width="1rem" height="1rem" />

              </span>

            </span>

          </Link>

        </li>

        <li>

          <Link href="/signup">

            <span>

              Sign up

              <span className="icon">

                <FontAwesomeIcon icon={faUserPlus} color="#0d0d4c" width="1rem" height="1rem" />

              </span>

            </span>

          </Link>

        </li>

      </>}

  </ul>

  return (

    <NavStyle>

      <div className="heading">

        <Link href="/"><a><h1 style={{ display: "contents" }}>Little Gathering</h1></a></Link>

      </div>

      <div className="children">

        {pageWidth < 600 ?

          <div className={"res-bars " + (showNav ? 'showNav' : '')} onClick={toggleNav}>
          {/* <div className={"res-bars " + (showNav ? 'showNav' : '')}> */}

            {/* <FontAwesomeIcon icon={faBars} color="#000000" width="1.5rem" height="1.5rem" /> */}
            <Hamburger color="black" size={20} toggled={!closeNav} toggle={() => {}} duration={1} distance="sm" rounded />

          </div>

          :

          navChildren

        }

      </div>

      {pageWidth < 600 && showNav &&

        <motion.div className={"small-nav " + (closeNav ? 'close-nav' : '')} onClick={removeNav}>

          {navChildren}

        </motion.div>

      }

    </NavStyle>

  )

}

const NavStyle = styled.nav`

  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(to bottom, #c2c2c2, #e0e0e0);
  border-bottom: 1px solid rgba(128, 128, 128, 0.3);
  z-index: 50;

  .heading {
    z-index: 5;

    a{
      padding: 1.5rem;
      line-height: 2rem;
      display: block;
      font-size: 1.5rem;
      color: black;
      text-decoration: none;
      font-weight: bold;
    }
    
  }
  
  .children{
    font-size: 1rem;
    z-index: 10;

    .res-bars{
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    ul{
      list-style-type: none;
      display: flex;
      align-items: center;
      padding-right: .5rem;
    }

    span{
      font-size: .8rem;
      cursor: pointer;
      padding: .75rem;
      color: black;
      display: flex;
      align-items: center;
      justify-content: center;

      .icon{
        padding: 0;
        padding-left: .3rem;
      }
    }
  }

  @keyframes slide-right {
    from{right: 100%}
    to{right: 0%}
  }

  @keyframes slide-right-opp {
    from{right: 0%}
    to{right: 100%}
  }

  .small-nav{

    position: fixed;
    top: 0; width: 100%;
    height: calc(100vh - 5rem);
    height: 100vh;
    margin: 0 auto;
    right: 0%;
    background-color: #cfcfcf;
    box-shadow: 0 0 4px 0 black;
    z-index: 7;
    overflow: hidden;
    animation: slide-right 1s;
    display: flex;
    align-items: center;
    justify-content: center;

    ul{
      list-style-type: none;
      display: flex;
      align-items: center;
      flex-direction: column;
      width: 100%;

      li{
        width: 100%;
      }
    }

    span{
      font-size: 1rem;
      cursor: pointer;
      padding: .75rem;
      color: black;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color .5s;

      .icon{
        padding: 0;
        padding-left: .3rem;
      }

    }

    span:not(.icon):hover{
      background-color: rgba(0, 0, 0, 0.2);
    }

  }

  .small-nav.close-nav{
    animation: slide-right-opp 1s;
  }

`

export default NavBar
