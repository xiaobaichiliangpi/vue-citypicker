<template>
  <mn-scroller @bottom="onScrollBottom">
    <mn-container>
      <mn-card v-for="(item, key) in orders" :key="key" v-if="orders">
         <mn-card-item >
          <mn-card-prefix>
            <mn-label>订单状态</mn-label>
          </mn-card-prefix>
          <mn-card-body>
            {{item.orderStatus === 2 ? '支付成功' : '未支付'}}
          </mn-card-body>
        </mn-card-item>
        <mn-card-item>
          <mn-card-prefix>
            <mn-label>订单编号</mn-label>
          </mn-card-prefix>
          <mn-card-body>
          {{item.pickupcardOrderId}}
          </mn-card-body>
        </mn-card-item>
        <mn-card-item>
          <mn-card-prefix>
            <mn-label>下单时间</mn-label>
          </mn-card-prefix>
          <mn-card-body>
          {{new Date(item.createTime).toLocaleString()}}
          </mn-card-body>
        </mn-card-item>
        <mn-card-item type="link">
          <mn-card-prefix>
            <mn-label>配送信息</mn-label>
          </mn-card-prefix>
          <mn-card-body>
          {{item.deliverStatus === 0 ? '未发货' : '已发货'}}
          </mn-card-body>
        </mn-card-item>
        <mn-card-item type="link">
          <mn-card-prefix>
            <mn-label>发票信息</mn-label>
          </mn-card-prefix>
          <mn-card-body>
          {{!item.receiptBean ? '不需要发票' : item.receiptBean.receiptType === 0 ? '增值税普通发票' : '增值税专用发票'}}
          </mn-card-body>
        </mn-card-item>
        <mn-card-item type="link" class="list-card-item" style="padding-top: 2rem;">
          <mn-card-prefix>
            <mn-label>购买清单</mn-label>
          </mn-card-prefix>
          <mn-card-body class="buyed-warrper">
            <div class="buyed-list">
              <div class="buyed-item" v-for="(product, pKey) in item.calculateDetailList.slice(0, 3)" :key="pKey">
                <img :src="product.imagePath">
              </div>
            </div>
            <div class="buyed-info">
              <div>
                ¥{{item.totalPrice}}
              </div>
              <div>共{{item.totalnum}}件</div>
            </div>
          </mn-card-body>
        </mn-card-item>
      </mn-card>

      <div class="loading-text" v-if="loading"><mn-loading-icon></mn-loading-icon>正在加载中</div>
      <div class="loading-text" v-if="!nextHref">没有更多了</div>
    </mn-container>
  </mn-scroller>
</template>

<script>
  import { orderList } from '../../axios/product'
  import { mapGetters } from 'vuex'

  export default {
    components: {
    },
    data () {
      return {
        orders: undefined,
        loading: false,
        nextHref: true,
        models: {
          page: 0,
          size: 10,
          sort: 'pickupcardOrderId,desc'
        }
      }
    },
    computed: {
      ...mapGetters({
        token: 'token'
      })
    },
    methods: {
      /**
       * 订单
       * @return {[type]} [description]
       */
      async orderList () {
        if (this.loading || !this.nextHref) return

        this.loading = true
        try {
          this.models.customerGuid = this.token.CustomerGuid
          const response = await orderList(this.models)
          response.data._embedded && (this.orders = [...(this.orders || []), ...response.data._embedded.pickupcardOrders])
          this.nextHref = response.data._links.next
          this.models.page += 1
          this.loading = false
        } catch (error) {
          throw error
        }
      },
      /**
       * 滚动到底部
       * @return {[type]} [description]
       */
      onScrollBottom () {
        this.orderList().catch(error => {
          console.log(error)
          this.loading = false
        })
      }
    },
    created () {
      this.orderList()
    }
  }
</script>

<style lang="scss" scoped>
.list-card-item {
  position: relative;
  padding-top: 1.5rem;

  .mn-label {
    padding: 0.5rem 0;
  }

  .is-prefix {
    position: absolute;
    top: 0;
  }

  .buyed-warrper {
    display: flex;
    align-items: center;
  }

  .buyed-list {
    display: flex;
    align-items: center;
    padding-top: 0.5rem;

    .buyed-item {
      width: 4rem;
      height: 4rem;
      margin: 0 0.3rem;

      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
}

.mn-label  {
  color: #666;
}
</style>
