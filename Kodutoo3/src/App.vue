<template>
  <SiteHeader />
  <router-view />
  <SiteFooter />
</template>

<script>
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'

export default {
  components: { SiteHeader, SiteFooter }
}
</script>
