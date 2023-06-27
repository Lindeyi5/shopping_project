<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(skuImage, index) in skuImageList"
        :key="skuImage.id"
      >
        <img
          :src="skuImage.imgUrl"
          :class="{ active: currentIndex == index }"
          @mouseenter="changeActive(index)"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import swiper from 'swiper'
import { events } from '@/bus'
export default {
  name: 'ImageList',
  props: ['skuImageList'],
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    changeActive(index) {
      this.currentIndex = index
      events.emit('currentIndex', this.currentIndex)
    }
  },
  watch: {
    skuImageList: {
      immediate: true,
      deep: true,
      //轮播图有切换多出的问题可以在swiper中加入circular: true,
      //轮播图有问题的在nextTick前添加if (this.list.length === 0) return;
      handler(oldval, newval) {
        // if (this.list.length === 0) return
        this.$nextTick(() => {
          new swiper('.swiper-container', {
            direction: 'horizontal', // 垂直切换选项
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            },
            slidesPerGroup: 3,
            slidesPerView: 3
          })
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      // &:hover {
      //   border: 2px solid #f60;
      //   padding: 1px;
      // }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>
