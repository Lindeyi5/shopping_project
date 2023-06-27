<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leave_bg">
        <h2 class="all" @mouseenter="show_itemfun">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-if="show_item">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categroyList"
                :key="c1.categoryId"
                @mouseenter="change_bg(index)"
                :class="{ over_bg: curruntIndex === index }"
              >
                <h3>
                  <a
                    :data-categroyName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <div
                  class="item-list clearfix"
                  :style="{
                    display: curruntIndex == index ? 'block' : 'none'
                    // background: 'pink'
                  }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categroyName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categroyName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import throttle from 'lodash/throttle'
export default {
  name: 'TypeNav',
  data() {
    return {
      curruntIndex: -1,
      show_item: true
    }
  },
  methods: {
    show_itemfun() {
      this.show_item = true
    },
    change_bg: throttle(function (index) {
      this.curruntIndex = index
      // console.log(index)
    }, 50),
    leave_bg() {
      this.curruntIndex = -1
      if (this.$route.path !== '/home') {
        this.show_item = false
      }
    },
    goSearch(event) {
      // console.log(event.target)
      // console.log(event.target.dataset)
      const { categroyname, category1id, category2id, category3id } =
        event.target.dataset
      // console.log(categroyname)
      if (categroyname) {
        const location = { name: 'search' }
        const query = { categroyName: categroyname }
        // console.log(category1id)
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else if (category3id) {
          query.category3Id = category3id
        }
        if (this.$route.params) {
          location.params = this.$route.params
        }
        location.query = query
        this.$router.push(location)
      }
    }
  },
  mounted() {
    if (this.$route.path !== '/home') {
      // console.log('hh')
      this.show_item = false
    }
    // console.log(this.$store)
  },
  computed: {
    ...mapState({
      categroyList: (state) => {
        // console.log(state)
        return state.home.categroyList
      }
    })
  }
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        overflow: hidden;
        height: 450px;
        .item {
          a:hover {
            cursor: pointer;
          }
          h3 {
            line-height: 27px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .over_bg {
          background: rgba(0, 0, 0, 0.1);
        }
      }
    }

    .sort-leave-active,
    .sort-enter-active {
      transition: all 0.04s linear;
    }
    .sort-enter-from,
    .sort-leave-to {
      height: 0px;
    }

    .sort-enter-to,
    .sort-leave-from {
      height: 461px;
    }
  }
}
</style>
