<template>
  <mn-scroller class="exchange">
    <mn-container>
      <div class="contact-img">
        <img src="../../assets/logo_bottom.png">
      </div>
      <mn-form :validate="$v" @success="success" ref="form" class="address">
        <mn-card>
          <mn-card-item>
            <mn-card-body>
              <mn-input v-model="models.userName"
               placeholder="请留下姓名"></mn-input>
            </mn-card-body>
          </mn-card-item>
          <mn-card-item style="border-bottom: solid 1px rgba(0, 0, 0, 0.1);">
            <mn-card-body>
              <mn-input v-model="models.phoneNum"
               placeholder="请留下手机号码"></mn-input>
            </mn-card-body>
          </mn-card-item>
        </mn-card>

        <mn-section-note>
          <mn-helper :validate="$v.models.userName">
            <mn-helper-item name="required">请输入姓名</mn-helper-item>
          </mn-helper>
        </mn-section-note>

        <mn-section-note>
          <mn-helper :validate="$v.models.phoneNum">
            <mn-helper-item name="required">输入手机号码</mn-helper-item>
            <mn-helper-item name="phone">手机号码格式不正确</mn-helper-item>
          </mn-helper>
        </mn-section-note>

        <div class="submit-btn">
          <mn-btn theme="primary" ref="submit" block>提交</mn-btn>
        </div>
      </mn-form>
    </mn-container>
  </mn-scroller>
</template>

<script>
  import input from 'vue-human/suites/input'
  import {
    required } from 'vuelidate/lib/validators'
  import { contact } from '../../axios/exchange'
  import Alert from 'vue-human/utils/Alert'
  import LoadingMask from 'vue-human/utils/LoadingMask'

  export default {
    components: {
      ...input.map()
    },
    validations: {
      models: {
        userName: {
          required
        },
        phoneNum: {
          required,
          phone () {
            if (this.models.phoneNum) {
              return /^1[3|4|5|7|8][0-9]{9}$/.test(this.models.phoneNum)
            } else {
              return true
            }
          }
        }
      }
    },
    data () {
      return {
        models: {
          userName: undefined,
          phoneNum: undefined
        }
      }
    },
    methods: {
      success () {
        const data = {
          ...this.models
        }

        this.loadingMaskLayer = LoadingMask.create().show()
        contact(data)
        .then(response => {
          if (this.loadingMaskLayer) this.loadingMaskLayer.destroy()
          this.alertLayer = Alert.create({
            title: '提交成功',
            description: '您的联系方式已送达,我们会尽快和您联系的哦`',
            cancelText: '关闭'
          }).show()
        })
        .catch(error => {
          console.log(error.response)
          if (this.loadingMaskLayer) this.loadingMaskLayer.destroy()
        })
      }
    },
    created () {
    },
    beforeDestroy () {
      if (this.loadingMaskLayer) this.loadingMaskLayer.destroy()
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

.contact-img {
  padding: 4rem 0;
  margin-bottom: 2rem;
  background: #49ab34;

  img {
    display: block;
    width: 60%;
    margin: 0 auto;
  }
}
</style>
