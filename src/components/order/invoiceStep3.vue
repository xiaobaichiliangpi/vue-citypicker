<template>
  <mn-scroller>
    <mn-container>
      <mn-form :validate="$v" @success="nextStep" ref="form" class="address">
        <mn-section>

          <mn-card>
            <mn-card-item>
              <mn-card-prefix>
                <mn-label :validate="$v.models.TaxNumber">纳税人编号</mn-label>
              </mn-card-prefix>
              <mn-card-body>
                <mn-input v-model="models.TaxNumber"
                 placeholder="纳税人识别号或统一社会信用代码"></mn-input>
              </mn-card-body>
            </mn-card-item>
            <mn-card-item>
              <mn-card-prefix>
                <mn-label :validate="$v.models.BankOfDeposit">开户银行</mn-label>
              </mn-card-prefix>
              <mn-card-body>
                <mn-input v-model="models.BankOfDeposit"
                 placeholder="公司开户银行"></mn-input>
              </mn-card-body>
            </mn-card-item>
            <mn-card-item>
              <mn-card-prefix>
                <mn-label :validate="$v.models.BankAccount">银行账号</mn-label>
              </mn-card-prefix>
              <mn-card-body>
                <mn-input v-model="models.BankAccount"
                 placeholder="公司开户银行账号"></mn-input>
              </mn-card-body>
            </mn-card-item>
          </mn-card>

          <mn-section-note>
            <mn-helper :validate="$v.models.TaxNumber">
              <mn-helper-item name="required">需要填写纳税人编号</mn-helper-item>
              <mn-helper-item name="minLength">纳税人编号要大于 2 位</mn-helper-item>
              <mn-helper-item name="maxLength">纳税人编号要小于 40 位</mn-helper-item>
            </mn-helper>
            <mn-helper :validate="$v.models.BankOfDeposit">
              <mn-helper-item name="required">需要填写开户银行</mn-helper-item>
              <mn-helper-item name="minLength">开户银行要大于 2 位</mn-helper-item>
              <mn-helper-item name="maxLength">开户银行要小于 40 位</mn-helper-item>
            </mn-helper>
            <mn-helper :validate="$v.models.BankAccount">
              <mn-helper-item name="required">需要填写银行账号</mn-helper-item>
              <mn-helper-item name="minLength">银行账号要大于 2 位</mn-helper-item>
              <mn-helper-item name="maxLength">银行账号要小于 40 位</mn-helper-item>
            </mn-helper>
          </mn-section-note>
        </mn-section>

        <div class="submit-btn">
          <mn-btn theme="primary" block :disabled="disabledButton" ref="submit">下一步</mn-btn>
        </div>
      </mn-form>
    </mn-container>
  </mn-scroller>
</template>

<script>
  import input from 'vue-human/suites/input'
  import { mapGetters } from 'vuex'
  import {
    required,
    minLength,
    maxLength } from 'vuelidate/lib/validators'

  export default {
    components: {
      ...input.map()
    },
    validations: {
      models: {
        BankAccount: {
          required,
          minLength: minLength(2),
          maxLength: maxLength(40)
        },
        BankOfDeposit: {
          required,
          minLength: minLength(2),
          maxLength: maxLength(40)
        },
        TaxNumber: {
          required,
          minLength: minLength(2),
          maxLength: maxLength(40)
        }
      }
    },
    data () {
      return {
        models: {
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
      },
      ...mapGetters({
        qualification: 'qualification'
      })
    },
    methods: {
      nextStep () {
        this.$store.commit('UPDATE_QUALIFICATION', {...this.qualification, ...this.models})
        this.$router.push({name: 'uploadInvoices'})
      }
    },
    created () {
      if (this.qualification.ApplyName) {
        this.models.BankAccount = this.qualification.BankAccount
        this.models.BankOfDeposit = this.qualification.BankOfDeposit
        this.models.TaxNumber = this.qualification.TaxNumber
      }
    },
    beforeDestroy () {
      if (this.alertLayer) this.alertLayer.destroy()
      if (this.loadingmask) this.loadingmask.destroy()
    }
  }
</script>

<style lang="scss" scoped>
  .mn-input {
    font-size: 0.875rem;
  }
</style>
