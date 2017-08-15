<template>
  <mn-scroller>
    <mn-container>
      <mn-section>
        <p class="title">委托书模板将通过邮件发送到您指定的邮箱</p>
        <mn-card>
          <mn-card-item>
            <mn-card-prefix>
              <mn-label>邮箱地址</mn-label>
            </mn-card-prefix>
            <mn-card-body>
              <mn-input v-model="models.EmaillAddress"
               placeholder="请输入您的邮箱"></mn-input>
            </mn-card-body>
          </mn-card-item>
        </mn-card>
      </mn-section>

      <div class="submit-btn">
        <mn-btn
          theme="primary"
          block
          :disabled="!models.EmaillAddress || !/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(models.EmaillAddress)"
          ref="submit"
          @click="submit">发送</mn-btn>
      </div>
    </mn-container>
  </mn-scroller>
</template>

<script>
  import input from 'vue-human/suites/input'
  import { sendCommission } from '../../axios/user'
  import LoadingMask from 'vue-human/utils/LoadingMask'
  import Alert from 'vue-human/utils/Alert'

  export default {
    components: {
      ...input.map()
    },
    data () {
      return {
        models: {
          EmaillAddress: undefined
        }
      }
    },
    methods: {
      /**
       * 成功提交表单
       * @method success
       * @return {Promise}
       */
      async sendCommission () {
        const response = await sendCommission(this.models)
        return response
      },
      submit () {
        this.loadingmask = LoadingMask.create({
        }).show()
        this.sendCommission()
        .then(response => {
          if (this.loadingmask) this.loadingmask.destroy()

          if (response.data.Error === 0) {
            this.alertLayer = Alert.create({
              title: '发送成功',
              cancelText: '返回'
            }).show().on('cancel', () => {
              this.$router.go(-1)
            })
          } else {
            this.alertLayer = Alert.create({
              title: response.data.Message,
              cancelText: '知道了'
            }).show()
          }
        })
      }
    },
    created () {
    },
    beforeDestroy () {
      if (this.loadingmask) this.loadingmask.destroy()
      if (this.alertLayer) this.alertLayer.destroy()
    }
  }
</script>

<style lang="scss" scoped>
  .title {
    padding: 0.75rem 1rem;
    color: #999;
    font-size: 0.875rem;
  }
</style>
