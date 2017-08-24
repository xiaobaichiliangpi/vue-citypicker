<template>
  <mn-scroller class="exchange">
    <mn-container>
      <div class="exchange-header">
        <img src="../../assets/banner1-1.jpg">
      </div>
      <mn-form :validate="$v" @success="success" ref="form" class="address">
        <mn-card>
          <mn-card-item>
            <mn-card-body>
              <mn-input v-model="models.cardNum"
               placeholder="输入卡号"></mn-input>
            </mn-card-body>
          </mn-card-item>
          <mn-card-item style="border-bottom: solid 1px rgba(0, 0, 0, 0.1);">
            <mn-card-body>
              <mn-input v-model="models.passwd"
               placeholder="输入卡片密码"></mn-input>
            </mn-card-body>
          </mn-card-item>
        </mn-card>

         <mn-section-note>
          <mn-helper :validate="$v.models.cardNum">
            <mn-helper-item name="required">请输入卡号</mn-helper-item>
            <mn-helper-item name="minLength">卡号长度应为8位</mn-helper-item>
            <mn-helper-item name="maxLength">卡号长度应为8位</mn-helper-item>
          </mn-helper>
        </mn-section-note>

        <mn-section-note>
          <mn-helper :validate="$v.models.passwd">
            <mn-helper-item name="required">请输入卡片密码</mn-helper-item>
            <mn-helper-item name="minLength">密码长度应为6位</mn-helper-item>
            <mn-helper-item name="maxLength">密码长度应为6位</mn-helper-item>
          </mn-helper>
        </mn-section-note>

        <div class="submit-btn">
          <mn-btn theme="primary" ref="submit" block>我要提货</mn-btn>
        </div>
        <div class="form-footer">
          <div @click="$router.push({name: 'homepage'})">购买提货卡</div>
          <div>我的提货卡记录</div>
        </div>
      </mn-form>
    </mn-container>
  </mn-scroller>
</template>

<script>
  import input from 'vue-human/suites/input'
  import {
    required,
    minLength,
    maxLength } from 'vuelidate/lib/validators'
  import Alert from 'vue-human/utils/Alert'

  export default {
    components: {
      ...input.map()
    },
    validations: {
      models: {
        cardNum: {
          required,
          minLength: minLength(8),
          maxLength: maxLength(8)
        },
        passwd: {
          required,
          minLength: minLength(6),
          maxLength: maxLength(6)
        }
      }
    },
    data () {
      return {
        models: {
          cardNum: undefined,
          passwd: undefined
        }
      }
    },
    methods: {
      success () {
        this.alertLayer = Alert.create({
          title: '该卡片还不能兑换哦~',
          description: '兑换有效期请参考卡片背面说明',
          cancelText: '好的'
        }).show()
      }
    },
    created () {
    },
    beforeDestroy () {
      if (this.alertLayer) this.alertLayer.destroy()
    }
  }
</script>

<style lang="scss">
.exchange {
  background: #fff;
  height: 100%;

  &-header {
    margin-bottom: 2rem;

    img {
      display: block;
      width: 100%;
    }
  }

  .mn-card {
    padding: 0 0.5rem;
  }

  .form-footer {
    color: #49ab34;
    font-size: 0.875rem;
    display: flex;
    justify-content: space-between;
    padding: 1rem;
  }
}
</style>
