import { useEffect, useRef, useState } from "react"

import styled from "styled-components"

import { Grid, Oval } from "react-loader-spinner"

import { useSelector, useDispatch } from "react-redux"

import { getUserPicture, editUser, uploadAvatar, deleteAvatar } from "../../api"

import { setUserData } from "../../store/actions/userAction"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { faSave, faTimesSquare } from "@fortawesome/free-solid-svg-icons"

import Cookies from 'universal-cookie'

import { datetoDateStr } from "../../controllers/TimeCtrl"

import LilPost from "./LilPost"


const UserComp = ({ user, posts, comments }) => {

  const cookies = new Cookies()

  const token = cookies.get('user-token')

  const dispatch = useDispatch()

  const userImageRef = useRef(null)

  const buttonRef = useRef(null)

  const [userImage, setUserImage] = useState(false)

  const [savingImage, setSavingImage] = useState(false)

  const [deletingImage, setDeletingImage] = useState(false)

  const [userName, setUserName] = useState(user.name)

  const { available, data } = useSelector(store => store.user)

  const [isUser, setIsUser] = useState(available ? (data.email === user.email) : false)

  const usernameInput = e => setUserName(e.target.value)

  const changeUsername = async e => {

    e.preventDefault()

    const username = userName.trim()

    if (username === "") { return false }

    if (username === user.name) { return false }

    if (buttonRef.current.disabled === true) { return false }

    buttonRef.current.disabled = true

    console.log(buttonRef.current);

    const userEdit = await fetch(editUser(), {

      method: 'PATCH',

      headers: {

        'Content-type': 'application/json',

        'Authorization': `Bearer ${token}`

      },

      body: JSON.stringify({ name: username })

    })

    const userData = await userEdit.json()

    dispatch(setUserData(userData))

    buttonRef.current.disabled = false

  }

  const uploadAvatarX = async e => {

    if (!e) { return false }

    const input = e.currentTarget

    const avatar = input.files[0]

    if (!avatar) { return false }

    if (input.disabled === true) { return false }

    input.disabled = true; setSavingImage(true);

    const formData = new FormData();

    formData.append('avatar', input.files[0]);

    const avatarEdit = await fetch(uploadAvatar(), {

      method: 'POST',

      headers: {

        // 'Content-type': 'multipart/form-data',

        'Authorization': `Bearer ${token}`

      },

      body: formData

    })

    const avatarData = await avatarEdit.json()


    // Fetch user Images
    const userImage = new Image()

    userImage.src = getUserPicture(user._id, 'large')

    userImage.onload = () => {

      try {

        userImage.alt = user.name

        setUserImage(true)

        userImageRef.current.innerHTML = ''

        userImageRef.current.appendChild(userImage)

      } catch (error) {

        console.log(error);

      } finally {

        input.disabled = false; setSavingImage(false);

      }

    }

    userImage.onerror = () => {

      const avatarImage = new Image()

      avatarImage.src = '/images/avatar.png'

      avatarImage.onload = () => {

        try {

          avatarImage.alt = 'avatar'

          setUserImage(true)

          userImageRef.current.innerHTML = ''

          userImageRef.current.appendChild(avatarImage)

        } catch (error) {

          console.log(error);

        } finally {

          input.disabled = false; setSavingImage(false);

        }

      }

    }

  }

  const removeAvatarX = async e => {

    if (deletingImage) { return false }

    setDeletingImage(true);

    const avatarDelete = await fetch(deleteAvatar(), {

      method: 'DELETE',

      headers: {

        'Content-type': 'application/json',

        'Authorization': `Bearer ${token}`

      },

    })

    const avatarDeleteData = await avatarDelete.json()


    // Fetch user Images
    const avatarImage = new Image()

    avatarImage.src = '/images/avatar.png'

    avatarImage.onload = () => {

      try {

        avatarImage.alt = 'avatar'

        setUserImage(true)

        userImageRef.current.innerHTML = ''

        userImageRef.current.appendChild(avatarImage)

      } catch (error) {

        console.log(error);

      } finally {

        setDeletingImage(false);

      }

    }

  }

  useEffect(() => { setIsUser(available ? (data.email === user.email) : false) }, [available])

  useEffect(async () => {

    // Fetch user Images
    const userImage = new Image()

    userImage.src = getUserPicture(user._id, 'large')

    userImage.onload = () => {

      try {

        userImage.alt = user.name

        setUserImage(true)

        userImageRef.current.innerHTML = ''

        userImageRef.current.appendChild(userImage)

      } catch (error) {

        console.log(error);

      }

    }

    userImage.onerror = () => {

      const avatarImage = new Image()

      avatarImage.src = '/images/avatar.png'

      avatarImage.onload = () => {

        try {

          avatarImage.alt = 'avatar'

          setUserImage(true)

          userImageRef.current.innerHTML = ''

          userImageRef.current.appendChild(avatarImage)

        } catch (error) {

          console.log(error);

        }

      }

    }

  }, [])

  return (

    <UserCompStyle>

      <div className="user-holder">

        <div className="top-part">

          <div className="image-hol-us">

            <div className="user-image" ref={userImageRef}><Grid color="black" width="100%" /></div>

            {(isUser && userImage) && <div className="ch-pic">

              Change Picture

              {(!savingImage && !deletingImage) && <div className="del-ico" onClick={removeAvatarX}><FontAwesomeIcon icon={faTimesSquare} width="1rem" color="inherit" /></div>}

              {deletingImage && <Oval width="1rem" color="red" secondaryColor="red" />}

              {savingImage && <Oval width="1rem" color="white" secondaryColor="white" />}

              {!deletingImage && <input onInput={uploadAvatarX} accept=".png,.jpg,.jpeg,.webpg," type="file" />}

            </div>}

          </div>

          <div className="user-det">

            <div className="user-item">

              <label htmlFor="">Username:</label>

              <>{isUser ?

                <form onSubmit={changeUsername}><input type="text" value={userName} onInput={usernameInput} className="ad-btx" /> <button ref={buttonRef}><FontAwesomeIcon icon={faSave} height="60%" color="rgb(13, 13, 76)" /></button> </form>

                :

                <input type="text" defaultValue={user.name} readOnly />

              }</>

            </div>

            <div className="user-item">

              <label htmlFor="">Email:</label>

              <input type="text" defaultValue={user.email} readOnly />

            </div>

            <div className="user-item">

              <label htmlFor="">Member Since:</label>

              <input type="text" defaultValue={datetoDateStr(new Date(user.createdAt))} readOnly />

            </div>

            <div className="user-item">

              <label htmlFor="">No. of Posts:</label>

              <input type="text" defaultValue={posts.length} readOnly />

            </div>

            <div className="user-item">

              <label htmlFor="">No. of Comments:</label>

              <input type="text" defaultValue={comments} readOnly />

            </div>

          </div>

        </div>

        <div className="bottom-part">

          <div className="heading">{user.name} Posts</div>

          {posts.length === 0 && <div className='no-po'>{user.name} has no posts</div>}

          {posts.map(post => <LilPost key={post._id} post={post} />)}

        </div>

      </div>

    </UserCompStyle>

  )

}

