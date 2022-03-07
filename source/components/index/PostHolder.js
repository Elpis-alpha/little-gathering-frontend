import { useEffect, useState } from 'react'
import { Oval } from 'react-loader-spinner'

import styled from 'styled-components'
import { postList } from '../../api'

import Post from './Post'


const PostHolder = ({ posts }) => {

  const [allPosts, setAllPosts] = useState(posts)

  const [showLoader, setShowLoader] = useState(false)

  let loadingPosts = false

  useEffect(() => {

    const loadNewPosts = async () => {

      const distToBottom = Math.floor(document.body.offsetHeight - (window.innerHeight + window.pageYOffset))

      const startLoadingPosts = distToBottom <= 700

      if (startLoadingPosts && !loadingPosts) {

        loadingPosts = true

        setShowLoader(true)

        const addpostsResponse = await fetch(postList(allPosts.length, 10))

        let addposts = await addpostsResponse.json()

        addposts.forEach(post => {

          post.readMore = post.text.length > 500

          post.fullText = post.text

          post.text = (post.text.slice(0, 500) + (post.readMore ? '...' : ''))

        });

        addposts = allPosts.concat(addposts)

        addposts = addposts.filter((v, i, s) => s.map(x => x._id).indexOf(v._id) === i)

        setShowLoader(!(addposts.length === allPosts.length))

        setAllPosts(addposts)

        loadingPosts = false

      }

    }

    window.addEventListener('scroll', loadNewPosts)

    return () => {

      window.removeEventListener('scroll', loadNewPosts)

    }

  }, [allPosts])


  return (

    <AllHolderStyle>

      <div className="all-poxts">

        {allPosts.length === 0 && <div className='no-po'>There are no posts yet</div>}

        {allPosts.map(post => <Post key={post._id} post={post} />)}

        {(showLoader && allPosts.length > 9) && <div className='s-loa'>

          <Oval width="5rem" height="5rem" color='black' secondaryColor='black' />

        </div>}

      </div>

    </AllHolderStyle>

  )

}

const AllHolderStyle = styled.div`
display: flex;

.all-poxts{
  width: 100%;
  flex: 1;
  display: block;

  .no-po{
    padding: 2rem 1rem;
    font-size: 2rem;
    text-align: center;
  }
}

.s-loa{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

`


export default PostHolder