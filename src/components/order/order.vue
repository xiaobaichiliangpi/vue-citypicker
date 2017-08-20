<template>
  <div>
    <mn-scroller>
      <mn-container class="order">
        <div class="order-address">
          <mn-card>
            <mn-card-item type="link" @click="$router.push({name: 'orderAddress'})">
              <mn-card-body>
                <p>
                  收货信息
                  <span v-if="address">{{address.consignee}}</span>
                  <span v-if="address">{{address.consigneePhonenum}}</span>
                </p>
                <p class="order-address-info">
                  {{address && address.consigneeAddress || '请填写收货地址'}}
                </p>
              </mn-card-body>
            </mn-card-item>
          </mn-card>
        </div>

        <div class="order-products">
          <h3>商品清单</h3>
          <mn-card>
            <mn-card-item
              class="order-products-item"
              v-for="(item, key) in order"
              :key="key">
              <mn-card-prefix>
                <div class="order-image">
                  <img src="https://picpro-sz.34580.com/sz/ImageUrl/41911/480.png">
                </div>
              </mn-card-prefix>
              <mn-card-body>
                <div class="order-products-title">
                  {{item.productName}}
                </div>
                <div class="order-products-count">
                  <div>¥{{item.price}}</div>
                  <div>×{{item.saledNum}}</div>
                </div>
              </mn-card-body>
            </mn-card-item>
            <mn-card-item class="order-info">
              <mn-card-body>
                <p>¥{{totalAmount}}</p>
                <small>共{{totalNum}}件</small>
              </mn-card-body>
            </mn-card-item>
          </mn-card>
        </div>

        <div class="order-invoices">
          <mn-card>
            <mn-card-item type="link" @click="$router.push({name: 'orderInvoices'})">
              <mn-card-body>
                <div>
                  发票
                </div>
                <div>
                  {{invoices.needInvoices ? invoices.invoicesLabel : '不需要发票'}}
                </div>
              </mn-card-body>
            </mn-card-item>
          </mn-card>
        </div>

        <div class="order-paytype">
          <h3>支付方式</h3>
          <mn-card>
            <mn-card-item v-if="checkWx()">
              <mn-card-body>
                <p>微信支付</p>
                <mn-icon :name="icons.check"></mn-icon>
              </mn-card-body>
            </mn-card-item>
            <mn-card-item v-else>
              <mn-card-body>
                <p>支付宝支付</p>
                <mn-icon :name="icons.check"></mn-icon>
              </mn-card-body>
            </mn-card-item>
          </mn-card>
        </div>

        <div class="alipaysubmit" v-html="aliPayHtml" v-if="aliPayHtml">
        </div>

      </mn-container>
    </mn-scroller>
    <div class="order-submit-btn">
      <mn-btn theme="primary" block @click="onClickSubmit">立即支付</mn-btn>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { submitOrder } from '../../axios/product'
  import { wxPay, aliPay } from '../../axios/user'
  import Alert from 'vue-human/utils/Alert'
  import LoadingMask from 'vue-human/utils/LoadingMask'

  export default {
    components: {
    },
    data () {
      return {
        icons: {
          check: require('vue-human-icons/js/ios/checkmark-empty')
        },
        aliPayHtml: '',
        orderId: undefined
      }
    },
    computed: {
      ...mapGetters({
        address: 'address',
        invoices: 'invoices',
        order: 'order',
        token: 'token',
        openid: 'openid'
      }),
      totalAmount () {
        let total = 0
        this.order && this.order.forEach(item => {
          total += item.saledNum * item.price
        })
        return total.toFixed(2)
      },
      totalNum () {
        let total = 0
        this.order && this.order.forEach(item => {
          total += item.saledNum
        })
        return total
      },
      products () {
        let products = {}
        this.order.forEach(item => {
          products[item.pickupcardProductId] = item.saledNum
        })
        return products
      }
    },
    methods: {
      onClickSubmit () {
        if (!this.address.consignee) {
          this.alertLayer = Alert.create({
            title: '地址未填写',
            cancelText: '知道了'
          }).show()

          return
        }

        this.loadingmask = LoadingMask.create({
        }).show()

        this.submitOrder()
        .then(response => {
          const order = response.data

          if (this.checkWx()) {
            this.wxPay(order)
          } else {
            this.aliPay(order)
          }
        }).catch(error => {
          console.log(error)
          if (this.loadingmask) this.loadingmask.destroy()
        })
      },
      /**
       * 提交订单
       * @return {[type]} [description]
       */
      async submitOrder () {
        let data = {
          ...this.address,
          customerGuid: this.token.CustomerGuid,
          products: this.products
        }

        if (this.invoices.needInvoices) {
          let invoices = {
            receiptType: this.invoices.invoicesType,
            ...this.invoices.content
          }

          data = {...data, receiptInputBean: invoices}
        }
        const response = await submitOrder(data)
        return response
      },
      async wxPay (order) {
        const data = {
          Amount: order.totalPrice,
          OrderId: order.pickupcardOrderId,
          OpenId: this.openid,
          Ip: window.localStorage.getItem('LOCALIP')
        }

        this.orderId = order.pickupcardOrderId
        const response = await wxPay(data)
        if (this.loadingmask) this.loadingmask.destroy()
        if (response.data.Error !== 0) {
          this.alertLayer = Alert.create({
            title: '拉取支付失败~',
            cancelText: '知道了'
          }).show().on('cancel', () => {
            this.$store.commit('UPDATE_ORDER', [])
            this.$router.push({name: 'errorPay'})
          })
        } else {
          this.wxPayData = response.data.Data.WxPay.prepay
          this.wxPayBridge()
        }
      },
      async aliPay (order) {
        const data = {
          Amount: order.totalPrice,
          OrderId: order.pickupcardOrderId,
          ReturnUrl: `${window.location.origin}/#/order/result/${order.pickupcardOrderId}`,
          ShowUrl: `${window.location.origin}/#/order/result/${order.pickupcardOrderId}`
        }

        const response = await aliPay(data)
        if (this.loadingmask) this.loadingmask.destroy()
        if (response.data.Error !== 0) {
          this.alertLayer = Alert.create({
            title: '拉取支付失败~',
            cancelText: '知道了'
          }).show().on('cancel', () => {
            this.$store.commit('UPDATE_ORDER', [])
            this.$router.push({name: 'errorPay'})
          })
        }
        this.aliPayHtml = response.data.Data.PreSignStr

        this.$nextTick(() => {
          this.$store.commit('UPDATE_ORDER', [])
          this.submitToAli()
        })
      },
      checkWx () {
        return /micromessenger/.test(navigator.userAgent.toLowerCase())
      },
      submitToAli () {
        document.forms['alipaysubmit'].submit()
      },
      wxPayBridge () {
        /* eslint-disable */
        if (typeof WeixinJSBridge === "undefined") {
          if( document.addEventListener ) {
            document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false)
          } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady)
            document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady)
          }
        } else {
          this.onBridgeReady()
        }
      },
      onBridgeReady () {
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', this.wxPayData,
          res => {
            if (res.err_msg == "get_brand_wcpay_request:ok" ) {
              this.$store.commit('UPDATE_ORDER', [])
              this.$router.push({name: 'orderResult', params: { orderId: this.orderId }})
            }
         }
        )
      }
    },
    mounted () {
      if (this.order && this.order.length <= 0) {
        this.$router.push({name: 'homepage'})
      }
    },
    beforeDestroy () {
      if (this.alertLayer) this.alertLayer.destroy()
      if (this.loadingmask) this.loadingmask.destroy()
    }
  }
