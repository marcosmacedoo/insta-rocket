import React, { useState, useEffect } from 'react'
//import io from 'socket.io-client'

import './style.css'

import more from '../../assets/more.svg'
import like from '../../assets/like.svg'
import comment from '../../assets/comment.svg'
import send from '../../assets/send.svg'

import api from '../../services/api'

function Feed() {
  const [posts, setPosts] = useState([])


  useEffect(() => {
    async function loadPosts() {
      const response = await api.get('/posts')

      setPosts(response.data)
    }

    loadPosts()
  }, [])

  function handleLike(id) {
    api.post(`/posts/${id}/like`)
  }

  return (
    <section id="post-list">

      { posts.map(post => (
        <article key={post._id}>

          <header>
            <div className="user-info">
              <span>{ post.author }</span>
              <span className="place">{ post.place }</span>
            </div>
            <img src={more} alt="Mais"/>
          </header>

          <img src={`http://localhost:3333/files/${post.image}`} alt=""/>

          <footer>
            <div className="actions">
              <button
                type="button"
                onClick={() => handleLike(post._id)}>
                <img src={like} alt=""/>
              </button>
              <img src={comment} alt=""/>
              <img src={send} alt=""/>
            </div>

            <strong>{ post.likes } curtidas</strong>

            <p>
              { post.description }
              <span>{ post.hashtags }</span>
            </p>
          </footer>
        </article>
      ))}

    </section>
  )
}

export default Feed
