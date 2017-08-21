<template>
  <mn-scroller>
    <mn-container>
      <div class="order-result">
        <div>
          <mn-icon :name="icons.close" style="color: #fd6466;" :scale="2.5" ></mn-icon>
          <div class="order-result-success-text" style="color: #fd6466;">
            订单支付失败
          </div>
          <div class="tip">
            订单未支付成功
          </div>
        </div>
      </div>

      <div class="submit-btn">
        <mn-btn theme="primary" ref="submit" block @click="backHome">返回提货卡首页</mn-btn>
      </div>
    </mn-container>
  </mn-scroller>
</template>

<script>
  export default {
    components: {
    },
    data () {
      return {
        icons: {
          checkmark: require('vue-human-icons/js/ios/checkmark'),
          information: require('vue-human-icons/js/ios/information'),
          close: require('vue-human-icons/js/ios/close')
        }
      }
    },
    computed: {
    },
    methods: {
      backHome () {
        if (/micromessenger/.test(navigator.userAgent.toLowerCase())) {
          this.$router.go(-2)
        } else {
          let length = window.history.length
          this.$router.go(2 - length)
        }
      }
    },
    created () {
      window.zhuge.track('提货卡下单结果', {
        '结果': 0,
        '备注': '拉取支付失败'
      })
    },
    beforeDestroy () {
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
