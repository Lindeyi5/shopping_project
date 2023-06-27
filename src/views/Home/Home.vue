<template>
  <TypeNav></TypeNav>
  <List></List>
  <Recommend></Recommend>
  <Rank></Rank>
  <Like></Like>
  <Floor v-for="val in floorList" :key="val.id" :list="val"></Floor>
  <Brand></Brand>
</template>

<script>
import TypeNav from '@/components/TypeNav/TypeNav.vue'
import List from '@/views/Home/Listcontainer/List.vue'
import Recommend from '@/views/Home/Recomend/Recomend.vue'
import Rank from '@/views/Home/Rank/Rank.vue'
import Like from '@/views/Home/Like/Like.vue'
import Floor from '@/views/Home/Floor/Floor.vue'
import Brand from '@/views/Home/Brand/Brand.vue'
import { mapState } from 'vuex'

export default {
  components: { TypeNav, List, Recommend, Rank, Like, Floor, Brand },
  methods: {},
  mounted() {
    this.$store.dispatch('floorList')
    this.$store.dispatch('reqUserInfo')
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList
    })
  }
}
</script>

<style lang="less" scoped></style>
