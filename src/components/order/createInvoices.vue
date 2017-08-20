<template>
  <mn-scroller>
    <mn-container>
      <mn-form :validate="$v" @success="nextStep" ref="form" class="address">
        <mn-section>
          <mn-card>
            <mn-card-item>
              <mn-card-prefix>
                <mn-label :validate="$v.models.ApplyName">申请人</mn-label>
              </mn-card-prefix>
              <mn-card-body>
                <mn-input v-model="models.ApplyName"
                 placeholder="请输入您的姓名"></mn-input>
              </mn-card-body>
            </mn-card-item>
            <mn-card-item>
              <mn-card-prefix>
                <mn-label :validate="$v.models.ContactPhone">联系电话</mn-label>
              </mn-card-prefix>
              <mn-card-body>
                <mn-input v-model="models.ContactPhone"
                 placeholder="请输入联系方式"></mn-input>
              </mn-card-body>
            </mn-card-item>
          </mn-card>

          <mn-section-note>
            <mn-helper :validate="$v.models.ApplyName">
              <mn-helper-item name="required">需要填写申请人</mn-helper-item>
              <mn-helper-item name="minLength">姓名要大于 2 位</mn-helper-item>
              <mn-helper-item name="maxLength">姓名要小于 8 位</mn-helper-item>
            </mn-helper>
            <mn-helper :validate="$v.models.ContactPhone">
              <mn-helper-item name="required">需要填写联系电话</mn-helper-item>
              <mn-helper-item name="phone">联系电话格式不对</mn-helper-item>
            </mn-helper>
          </mn-section-note>

          <mn-card>
            <mn-card-item>
              <mn-card-prefix>
                <mn-label :validate="$v.models.CompanyName">开票抬头</mn-label>
              </mn-card-prefix>
              <mn-card-body>
                <mn-input v-model="models.CompanyName"
                 placeholder="单位或公司全称"></mn-input>
              </mn-card-body>
            </mn-card-item>
            <mn-card-item>
              <mn-card-prefix>
                <mn-label :validate="$v.models.CompanyAddress">注册地址</mn-label>
              </mn-card-prefix>
              <mn-card-body>
                <mn-input v-model="models.CompanyAddress"
                 placeholder="请填写注册公司详细地址"></mn-input>
              </mn-card-body>
            </mn-card-item>
            <mn-card-item>
              <mn-card-prefix>
                <mn-label :validate="$v.models.CompanyPhone">注册电话</mn-label>
              </mn-card-prefix>
              <mn-card-body>
                <mn-input v-model="models.CompanyPhone"
                 placeholder="如：0512-88888888"></mn-input>
              </mn-card-body>
            </mn-card-item>
          </mn-card>

          <mn-section-note>
            <mn-helper :validate="$v.models.CompanyName">
              <mn-helper-item name="required">需要填写发票抬头</mn-helper-item>
              <mn-helper-item name="minLength">发票抬头要大于 2 位</mn-helper-item>
              <mn-helper-item name="maxLength">发票抬头要小于 25 位</mn-helper-item>
            </mn-helper>
            <mn-helper :validate="$v.models.CompanyAddress">
              <mn-helper-item name="required">需要填写注册地址</mn-helper-item>
              <mn-helper-item name="minLength">注册地址要大于 2 位</mn-helper-item>
              <mn-helper-item name="maxLength">注册地址要小于 200 位</mn-helper-item>
            </mn-helper>
            <mn-helper :validate="$v.models.CompanyPhone">
              <mn-helper-item name="required">需要填写注册电话</mn-helper-item>
              <mn-helper-item name="minLength">注册电话要大于 2 位</mn-helper-item>
              <mn-helper-item name="maxLength">注册电话要小于 40 位</mn-helper-item>
            </mn-helper>
          </mn-section-note>

          <mn-card>
            <mn-card-item>
              <mn-card-prefix>
                <mn-label :validate="$v.models.TaxNumber">纳税人编号</mn-label>
              </mn-card-prefix>
              <mn-card-body>
                <mn-input v-model="models.TaxNumber"
                 placeholder="纳税人识别号"></mn-input>
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
  import turn from 'vue-human/suites/turn'
  import textarea from 'vue-human/suites/textarea'
  import { mapGetters } from 'vuex'
  import {
    required,
    minLength,
    maxLength } from 'vuelidate/lib/validators'

  export default {
    components: {
      ...input.map(),
      ...textarea.map(),
      ...turn.map()
    },
    validations: {
      models: {
        CompanyName: {
          required,
          minLength: minLength(2),
          maxLength: maxLength(25)
        },
        CompanyAddress: {
          required,
          minLength: minLength(2),
          maxLength: maxLength(200)
        },
        CompanyPhone: {
          required,
          minLength: minLength(2),
          maxLength: maxLength(40)
        },
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
        },
        ApplyName: {
          required,
          minLength: minLength(2),
          maxLength: maxLength(8)
        },
        ContactPhone: {
          required,
          phone () {
            if (this.models.ContactPhone) {
              return /^1[3|4|5|7|8][0-9]{9}$/.test(this.models.ContactPhone)
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
          CompanyName: undefined,
          CompanyAddress: undefined,
          CompanyPhone: undefined,
          BankAccount: undefined,
          BankOfDeposit: undefined,
          TaxNumber: undefined,
          ApplyName: undefined,
          ContactPhone: undefined
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
        this.$store.commit('UPDATE_QUALIFICATION', this.models)
        this.$router.push({name: 'uploadInvoices'})
      }
    },
    created () {
      if (this.qualification.ApplyName) {
        this.models = {...this.qualification}
      }
    },
    beforeDestroy () {
      if (this.alertLayer) this.alertLayer.destroy()
      if (this.loadingmask) this.loadingmask.destroy()
    }
  }
</script>

<style lang="scss">
</style>