const UserCompStyle = styled.div`

  .user-holder{
    display: flex;
    flex-direction: row;
    padding: 1rem;
    
    .top-part{
      width: 30%;
      display: block;

      .user-image{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        img{
          max-width: 100%;
          border-radius: 2rem;
        }

        padding-bottom: 1rem;
      }

      .ch-pic{
        position: absolute;
        bottom: 1rem; left: 0;
        height: 2rem;
        width: 100%;
        border-radius: 0 0 2rem 2rem;
        background-color: rgba(0, 0, 0, 0.4);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background-color .5s;

        .del-ico{
          display: flex;
          padding-left: .3rem;
          z-index: 5;
          cursor: pointer;
          color: #c52a2a;
          transition: color .5s;
          
          &:hover{
            color: white;
          }
        }

        input{
          position: absolute;
          opacity: 0;
          width: 100%; height: 100%;
          top: 0; left: 0;
          right: 0; bottom: 0;
          cursor: pointer;
          z-index: 4;
        }
        
        &:hover{
          background-color: rgba(0, 0, 0, 0.6);
        }
      }

      .user-det{
        width: 100%;
        display: block;

        form{display: contents}

        .user-item{
          display: flex;
          flex-wrap: wrap;

          label{
            width: 100%;
            display: block;
            font-weight: bold;
          }

          input{
            width: 100%;
            display: block;
            background-color: transparent;
            border: 1px solid grey;
            border-radius: .5rem;
            padding: .2rem .5rem;
            outline: 0 none;
          }

          input.ad-btx{
            width: 100%;
            padding-right: 2rem;
          }

          button{
            height: 100%;
            background-color: transparent;
            border: 0 none;
            outline: 0 none;
            padding: 0 .5rem;
            position: absolute;
            right: 0; bottom: 0;
            padding-bottom: 1rem;
            padding-top: 1.6rem;
            display: flex;
            align-items: center;
            cursor: pointer;
            justify-content: center;
            
            @keyframes lo-ro {
              from{transform: rotate(0deg);}
              to{transform: rotate(360deg);}
            }

            &:disabled svg{
              animation: lo-ro 2s linear infinite;
              transform-origin: center;
            }
          }

          padding-bottom: 1rem;
        }
      }
    }
    
    .bottom-part{

      padding-left: 1rem;
      width: 70%;

      .heading{
        font-size: 1.2rem;
        font-weight: bold;
        text-align: center;
        padding: .5rem;
      }

      .no-po{
        padding: 2rem 1rem;
        font-size: 2rem;
        line-height: 3rem;
        text-align: center;
      }
    }    
  }

`

export default UserComp
