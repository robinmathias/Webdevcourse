import { createStore } from 'vuex'
import posts from './posts.json'

export default createStore({
  state: {
    posts: posts.map(post => ({ ...post, likes: 0 }))
  },
  mutations: {
    addLike(state, id) {
      const post = state.posts.find(post => post.id === id)
      if (post) post.likes++
    },
    resetLikes(state) {
      state.posts.forEach(post => {
        post.likes = 0
      })
    }
  }
})
