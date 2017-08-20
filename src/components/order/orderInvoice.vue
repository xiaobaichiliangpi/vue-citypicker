<template>
  <mn-scroller>
    <mn-container>
        <mn-card>
          <mn-card-item>
            <mn-card-prefix>
              <mn-label>发票类型</mn-label>
            </mn-card-prefix>
            <mn-card-body>
              {{invoice.receiptType === 1 ? '增值税普通发票' : '增值税专用发票'}}
            </mn-card-body>
          </mn-card-item>
          <mn-card-item>
            <mn-card-prefix>
              <mn-label>发票抬头</mn-label>
            </mn-card-prefix>
            <mn-card-body>
               {{invoice.receiptTitle}}
            </mn-card-body>
          </mn-card-item>
          <mn-card-item>
            <mn-card-prefix>
              <mn-label>纳税人编号</mn-label>
            </mn-card-prefix>
            <mn-card-body>
            {{invoice.taxpayerId}}
            </mn-card-body>
          </mn-card-item>
          <mn-card-item v-if="invoice.receiptType === 2">
            <mn-card-prefix>
              <mn-label>注册地址</mn-label>
            </mn-card-prefix>
            <mn-card-body>
            {{invoice.registeredAddress}}
            </mn-card-body>
          </mn-card-item>
          <mn-card-item v-if="invoice.receiptType === 2">
            <mn-card-prefix>
              <mn-label>注册电话</mn-label>
            </mn-card-prefix>
            <mn-card-body>
              {{invoice.registeredPhone}}
            </mn-card-body>
          </mn-card-item>
          <mn-card-item v-if="invoice.receiptType === 2">
            <mn-card-prefix>
              <mn-label>开户银行</mn-label>
            </mn-card-prefix>
            <mn-card-body>
            {{invoice.bank}}
            </mn-card-body>
          </mn-card-item>
          <mn-card-item v-if="invoice.receiptType === 2">
            <mn-card-prefix>
              <mn-label>银行账号</mn-label>
            </mn-card-prefix>
            <mn-card-body>
            {{invoice.bankAccount}}
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
        invoice: {},
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
          this.invoice = response.data._embedded.pickupcardOrders[0].receiptBean
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
