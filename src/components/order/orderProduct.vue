<template>
  <mn-scroller>
    <mn-container>
        <mn-card>
          <mn-card-item v-for="(item, key) in products" :key="key" v-if="products">
            <mn-card-prefix class="product-img">
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
  import LoadingMask from 'vue-human/utils/LoadingMask'

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
          this.loadingmask = LoadingMask.create({
          }).show()
          const response = await orderList({pickupcardOrderId: this.pickupcardOrderId})
          if (this.loadingmask) this.loadingmask.destroy()
          this.products = response.data._embedded.pickupcardOrders[0].calculateDetailList
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

.product-img img {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
