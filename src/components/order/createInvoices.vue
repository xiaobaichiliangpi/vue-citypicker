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
              <mn-input v-model="models.consignee"
               placeholder="单位或公司全称"></mn-input>
            </mn-card-body>
          </mn-card-item>
          <mn-card-item>
            <mn-card-prefix>
              <mn-label>注册地址</mn-label>
            </mn-card-prefix>
            <mn-card-body>
              <mn-input v-model="models.consignee"
               placeholder="请填写公司详细地址，需与注册一致"></mn-input>
            </mn-card-body>
          </mn-card-item>
          <mn-card-item>
            <mn-card-prefix>
              <mn-label>注册电话</mn-label>
            </mn-card-prefix>
            <mn-card-body>
              <mn-input v-model="models.consignee"
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
              <mn-input v-model="models.consignee"
               placeholder="单位或公司全称"></mn-input>
            </mn-card-body>
          </mn-card-item>
          <mn-card-item>
            <mn-card-prefix>
              <mn-label>开户银行</mn-label>
            </mn-card-prefix>
            <mn-card-body>
              <mn-input v-model="models.consignee"
               placeholder="公司开户银行"></mn-input>
            </mn-card-body>
          </mn-card-item>
          <mn-card-item>
            <mn-card-prefix>
              <mn-label>银行账号</mn-label>
            </mn-card-prefix>
            <mn-card-body>
              <mn-input v-model="models.consignee"
               placeholder="公司开户银行账号"></mn-input>
            </mn-card-body>
          </mn-card-item>
        </mn-card>
      </mn-section>

      <div class="submit-btn">
        <mn-btn theme="primary" block>下一步</mn-btn>
      </div>
    </mn-container>
  </mn-scroller>
</template>

<script>
  import input from 'vue-human/suites/input'
  import turn from 'vue-human/suites/turn'
  import textarea from 'vue-human/suites/textarea'
  import { required } from 'vuelidate/lib/validators'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      ...input.map(),
      ...textarea.map(),
      ...turn.map()
    },
    validations: {
      models: {
        consignee: {
          required
        },
        consignee_phonenum: {
          required,
          phone () {
            return /^1[3|4|5|7|8][0-9]{9}$/.test(this.models.consignee_phonenum)
          }
        },
        consignee_address: {
          required
        }
      }
    },
    data () {
      return {
        icons: {
          plus: require('vue-human-icons/js/ios/plus-empty'),
          check: require('vue-human-icons/js/ios/checkmark-empty')
        },
        models: {
          consignee: undefined,
          consignee_phonenum: undefined,
          consignee_address: undefined
        },
        invoicesType: [{
          label: '增值税普通发票',
          value: 1
        }, {
          label: '增值税专用发票',
          value: 2
        }],
        activeType: 1,
        activeInvoicesId: undefined
      }
    },
    computed: {
      ...mapGetters({
        address: 'address'
      })
    },
    methods: {
      success () {
        this.$store.commit('UPDATE_ADDRESS', this.models)
        this.$router.go(-1)
      },
      onSelectType (item) {
        this.activeType = item.value
      }
    },
    created () {
      this.models = {...this.address}
    }
  }
</script>

<style lang="scss">
</style>
