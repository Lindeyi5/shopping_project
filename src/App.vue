<template>
  <Header></Header>
  <router-view style="height: 100px"></router-view>
  <Footer v-show="$route.meta.footerShow"></Footer>
  <!-- <button @click="aaa">dl</button> -->
</template>

<script>
import Header from '@/components/Header/index.vue'
import Footer from '@/components/Footer/index.vue'
export default {
  data() {
    return {}
  },
  methods: {
    aaa() {
      console.log(this.$route)
      console.log(this.$router)
    }
  },
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="less"></style>
