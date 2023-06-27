<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="searchparams.categroyName">
              {{ searchparams.categroyName
              }}<i @click="removeCategoryName">×</i>
            </li>
            <li class="with-x" v-if="searchparams.keyword">
              {{ searchparams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <li class="with-x" v-if="searchparams.trademark">
              {{ searchparams.trademark.split(':')[1]
              }}<i @click="removeTrademark">×</i>
            </li>
            <li
              class="with-x"
              v-for="(attrValue, index) in searchparams.props"
              :key="index"
            >
              {{ attrValue.split(':')[1]
              }}<i @click="removeattrValue(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkget="trademarkget" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }">
                  <a @click="change_sc('1')"
                    >综合<span
                      v-show="isOne"
                      class="iconfont"
                      :class="{ 'icon-up': Asc, 'icon-down': Desc }"
                    ></span
                  ></a>
                </li>
                <li :class="{ active: isTwo }">
                  <a @click="change_sc('2')"
                    >价格<span
                      v-show="isTwo"
                      class="iconfont"
                      :class="{ 'icon-up': Asc, 'icon-down': Desc }"
                    ></span
                  ></a>
                </li>
                <li>
                  <a>新品</a>
                </li>
                <li>
                  <a>评价</a>
                </li>
                <li>
                  <a>销量</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="list in goodsList" :key="list.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- <a href="item.html" target="_blank"
                      ><img :src="list.defaultImg"
                    /></a> -->
                    <router-link :to="{ path: `/detail/${list.id}` }"
                      ><img :src="list.defaultImg"
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i style="margin-left: 3px">{{ list.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="list.title">
                      {{ list.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <Pagination
            :pageNo="searchparams.pageNo"
            :pageSize="searchparams.pageSize"
            :total="total"
            :continues="5"
            @getpageNo="getpageNoo"
          ></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { events } from '@/bus'
import { mapGetters, mapState } from 'vuex'
import SearchSelector from './SearchSelector/SearchSelector'
export default {
  name: 'Search',
  data() {
    return {
      searchparams: {
        category1Id: '',
        category2Id: '',
        category3Id: '',
        categoryName: '',
        keyword: '',
        order: '1:asc',
        pageNo: 1,
        pageSize: 10,
        props: [],
        trademark: ''
      }
    }
  },
  beforeMount() {
    this.updateParams()
  },
  mounted() {
    // console.log('发请求之前', this.searchparams)
    this.getData()
  },
  components: {
    SearchSelector
  },
  computed: {
    ...mapGetters(['goodsList']),
    ...mapState({
      total: (state) => state.search.searchList.total
    }),
    isOne() {
      return this.searchparams.order.indexOf('1') != -1
    },
    isTwo() {
      return this.searchparams.order.indexOf('2') != -1
    },
    Asc() {
      return this.searchparams.order.indexOf('asc') != -1
    },
    Desc() {
      return this.searchparams.order.indexOf('desc') != -1
    }
  },
  methods: {
    getpageNoo(pageN) {
      // console.log(pageN)
      this.searchparams.pageNo = pageN
      this.getData()
    },
    getData() {
      this.$store.dispatch('searchList', this.searchparams)
    },
    updateParams() {
      Object.assign(this.searchparams, this.$route.params, this.$route.query)
    },
    removeCategoryName() {
      this.searchparams.categroyName = undefined
      this.clearAllParams()
      this.getData()
      this.$router.push({ name: 'search', params: this.$route.params })
    },
    removeKeyword() {
      this.searchparams.keyword = undefined
      this.getData()
      events.emit('clear')
      this.$router.push({
        name: 'search',
        query: this.$route.query
      })
    },
    removeTrademark() {
      this.searchparams.trademark = undefined
      this.getData()
      this.$router.push({
        name: 'search',
        query: this.$route.query
      })
    },
    removeattrValue(index) {
      this.searchparams.props.splice(index, 1)
      this.getData()
      // this.$router.push({
      //   name: 'search',
      //   query: this.$route.query
      // })
    },
    clearAllParams() {
      this.searchparams.category1Id = undefined
      this.searchparams.category2Id = undefined
      this.searchparams.category3Id = undefined
    },
    trademarkget(trademark) {
      // console.log('父组件' + trademark)
      this.searchparams.trademark = `${trademark.tmId}:${trademark.tmName}`
      this.getData()
    },
    attrInfo(attr, attrValue) {
      const propss = `${attr.attrId}:${attrValue}:${attr.attrName}`
      if (this.searchparams.props.indexOf(propss) == -1) {
        this.searchparams.props.push(propss)
        this.getData()
      }
      // console.dir(this.searchparams)
      // console.log('父组件', attr.attrId, attr.attrName, attrValue)
    },
    change_sc(flag1) {
      // console.log(flag1)
      if (flag1 == '1') {
        if (this.searchparams.order.indexOf('1') != -1) {
          //现在是1
          this.searchparams.order =
            this.searchparams.order.indexOf('desc') != -1 ? '1:asc' : '1:desc'
        } else {
          this.searchparams.order = '1:asc'
        }
      } else if (flag1 == '2') {
        if (this.searchparams.order.indexOf('2') != -1)
          //现在是2
          this.searchparams.order =
            this.searchparams.order.indexOf('desc') != -1 ? '2:asc' : '2:desc'
        else {
          this.searchparams.order = '2:asc'
        }
      }
      this.getData()
    }
  },
  watch: {
    $route(newVal, oldVal) {
      this.updateParams()
      this.getData()
      this.clearAllParams()
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
