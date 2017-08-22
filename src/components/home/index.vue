<template>
  <div>
    <sign-modal :openModal="toggleModal" @successSign="successSign"></sign-modal>
    <mn-scroller @bottom="onScrollBottom">
      <mn-container>
        <div class="home-header">
          <div @click="pushOrder">
            <img src="../../assets/banner.jpg">
          </div>
        </div>
        <div @click="loginOut" class="loginOutBtn" v-if="checkWx() && token.AccessToken && token.CustomerGuid">退出登录</div>
        <div :class="['products', {'is-andriod': isAndriod && !checkWx()}]">
          <div
            class="products-item"
            v-if="products"
            v-for="(item, key) in products"
            :key="key">
            <div class="products-image">
              <img :src="item.imagePath">
            </div>
            <div class="products-title">
              {{item.productName}}
            </div>
            <div class="products-footer">
              <div class="products-price">
                ¥
                <span class="price-main">{{item.price}}</span>
              </div>
              <div class="products-action">
                <mn-counter v-model="item.saledNum" :min="0" v-if="item.saledNum > 0" :max="99"></mn-counter>
                <div class="cart-btn" v-else @click="addToCart(item)">
                  <mn-icon :name="icons.cart" :scale="0.8"></mn-icon>
                </div>
              </div>
            </div>
          </div>
          <div class="loading-text" v-if="loading"><mn-loading-icon></mn-loading-icon>正在加载中</div>
          <div class="loading-text" v-if="!nextHref">没有更多了</div>
        </div>
      </mn-container>
    </mn-scroller>
    <div class="cart-bottom">
      <div class="cart-info">
        <div class="cart-total">小计: ¥{{totalAmount}}</div>
        <div class="cart-count">已选{{products && products.filter(item => item.saledNum > 0).length}}种, 共{{totalNum}}件</div>
      </div>
      <div class="cart-btn" @click="submitOrder" :class="[{'is-disabled': totalAmount <= 0}]">确认购买({{totalNum}})</div>
    </div>
  </div>
</template>

<script>
  import counter from 'vue-human/suites/counter'
  import SignModal from '../sign/modalSign.vue'
  import { productList } from '../../axios/product'
  import { cityList } from '../../axios/user'
  import { mapGetters } from 'vuex'
  import Alert from 'vue-human/utils/Alert'

  export default {
    components: {
      ...counter.map(),
      SignModal
    },
    data () {
      return {
        counter: undefined,
        icons: {
          cart: require('vue-human-icons/js/ios/cart')
        },
        toggleModal: false,
        products: undefined,
        models: {
          page: 0,
          size: 10
        },
        loading: false,
        nextHref: true
      }
    },
    computed: {
      ...mapGetters({
        token: 'token',
        selectedProducts: 'order',
        openid: 'openid',
        city: 'city'
      }),
      totalAmount () {
        let total = 0
        this.products && this.products.forEach(item => {
          total += item.saledNum * item.price
        })
        return total.toFixed(2)
      },
      totalNum () {
        let total = 0
        this.products && this.products.forEach(item => {
          total += item.saledNum
        })
        return total
      },
      isAndriod () {
        return /Android/gi.test(navigator.userAgent)
      }
    },
    methods: {
      /**
       * 城市列表
       * @return {[type]} [description]
       */
      async cityList () {
        const response = await cityList()
        return response
      },
      /**
       * 提交订单
       * @return {[type]} [description]
       */
      submitOrder () {
        if (this.totalAmount <= 0) return

        if (this.checkSign()) {
          this.$store.commit('UPDATE_ORDER', this.products.filter(item => {
            return item.saledNum > 0
          }))
          window.zhuge.track('确认购买', {
            '触发位置': '提货卡购买页',
            '订单金额': this.totalAmount,
            '已选种类': this.products && this.products.filter(item => item.saledNum > 0).length,
            '商品数量': this.totalNum
          })
          this.$router.push({name: 'orderSubmit'})
        }
      },
      successSign () {
        // this.submitOrder()
      },
      checkSign () {
        if (this.token.AccessToken && this.token.CustomerGuid) return true

        if (this.checkWx()) {
          this.toggleModal = !this.toggleModal
        } else {
          window.location.href = 'http://m.34580.com/login/index'
        }

        return false
      },
      /**
       * 商品
       * @return {[type]} [description]
       */
      async productList () {
        if (this.loading || !this.nextHref) return

        this.loading = true
        const response = await productList(this.models)
        if (response.data._embedded) {
          response.data._embedded && (this.products = [...(this.products || []), ...response.data._embedded.pickupcardProducts])
          this.setSelectedProduct(response.data._embedded.pickupcardProducts)
          this.nextHref = response.data._links.next
          this.models.page += 1
        } else {
          this.products = []
          this.nextHref = false
        }

        this.loading = false
      },
      /**
       * 设置已选择产品
       */
      setSelectedProduct (list) {
        this.selectedProducts && this.selectedProducts.forEach(item => {
          let [product] = list.filter(val => {
            return val.pickupcardProductId === item.pickupcardProductId
          })

          product && (product.saledNum = item.saledNum)
        })
      },
      addToCart (item) {
        item.saledNum = 1
        window.zhuge.track('加入购物车', {
          '触发位置': '提货卡购买页',
          '商品名称': item.productName,
          '商品编号': item.pickupcardProductId
        })
      },
      /**
       * 滚动到底部
       * @return {[type]} [description]
       */
      onScrollBottom () {
        this.productList()
      },
      pushOrder () {
        if (this.checkSign()) this.$router.push({name: 'orderList'})
      },
      checkWx () {
        return /micromessenger/.test(navigator.userAgent.toLowerCase())
      },
      getOpenId () {
        const url = window.location.href

        if (url.includes('openid')) {
          const startIndex = url.indexOf('.com/') + 5
          const endIndex = url.indexOf('#/')

          if (startIndex !== endIndex) {
            const params = url.slice(startIndex, endIndex)
            params.split('&').forEach(item => {
              let param = item.split('=')

              if (param[0].indexOf('openid') > -1) {
                this.$store.commit('UPDATE_OPENID', param[1])
                return true
              }
            })
          }
        }
      },
      loginOut () {
        this.$store.commit('UPDATE_CITY', {})
        this.$store.commit('CLEAR_AUTH_TOKEN')
        this.clearLocal()
        this.alertLayer = Alert.create({
          title: '退出登录成功',
          cancelText: '知道了'
        }).show().on()
      },
      /**
       * 清空本地存储
       * @return {[type]} [description]
       */
      clearLocal () {
        this.$store.commit('UPDATE_ADDRESS', {})
        this.$store.commit('UPDATE_ORDER', [])
        this.$store.commit('UPDATE_INVOICES', {})
        this.$store.commit('UPDATE_QUALIFICATION', {})
      }
    },
    mounted () {
      // 检查微信, 非微信的状态下(app) 将token信息更新
      if (!this.checkWx()) {
        if (this.$route.query.from) {
          this.cityList()
          .then(response => {
            if (response.data.Error === 0) {
              const [city] = response.data.Data.filter(item => {
                let cityid = this.$route.query.cityid
                if (Array.isArray(cityid)) {
                  cityid = cityid[0]
                }

                return (cityid + '') === (item.CityId + '')
              })
              this.$store.commit('UPDATE_CITY', city)
            }
          })

          let queryGuid = this.$route.query.token
          let queryToken = this.$route.query.AccessToken

          if (Array.isArray(queryGuid)) {
            queryGuid = queryGuid[0]
          }

          if (Array.isArray(queryToken)) {
            queryToken = queryToken[0]
          }

          const token = {
            CustomerGuid: queryGuid,
            AccessToken: queryToken
          }
          this.$store.commit('UPDATE_AUTH_TOKEN', token)
        }
      } else {
        if ((!this.getOpenId() && !this.openid) || this.openid === 'undefined') {
          window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa3861f732ba9f532&redirect_uri=http://wechat-1.34580.com/auth&response_type=code&scope=snsapi_base&state=${window.location.origin}|#wechat_redirect`
        }
      }

      // cityid更新
      if (this.$route.query.cityid && this.$route.query.from) {
        this.$store.commit('UPDATE_CITY', {
          value: this.$route.query.cityid
        })
      }

      // sourcetype更新
      if (this.$route.query.SourceType && this.$route.query.from) {
        this.$store.commit('UPDATE_SOURCETYPE', this.$route.query.SourceType)
      }

      this.productList()
      // ..
    },
    watch: {
      '$route.query' (val) {
        if (this.$route.query.from) {
          const token = {
            CustomerGuid: val.token,
            AccessToken: val.AccessToken
          }
          this.$store.commit('UPDATE_AUTH_TOKEN', token)
        }
      },
      'token.CustomerGuid' (val, oldVal) {
        if (val !== oldVal) {
          this.clearLocal()
        }
      }
    },
    beforeDestroy () {
      if (this.alertLayer) this.alertLayer.destroy()
    }
  }
