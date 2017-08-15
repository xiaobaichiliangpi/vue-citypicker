<template>
  <mn-scroller>
    <mn-container>
      <div>头部</div>
      <div class="products">
        <div class="products-item">
          <div class="products-image">
            <img src="https://picpro-sz.34580.com/sz/ImageUrl/41911/480.png">
          </div>
          <div class="products-title">
            【提货卡】法国进口红酒拉菲传奇2013波尔多干红葡萄酒双支礼盒装
          </div>
          <div class="products-footer">
            <div class="products-price">
              ¥
              <span class="price-main">500</span>
              <span>.00</span>
            </div>
            <div class="products-action">
              <mn-counter v-model="counter" :min="0" v-if="counter > 0"></mn-counter>
              <div class="cart-btn" v-else>
                <mn-icon :name="icons.cart" :scale="0.8"></mn-icon>
              </div>
            </div>
          </div>
        </div>
        <div class="products-item">
          <div class="products-image">
            <img src="https://picpro-sz.34580.com/sz/ImageUrl/41911/480.png">
          </div>
          <div class="products-title">
            【提货卡】法国进口红酒拉菲传奇2013波尔多干红葡萄酒双支礼盒装
          </div>
          <div class="products-footer">
            <div class="products-price">
              ¥
              <span class="price-main">500</span>
              <span>.00</span>
            </div>
            <div class="products-action">
              <mn-counter v-model="counter" :min="0" v-if="counter > 0"></mn-counter>
              <div class="cart-btn" v-else>
                <mn-icon :name="icons.cart" :scale="0.8"></mn-icon>
              </div>
            </div>
          </div>
        </div>
        <div class="products-item">
          <div class="products-image">
            <img src="https://picpro-sz.34580.com/sz/ImageUrl/41911/480.png">
          </div>
          <div class="products-title">
            【提货卡】法国进口红酒拉菲传奇2013波尔多干红葡萄酒双支礼盒装
          </div>
          <div class="products-footer">
            <div class="products-price">
              ¥
              <span class="price-main">500</span>
              <span>.00</span>
            </div>
            <div class="products-action">
              <mn-counter v-model="counter" :min="0" v-if="counter > 0"></mn-counter>
              <div class="cart-btn" v-else>
                <mn-icon :name="icons.cart" :scale="0.8"></mn-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="cart-bottom">
        <div class="cart-info">
          <div class="cart-total">小计: ¥0.00</div>
          <div class="cart-count">已选0种, 共0件</div>
        </div>
        <div class="cart-btn" @click="submit">确认购买(0)</div>
      </div>
      <sign-modal :openModal="toggleModal" @successSign="successSign"></sign-modal>
    </mn-container>
  </mn-scroller>
</template>

<script>
  import counter from 'vue-human/suites/counter'
  import SignModal from '../sign/modalSign.vue'

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
        toggleModal: false
      }
    },
    methods: {
      submit () {
        this.toggleModal = !this.toggleModal
      },
      successSign () {
        console.log('denglu chenggong')
      }
    }
  }
</script>

<style lang="scss">
  .products {
    padding-bottom: 4rem;

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
        border-radius: 50%;

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
      background: #d8d8d8;
      color: #989898;
      font-size: 1rem;
    }
  }
</style>
