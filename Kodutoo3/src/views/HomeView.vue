<template>
  <main class="page-layout">
    <aside class="side-panel" aria-hidden="true"></aside>
    <section class="feed">
      <PostCard v-for="post in posts" :key="post.id" :post-id="post.id" />
      <button class="like-button reset-button" @click="resetLikes">Reset likes</button>
    </section>
    <aside class="side-panel right-panel" aria-hidden="true"></aside>
  </main>
</template>

<script>
import PostCard from '../components/PostCard.vue'

export default {
  components: { PostCard },
  computed: {
    posts() {
      return this.$store.state.posts
    }
  },
  methods: {
    resetLikes() {
      this.$store.commit('resetLikes')
    }
  }
}
</script>
