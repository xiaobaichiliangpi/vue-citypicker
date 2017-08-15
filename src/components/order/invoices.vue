<template>
  <mn-scroller>
    <mn-container>
      <mn-section>
        <mn-card>
          <mn-card-item>
            <mn-card-body>需要发票</mn-card-body>
            <mn-card-suffix action>
              <mn-turn :data="true" v-model="models.policy"></mn-turn>
            </mn-card-suffix>
          </mn-card-item>
        </mn-card>
      </mn-section>

      <mn-section class="invoicesType">
        <h2>发票类型</h2>
        <mn-card>
          <mn-card-item>
            <mn-card-body>
              <div v-for="item in invoicesType" :class="['invoicesType-item', {'is-selected': item.value === activeType}]" @click="onSelectType(item)">
                {{item.label}}
              </div>
            </mn-card-body>
          </mn-card-item>
        </mn-card>
      </mn-section>

      <mn-section v-if="activeType === 1">
        <mn-card>
          <mn-card-item>
            <mn-card-prefix>
              <mn-label>发票抬头</mn-label>
            </mn-card-prefix>
            <mn-card-body>
              <mn-input v-model="models.consignee"
               placeholder="请填写单位名称"></mn-input>
            </mn-card-body>
          </mn-card-item>
          <mn-card-item>
            <mn-card-prefix>
              <mn-label>纳税人编号</mn-label>
            </mn-card-prefix>
            <mn-card-body>
              <mn-input v-model="models.consignee"
               placeholder="纳税人识别号或统一社会信用代码"></mn-input>
            </mn-card-body>
          </mn-card-item>
        </mn-card>
      </mn-section>

      <mn-section v-else>
        <h2>开票单位</h2>
        <mn-card>
          <mn-card-item type="link" :class="[{'is-selected': activeInvoicesId}]">
            <mn-card-prefix>
              <mn-icon :name="icons.check"></mn-icon>
            </mn-card-prefix>
            <mn-card-body>
              <p>水族生态管理有限公司</p>
              <p>纳税人编号: 00012219999</p>
            </mn-card-body>
          </mn-card-item>
          <mn-card-item>
            <mn-card-body>
              <mn-icon :name="icons.plus" style="color: #999;"></mn-icon>
              添加单位
            </mn-card-body>
          </mn-card-item>
        </mn-card>
      </mn-section>

      <div class="address-submit-btn">
        <mn-btn theme="primary" ref="submit" block>确定</mn-btn>
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
.address-submit-btn {
  padding: 0 1rem;

  .mn-btn.is-primary {
    background-color: #49ab34;
    border-radius: 6px;

    &:active,
    &:hover {
      background: darken(#49ab34, 10%);
    }
  }
}

.address {
  .mn-textarea-counter {
    display: none;
  }

  .address-textarea {
    align-items: flex-start;
  }
}
</style>
