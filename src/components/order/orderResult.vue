<template>
  <mn-scroller>
    <mn-container>
      <div class="order-result">
        <div v-if="orderDetail && orderDetail.orderStatus === 2">
          <mn-icon :name="icons.checkmark" style="color: #49ab34;" :scale="2.5" ></mn-icon>
          <div class="order-result-success-text">
            订单支付成功
          </div>
          <div class="tip">
            订单详情及配送信息可从我的礼赠卡订单中查询
          </div>
        </div>
        <div v-else>
          <mn-icon :name="icons.information" style="color: #108ee9;" :scale="2.5"></mn-icon>
          <div class="order-result-default-text">
            <mn-loading-icon></mn-loading-icon>等待支付结果
          </div>
          <div class="tip">
            如果长时间未收到支付结果,请根据订单号联系客服~
          </div>
        </div>
      </div>

      <div class="submit-btn">
        <mn-btn theme="primary" ref="submit" block>前往我的订单</mn-btn>
      </div>
    </mn-container>
  </mn-scroller>
</template>

<script>
  import { orderList } from '../../axios/product'

  export default {
    components: {
    },
    data () {
      return {
        icons: {
          checkmark: require('vue-human-icons/js/ios/checkmark'),
          information: require('vue-human-icons/js/ios/information'),
          close: require('vue-human-icons/js/ios/close')
        },
        orderDetail: undefined,
        pickupcardOrderId: this.$route.params.orderId,
        timer: undefined
      }
    },
    computed: {
    },
    methods: {
      async orderList () {
        try {
          const response = await orderList({pickupcardOrderId: this.pickupcardOrderId})
          this.orderDetail = response.data._embedded.pickupcardOrders[0]
        } catch (error) {
          throw error
        }
      },
      pollOrder () {
        this.timer = window.setInterval(() => {
          this.orderList()
          if (this.orderDetail && this.orderDetail.orderStatus === 2) {
            window.clearInterval(this.timer)
            this.timer = undefined
          }
        }, 3000)
      }
    },
    created () {
      this.pollOrder()
    }
  }
</script>

<style lang="scss" scoped>
.order-result {
  background: #fff;
  padding: 2rem 1rem 0.5rem;
  text-align: center;
  margin-bottom: 1rem;

  .mn-icon {
    margin-bottom: 0.5rem;
  }

  &-success-text {
    font-size: 1.3rem;
    color: #49ab34;
    line-height: 1.5;
  }

  &-default-text {
    font-size: 1.3rem;
    color: #108ee9;
    line-height: 1.5;
  }

  .tip {
    font-size: 0.875rem;
    padding: 0.5rem 0;
  }
}
</style>
