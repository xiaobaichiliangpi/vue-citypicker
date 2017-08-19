<template>
  <mn-scroller>
    <mn-container>
      <mn-section>
        <mn-card>
          <mn-card-item>
            <mn-card-prefix>
              <mn-label>申请人</mn-label>
            </mn-card-prefix>
            <mn-card-body>
              <mn-input v-model="models.ApplyName"
               placeholder="请输入您的姓名"></mn-input>
            </mn-card-body>
          </mn-card-item>
          <mn-card-item>
            <mn-card-prefix>
              <mn-label>联系电话</mn-label>
            </mn-card-prefix>
            <mn-card-body>
              <mn-input v-model="models.ContactPhone"
               placeholder="请输入联系方式"></mn-input>
            </mn-card-body>
          </mn-card-item>
        </mn-card>

        <mn-card>
          <mn-card-item>
            <mn-card-prefix>
              <mn-label>开票抬头</mn-label>
            </mn-card-prefix>
            <mn-card-body>
              <mn-input v-model="models.CompanyName"
               placeholder="单位或公司全称"></mn-input>
            </mn-card-body>
          </mn-card-item>
          <mn-card-item>
            <mn-card-prefix>
              <mn-label>注册地址</mn-label>
            </mn-card-prefix>
            <mn-card-body>
              <mn-input v-model="models.CompanyAddress"
               placeholder="请填写公司详细地址，需与注册一致"></mn-input>
            </mn-card-body>
          </mn-card-item>
          <mn-card-item>
            <mn-card-prefix>
              <mn-label>注册电话</mn-label>
            </mn-card-prefix>
            <mn-card-body>
              <mn-input v-model="models.CompanyPhone"
               placeholder="如：0512-88888888"></mn-input>
            </mn-card-body>
          </mn-card-item>
        </mn-card>

        <mn-card>
          <mn-card-item>
            <mn-card-prefix>
              <mn-label>纳税人编号</mn-label>
            </mn-card-prefix>
            <mn-card-body>
              <mn-input v-model="models.TaxNumber"
               placeholder="纳税人识别号或者社会信用代码"></mn-input>
            </mn-card-body>
          </mn-card-item>
          <mn-card-item>
            <mn-card-prefix>
              <mn-label>开户银行</mn-label>
            </mn-card-prefix>
            <mn-card-body>
              <mn-input v-model="models.BankOfDeposit"
               placeholder="公司开户银行"></mn-input>
            </mn-card-body>
          </mn-card-item>
          <mn-card-item>
            <mn-card-prefix>
              <mn-label>银行账号</mn-label>
            </mn-card-prefix>
            <mn-card-body>
              <mn-input v-model="models.BankAccount"
               placeholder="公司开户银行账号"></mn-input>
            </mn-card-body>
          </mn-card-item>
        </mn-card>
      </mn-section>

      <div class="submit-btn">
        <mn-btn theme="primary" block :disabled="disabledButton" @click="nextStep">下一步</mn-btn>
      </div>
    </mn-container>
  </mn-scroller>
</template>

<script>
  import input from 'vue-human/suites/input'
  import turn from 'vue-human/suites/turn'
  import textarea from 'vue-human/suites/textarea'

  export default {
    components: {
      ...input.map(),
      ...textarea.map(),
      ...turn.map()
    },
    data () {
      return {
        models: {
          CompanyName: undefined,
          CompanyAddress: undefined,
          CompanyPhone: undefined,
          BankAccount: undefined,
          BankOfDeposit: undefined,
          TaxNumber: undefined
        }
      }
    },
    computed: {
      disabledButton () {
        for (let key in this.models) {
          if (!this.models[key]) return true
        }

        return false
      }
    },
    methods: {
      nextStep () {
        this.$store.commit('UPDATE_QUALIFICATION', this.models)
        this.$router.push({name: 'uploadInvoices'})
      }
    },
    created () {
    },
    beforeDestroy () {
      if (this.alertLayer) this.alertLayer.destroy()
      if (this.loadingmask) this.loadingmask.destroy()
    }
  }
</script>

<style lang="scss">
</style>