</script>

<style lang="scss">
  .products {
    padding-bottom: 4rem;

    &.is-andriod {
      padding-bottom: 14rem;
    }

    &-item {
      background: #fff;
      padding: 0.625rem;
      margin-bottom: 0.75rem;
    }

    &-image {
      img {
        display: block;
        width: 60%;
        margin: 0 auto;
      }
    }

    &-title {
      color: #333;
      line-height: 1.5rem;
      height: 3rem;
      overflow: hidden;
    }

    &-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &-price {
      color: #f05423;
      font-size: 0.75rem;

      .price-main {
        font-size: 1.125rem;
      }
    }

    &-action {
      .mn-counter-btn {
        width: 1.75rem;
        height: 1.75rem;
        border-radius: 50% !important;

        &:not(.is-disabled) {
          color: #f05423;
        }
      }

      .mn-counter-control {
        padding: 0 0.5rem;
        width: 2.5rem;
        height: 1.7rem;
        border: none;
      }

      .cart-btn {
        width: 1.75rem;
        height: 1.75rem;
        color: #f05423;
        border-radius: 50%;
        border: 1px solid #9b9b9b;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  .cart-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3rem;
    background: #fff;
    box-shadow: 0 -1px 6px rgba(0, 0, 0, 0.1);
    display: flex;

    .cart-info {
      flex: 1;
      padding-left: 0.75rem;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .cart-total {
        font-size: 0.875rem;
        color: #303030;
      }

      .cart-count {
        font-size: 0.75rem;
        color: #9b9b9b;
      }
    }

    .cart-btn {
      width: 43.75%;
      line-height: 3rem;
      text-align: center;
      background: #f05423;
      font-size: 1rem;
      color: #fff;

      &.is-disabled {
        background: #d8d8d8;
        color: #989898;
      }
    }
  }

  .home-header {
    margin-bottom: 1rem;

    img {
      display: block;
      width: 100%;
    }
  }

  .loginOutBtn {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: rgba(0,0,0,.8);
    font-size: 0.875rem;
    color: #fff;
    width: 4.5rem;
    height: 1.8rem;
    line-height: 1.8rem;
    text-align: center;
    border-radius: 0.9rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }
</style>
