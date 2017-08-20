<template>
  <mn-scroller>
    <mn-container>
        <mn-card>
          <mn-card-item>
            <mn-card-prefix>
              <mn-label>配送信息</mn-label>
            </mn-card-prefix>
            <mn-card-body style="color: #f75121;" v-if="orderDetail.deliverStatus">
            {{orderDetail.deliverStatus === 0 ? '未发货' : '已发货'}}
            </mn-card-body>
          </mn-card-item>
          <mn-card-item v-if="orderDetail && orderDetail.expressCompany">
            <mn-card-prefix>
              <mn-label>配送物流</mn-label>
            </mn-card-prefix>
            <mn-card-body>
            {{orderDetail.expressCompany}}
            </mn-card-body>
          </mn-card-item>
          <mn-card-item v-if="orderDetail && orderDetail.expressNum">
            <mn-card-prefix>
              <mn-label>物流单号</mn-label>
            </mn-card-prefix>
            <mn-card-body>
            {{orderDetail.expressNum}}
            </mn-card-body>
          </mn-card-item>
          <mn-card-item>
            <mn-card-prefix>
              <mn-label>收货人</mn-label>
            </mn-card-prefix>
            <mn-card-body>
            {{orderDetail.consignee}}
            </mn-card-body>
          </mn-card-item>
          <mn-card-item>
            <mn-card-prefix>
              <mn-label>联系电话</mn-label>
            </mn-card-prefix>
            <mn-card-body>
              {{orderDetail.consigneePhonenum}}
            </mn-card-body>
          </mn-card-item>
          <mn-card-item>
            <mn-card-prefix>
              <mn-label>收货地址</mn-label>
            </mn-card-prefix>
            <mn-card-body>
            {{orderDetail.consigneeAddress}}
            </mn-card-body>
          </mn-card-item>
        </mn-card>

    </mn-container>
  </mn-scroller>
</template>

<script>
  import { orderList } from '../../axios/product'
  import LoadingMask from 'vue-human/utils/LoadingMask'

  export default {
    components: {
    },
    data () {
      return {
        orderDetail: {},
        pickupcardOrderId: this.$route.params.orderId
      }
    },
    computed: {
    },
    methods: {
      async orderList () {
        try {
          this.loadingmask = LoadingMask.create({
          }).show()
          const response = await orderList({pickupcardOrderId: this.pickupcardOrderId})
          if (this.loadingmask) this.loadingmask.destroy()
          this.orderDetail = response.data._embedded.pickupcardOrders[0]
          console.log(this.orderDetail)
        } catch (error) {
          if (this.loadingmask) this.loadingmask.destroy()
          throw error
        }
      }
    },
    created () {
      this.orderList()
    },
    beforeDestroy () {
      if (this.loadingmask) this.loadingmask.destroy()
    }
  }
</script>

<style lang="scss">

</style>
