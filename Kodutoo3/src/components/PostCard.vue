<template>
  <article class="post">
    <div class="post-header">
      <div class="post-user">
        <img :src="'assets/avatar.svg'" alt="Profile">
        <span>{{ post.author }}</span>
      </div>
      <time :datetime="post.createdAt">{{ post.createdAt.slice(0, 10) }}</time>
    </div>
    <img v-if="post.image" class="post-image" :src="post.image" :alt="post.imageAlt">
    <p>{{ post.text }}</p>
    <div class="post-actions">
      <button class="like-button" @click="likePost">👍 Like</button>
      <span>{{ post.likes }} likes</span>
    </div>
  </article>
</template>

<script>
export default {
  props: { postId: Number },
  computed: {
    post() {
      return this.$store.state.posts.find(post => post.id === this.postId)
    }
  },
  methods: {
    likePost() {
      this.$store.commit('addLike', this.postId)
    }
  }
}
</script>
