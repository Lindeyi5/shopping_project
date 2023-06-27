<template>
  <div class="swiper-container" id="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import swiper from 'swiper'
import { nextTick } from 'vue'
export default {
  name: 'Carousel',
  props: ['list'],
  watch: {
    bannerList: {
      immediate: true,
      deep: true,
      //轮播图有切换多出的问题可以在swiper中加入circular: true,
      //轮播图有问题的在nextTick前添加if (this.list.length === 0) return;
      async handler(oldval, newval) {
        // if (this.list.length === 0) return
        await nextTick()
        var mySwiper = new swiper('.swiper-container', {
          direction: 'horizontal', // 垂直切换选项
          loop: true, // 循环模式选项
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
            clickable: 'true'
          },
          circular: true,
          autoplay: {
            delay: 4000
          },
          autoplayDisableOnInteraction: false,
          // 如果需要前进后退按钮
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },

          // 如果需要滚动条
          scrollbar: {
            el: '.swiper-scrollbar'
          }
        })
      }
    }
  }
}
</script>

<style></style>
