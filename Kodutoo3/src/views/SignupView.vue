<template>
  <main class="form-page">
    <section class="form-card login-card">
      <h1>Signup</h1>
      <form @submit.prevent="signup">
        <label for="email">Email</label>
        <input id="email" v-model="email" type="email" placeholder="Email" required>
        <label for="password">Password</label>
        <input id="password" v-model="password" type="password" placeholder="Password" autocomplete="new-password" @input="checked = true">
        <div v-if="checked && errors.length" class="password-error" role="alert">
          The password is not valid:
          <ul>
            <li v-for="error in errors" :key="error">{{ error }}</li>
          </ul>
        </div>
        <button type="submit">Signup</button>
      </form>
    </section>
  </main>
</template>

<script>
import { passwordErrors } from '../password.js'

export default {
  data() {
    return { email: '', password: '', checked: false }
  },
  computed: {
    errors() {
      return passwordErrors(this.password)
    }
  },
  methods: {
    signup() {
      this.checked = true
      if (this.errors.length === 0) {
        this.$router.push('/')
      }
    }
  }
}
</script>
