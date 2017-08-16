<template>
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
          <mn-card-item class="order-products-item" v-for="item in order">
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
          <mn-card-item>
            <mn-card-body>
              <p>微信支付</p>
            </mn-card-body>
          </mn-card-item>
          <mn-card-item>
            <mn-card-body>
              <p>支付宝支付</p>
            </mn-card-body>
          </mn-card-item>
        </mn-card>
      </div>

      <div class="order-submit-btn">
        <mn-btn theme="primary" block @click="submitOrder">立即支付</mn-btn>
      </div>
    </mn-container>
  </mn-scroller>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { submitOrder, wxPay } from '../../axios/product'

  export default {
    components: {
    },
    data () {
      return {
      }
    },
    computed: {
      ...mapGetters({
        address: 'address',
        invoices: 'invoices',
        order: 'order',
        token: 'token'
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
      async submitOrder () {
        if (!this.address.consignee) return

        let data = {
          ...this.address,
          customerGuid: this.token.CustomerGuid,
          products: this.products
        }

        const response = await submitOrder(data)
        console.log(response)
      },
      async wxPay () {
        const response = await wxPay()
        console.log(response)
      }
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
</style>
