<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('getpageNo', pageNo - 1)">
      上一页
    </button>
    <button
      v-if="start_and_end.start > 1"
      @click="$emit('getpageNo', 1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>

    <button v-if="start_and_end.start > 1">···</button>

    <button
      v-for="(numm, index) in filterArr"
      :key="index"
      @click="$emit('getpageNo', numm)"
      :class="{ active: pageNo == numm }"
    >
      {{ numm }}
    </button>

    <button v-if="start_and_end.end != start_and_end.totalPage">···</button>
    <button
      v-if="start_and_end.end != start_and_end.totalPage"
      @click="$emit('getpageNo', totalPage)"
      :class="{ active: pageNo == totalPage }"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo == totalPage"
      @click="$emit('getpageNo', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
    <!-- <div>{{ start_and_end }}</div> -->
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['pageNo', 'pageSize', 'total', 'continues'],
  computed: {
    filterArr() {
      let arry1 = []
      for (let i = this.start_and_end.start; i <= this.start_and_end.end; i++) {
        arry1.push(i)
      }
      return arry1
    },
    totalPage() {
      return Math.ceil(this.total / this.pageSize)
    },
    start_and_end() {
      let { pageNo, continues, totalPage } = this
      let start = 0
      let end = 0
      start = pageNo - Math.floor(continues / 2)
      end = pageNo + Math.floor(continues / 2)
      if (totalPage < continues) {
        start = 1
        end = totalPage
      } else {
        if (start < 1) {
          start = 1
          end = 1 + continues - 1
        }
        if (end > totalPage) {
          end = totalPage
          start = end - continues + 1
        }
      }
      return { start, pageNo, end, totalPage }
    }
  },
  watch: {
    pageNo(newval, oldval) {
      window.scrollTo({
        top: 0
        // behavior: 'smooth'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
  .active {
    background-color: skyblue;
  }
}
</style>
