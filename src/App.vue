<template>
  <Header></Header>
  <router-view></router-view>
  <Footer v-show="$route.meta.footerShow"></Footer>
</template>

<script>
import Header from '@/components/Header/index.vue'
import Footer from '@/components/Footer/index.vue'
export default {
  data() {
    return {}
  },
  mounted() {
    this.$store.dispatch('categroyList')
  },
  methods: {},
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="less">
// body {
//   overflow: hidden;
//   padding-right: 0 !important;
//   margin-right: 0 !important;
// }
</style>