</script>

<style lang="scss">
.order {
  padding-bottom: 3rem;

  h3 {
    font-size: 1rem;
  }
}

.order-address {
  span {
    padding-left: 1rem;
  }

  &-info {
    font-size: 0.875rem;
    color: #989898;
  }
}

.order-products {
  background: #fff;
  padding: 0 1rem;

  .mn-card {
    &-item:not(:last-child) {
      border: none !important;
    }
  }

  .order-image {
    width: 4rem;
    height: 4rem;
    border: 1px solid #ddd;
    border-radius: 4px;

    img {
      display: block;
      width: 100%;
    }
  }

  .mn-card-item {
    padding: 0.75rem 0;
  }

  &-item {
    .mn-card-body {
      display: flex;
    }

    .order-products-title {
      padding: 0 0.5rem;
      font-size: 1rem;
      line-height: 1.3rem;
      height: 3.9rem;
      overflow: hidden;
      flex: 1;
    }

    .order-products-count {
      color: #626262;
      font-size: 0.875rem;
      flex: 0 0 4.5rem;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: center;

      div:first-child {
        color: #f05423;
        font-size: 1rem;
      }
    }
  }
}

.order-info {
  text-align: right;
  color: #656565;

  p {
    font-size: 1rem;
    color: #f05423;
  }
}

.order-invoices {
  .mn-card-body {
    display: flex;
    justify-content: space-between;
    padding-right: 1rem;
  }
}

.order-paytype {
  h3 {
    padding-left: 1rem;
    margin-bottom: 0.75rem;
    color: #989898;
  }
}

.order-submit-btn {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;

  .mn-btn.is-primary {
    border-radius: 0;
    background-color: #f05423;
    color: #fff;

    &:active,
    &:hover {
      background-color: darken(#f05423, 10%);
    }
  }
}

.order-paytype {
  .mn-card-body {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
