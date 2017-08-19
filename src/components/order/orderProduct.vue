<template>
  <mn-scroller>
    <mn-container>
        <mn-card>
          <mn-card-item v-for="(item, key) in products" :key="key" v-if="products">
            <mn-card-prefix>
              <div class="img" style="width: 80px; height: 80px;background: #ccc;">
                <img :src="item.imagePath">
              </div>
            </mn-card-prefix>
            <mn-card-body>
              <div class="product-title">
                {{item.productName}}
              </div>
              <div class="product-info">
                <span style="color: #ee5219; font-size: 1rem;">¥{{item.unitPrice}}</span>
                <span style="color: #999; font-size: 0.875rem;">×{{item.number}}</span>
              </div>
            </mn-card-body>
          </mn-card-item>
        </mn-card>

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
        products: undefined,
        pickupcardOrderId: this.$route.params.orderId
      }
    },
    computed: {
    },
    methods: {
      async orderList () {
        try {
          const response = await orderList({pickupcardOrderId: this.pickupcardOrderId})
          this.products = response.data._embedded.pickupcardOrders[0].calculateDetailList
        } catch (error) {
          throw error
        }
      }
    },
    created () {
      this.orderList()
    },
    beforeDestroy () {
    }
  }
</script>

<style lang="scss" scoped>
.product-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5rem;
}

.product-title {
  font-size: 1rem;
  line-height: 1.5rem;
  height: 3rem;
  overflow: hidden;
}
</style>
