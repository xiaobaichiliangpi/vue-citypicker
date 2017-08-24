<template>
  <mn-scroller>
    <mn-container>
      <div class="order-result">
        <div>
          <mn-icon :name="icons.checkmark" style="color: #49ab34;" :scale="2.5" ></mn-icon>
          <div class="order-result-success-text">
            提货成功!我们会尽快为您发货
          </div>
          <div class="tip">
            可在我的提货记录中查看配送详情
          </div>
        </div>
      </div>

      <div class="submit-btn">
        <mn-btn theme="primary" ref="submit" block @click="backHome">返回提货页</mn-btn>
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
          checkmark: require('vue-human-icons/js/ios/checkmark')
        }
      }
    },
    computed: {
    },
    methods: {
      backHome () {
        this.$router.go(-2)
      }
    },
    created () {
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
