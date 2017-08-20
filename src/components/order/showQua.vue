<template>
  <mn-scroller>
    <mn-container>
        <mn-section>
          <mn-card>
            <mn-card-item>
              <mn-card-prefix>
                <mn-label>开票抬头</mn-label>
              </mn-card-prefix>
              <mn-card-body>
                 {{models.CompanyName}}
              </mn-card-body>
            </mn-card-item>
            <mn-card-item>
              <mn-card-prefix>
                <mn-label>注册地址</mn-label>
              </mn-card-prefix>
              <mn-card-body>
                 {{models.CompanyAddress}}
              </mn-card-body>
            </mn-card-item>
            <mn-card-item>
              <mn-card-prefix>
                <mn-label>注册电话</mn-label>
              </mn-card-prefix>
              <mn-card-body>
                 {{models.CompanyPhone}}
              </mn-card-body>
            </mn-card-item>
          </mn-card>

          <mn-card>
            <mn-card-item>
              <mn-card-prefix>
                <mn-label>纳税人编号</mn-label>
              </mn-card-prefix>
              <mn-card-body>
                 {{models.TaxNumber}}
              </mn-card-body>
            </mn-card-item>
            <mn-card-item>
              <mn-card-prefix>
                <mn-label>开户银行</mn-label>
              </mn-card-prefix>
              <mn-card-body>
                 {{models.BankOfDeposit}}
              </mn-card-body>
            </mn-card-item>
            <mn-card-item>
              <mn-card-prefix>
                <mn-label>银行账号</mn-label>
              </mn-card-prefix>
              <mn-card-body>
                 {{models.BankAccount}}
              </mn-card-body>
            </mn-card-item>
          </mn-card>
        </mn-section>

        <div class="submit-btn">
          <mn-btn theme="primary" block @click="$router.go(-1)">返回</mn-btn>
        </div>
    </mn-container>
  </mn-scroller>
</template>

<script>
  import { showQualification } from '../../axios/user'

  export default {
    components: {
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
    },
    methods: {
      /**
       * 资质
       * @return {[type]} [description]
       */
      async showQualification () {
        const id = this.$route.params.id
        const response = await showQualification(id)
        if (response.data.Error === 0) {
          this.models = response.data.Data.SimpleInvoiceQualification
        }
      }
    },
    created () {
      this.showQualification()
    },
    beforeDestroy () {

    }
  }
</script>

<style lang="scss">
</style>
