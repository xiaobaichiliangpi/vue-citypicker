<template>
  <mn-scroller>
    <mn-container>
      <mn-form :validate="$v" @success="nextStep" ref="form" class="address">
        <mn-section>
          <mn-card>
            <mn-card-item>
              <mn-card-prefix>
                <mn-label :validate="$v.models.CompanyName">开票单位</mn-label>
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
                 placeholder="请填写公司注册详细地址"></mn-input>
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
        }
      }
    },
    data () {
      return {
        models: {
          CompanyName: undefined,
          CompanyAddress: undefined,
          CompanyPhone: undefined
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
        this.$router.push({name: 'createInvoicesStep3'})
      }
    },
    created () {
      if (this.qualification) {
        this.models.CompanyName = this.qualification.CompanyName
        this.models.CompanyAddress = this.qualification.CompanyAddress
        this.models.CompanyPhone = this.qualification.CompanyPhone
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
