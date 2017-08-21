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
        this.$store.commit('UPDATE_QUALIFICATION', {...this.qualification, ...this.models})
        this.$router.push({name: 'createInvoicesStep2'})
      }
    },
    created () {
      if (this.qualification.ApplyName) {
        this.models.ApplyName = this.qualification.ApplyName
        this.models.ContactPhone = this.qualification.ContactPhone
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
