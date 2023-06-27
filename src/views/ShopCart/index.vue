<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="cartInfo in cartlistInfo"
          :key="cartInfo.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cartInfo.isChecked"
              @click="changeisChecked(cartInfo, $event.target.checked)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl" />
            <div class="item-msg">
              {{ cartInfo.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cartInfo.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handle('mins', -1, cartInfo)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              minnum="1"
              class="itxt"
              :value="cartInfo.skuNum"
              v-on:blur="handle('change', $event.target.value * 1, cartInfo)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handle('add', 1, cartInfo)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum"
              >{{ cartInfo.skuPrice * cartInfo.skuNum }}.00</span
            >
          </li>
          <li class="cart-list-con7">
            <a
              href="javascript:;"
              class="sindelet"
              @click="deletecart(cartInfo.skuId)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllChecked && cartlistInfo.length > 0"
          @click="AllisChecked($event.target.checked)"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="deleteisChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ sumPrice }}.00</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="gopay">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import throttle from 'lodash/throttle'
export default {
  name: 'ShopCart',
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.$store.dispatch('getCartList')
    },
    handle: throttle(async function (something, disNum, cart) {
      // console.log(something, disNum, cart)
      // console.log(disNum)
      switch (something) {
        case 'add':
          disNum = 1
          break
        case 'mins':
          disNum = cart.skuNum > 1 ? -1 : 0
          break
        case 'change':
          let strr1 = /^[0-9]*[1-9][0-9]*$/
          if (strr1.test(disNum) == false) disNum = 0
          else {
            disNum = disNum - cart.skuNum
          }
          break
      }
      // console.log(disNum)
      try {
        await this.$store.dispatch('goodsCartList', {
          skuid: cart.skuId,
          skuNum: disNum
        })
        this.getData()
      } catch (error) {}
    }, 1500),
    async deletecart(id) {
      // console.log(id)
      try {
        await this.$store.dispatch('deleteCart', id)
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    async changeisChecked(cart, event) {
      // console.log(id)
      try {
        // console.log(id, event)
        let isChecked = event == false ? '0' : '1'
        // console.log(cart.skuId, isChecked)
        await this.$store.dispatch('UpdateisChecked', {
          skuId: cart.skuId,
          isChecked
        })
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    async deleteisChecked() {
      try {
        await this.$store.dispatch('deleteisChecked')
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    async AllisChecked(isChecked) {
      let isCheckedd = isChecked == true ? '1' : '0'
      try {
        await this.$store.dispatch('AllisChecked', isCheckedd)
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    gopay() {
      this.$router.push('/trade')
    }
  },
  computed: {
    ...mapGetters(['cartlist']),
    cartlistInfo() {
      return this.cartlist.cartInfoList || []
    },
    sumPrice() {
      let sum = 0
      this.cartlistInfo.forEach((element) => {
        sum += element.skuPrice * element.skuNum
      })
      return sum
    },
    isAllChecked() {
      // console.log(this.cartlistInfo)
      return this.cartlistInfo.every((item) => {
        return item.isChecked == 1
      })
    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 30px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
