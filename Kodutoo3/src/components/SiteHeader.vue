<template>
  <header class="site-header">
    <nav class="navbar">
      <div class="nav-links">
        <router-link to="/">Home</router-link>
        <router-link to="/signup">Signup</router-link>
      </div>
      <span class="profile-link"><img :src="'assets/avatar.svg'" alt="Profile"></span>
    </nav>
  </header>
</template>
