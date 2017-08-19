<template>
  <mn-scroller>
    <mn-container>
      <mn-section>
        <mn-card>
          <mn-card-item>
            <mn-card-body>需要发票</mn-card-body>
            <mn-card-suffix action>
              <mn-turn :data="true" v-model="needInvoices"></mn-turn>
            </mn-card-suffix>
          </mn-card-item>
        </mn-card>
      </mn-section>

      <div v-if="needInvoices">
        <mn-section class="invoicesType">
          <h2 style="font-size: 1rem;background: #fff;padding-left: 1rem;">发票类型</h2>
          <mn-card>
            <mn-card-item>
              <mn-card-body>
                <div v-for="(item, key) in invoicesType" :key="key" :class="['invoicesType-item', {'is-selected': item.value === activeType}]" @click="onSelectType(item)">
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
                <mn-input v-model="models.CompanyName"
                 placeholder="请填写单位名称"></mn-input>
              </mn-card-body>
            </mn-card-item>
            <mn-card-item>
              <mn-card-prefix>
                <mn-label>纳税人编号</mn-label>
              </mn-card-prefix>
              <mn-card-body>
                <mn-input v-model="models.TaxNumber"
                 placeholder="纳税人识别号或统一社会信用代码"></mn-input>
              </mn-card-body>
            </mn-card-item>
          </mn-card>
        </mn-section>

        <mn-section v-else>
          <h2 style="font-size: 1rem;padding-left: 1rem;margin-bottom: 0.5rem;">开票单位</h2>
          <mn-card>
            <mn-card-item
              type="link"
              :class="[{'is-selected': activeInvoices && (activeInvoices.Id === item.Id)}]"
              v-if="qualifications"
              v-for="(item, key) in qualifications"
              :key="key"
              @click="onSelectInvoices(item)">
              <mn-card-prefix v-if="activeInvoices && (activeInvoices.Id === item.Id)">
                <mn-icon :name="icons.check"></mn-icon>
              </mn-card-prefix>
              <mn-card-body>
                <p>{{item.CompanyName}}</p>
                <p>纳税人编号: {{item.TaxNumber}}</p>
              </mn-card-body>
            </mn-card-item>
            <mn-card-item @click.native="addQua">
              <mn-card-body style="text-align: center;">
                <mn-icon :name="icons.plus" style="color: #999;"></mn-icon>
                添加单位
              </mn-card-body>
            </mn-card-item>
          </mn-card>
        </mn-section>
      </div>

      <div class="submit-btn">
        <mn-btn theme="primary" block @click="submit" :disabled="disableSubmit">确定</mn-btn>
      </div>
    </mn-container>
  </mn-scroller>
</template>

<script>
  import input from 'vue-human/suites/input'
  import turn from 'vue-human/suites/turn'
  import { qualificationList } from '../../axios/user'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      ...input.map(),
      ...turn.map()
    },
    data () {
      return {
        icons: {
          plus: require('vue-human-icons/js/ios/plus-empty'),
          check: require('vue-human-icons/js/ios/checkmark-empty')
        },
        models: {
          TaxNumber: undefined,
          CompanyName: undefined
        },
        invoicesType: [{
          label: '增值税普通发票',
          value: 1
        }, {
          label: '增值税专用发票',
          value: 2
        }],
        activeType: 1,
        activeInvoices: undefined,
        needInvoices: false,
        qualifications: undefined
      }
    },
    computed: {
      ...mapGetters({
        invoices: 'invoices'
      }),
      disableSubmit () {
        if (!this.needInvoices) return false

        if (this.activeType === 1) {
          return !this.models.TaxNumber || !this.models.CompanyName
        } else {
          return !this.activeInvoices
        }
      }
    },
    methods: {
      addQua () {
        this.$router.push({name: 'createInvoices'})
        this.$store.commit('UPDATE_QUALIFICATION', {})
      },
      onSelectType (item) {
        this.activeType = item.value
      },
      onSelectInvoices (item) {
        this.activeInvoices = item
      },
      async qualificationList () {
        const response = await qualificationList()
        response.data.Data && (this.qualifications = response.data.Data.InvoiceQualifications.filter(item => {
          return item.AuditStatus !== 2
        }))
      },
      submit () {
        if (this.needInvoices) {
          if (this.activeType === 1) {
            this.$store.commit('UPDATE_INVOICES', {
              needInvoices: true,
              invoicesType: 1,
              invoicesLabel: '增值税普通发票',
              content: {...this.models}
            })
          } else {
            this.$store.commit('UPDATE_INVOICES', {
              needInvoices: true,
              invoicesType: 2,
              invoicesLabel: '增值税专用发票',
              content: {...this.activeInvoices}
            })
          }
        } else {
          this.$store.commit('UPDATE_INVOICES', {needInvoices: false})
        }

        this.$router.go(-1)
      }
    },
    created () {
      this.qualificationList()
      this.needInvoices = this.invoices.needInvoices
      this.activeType = this.invoices.invoicesType || 1
      if (this.activeType === 1 && this.invoices.content) {
        this.models = this.invoices.content
      } else {
        this.activeInvoices = this.invoices.content
      }
    },
    beforeDestroy () {
      if (this.alertLayer) this.alertLayer.destroy()
      if (this.loadingmask) this.loadingmask.destroy()
    }
  }
</script>

<style lang="scss">
.invoicesType-item {
  display: inline-block;
  padding: 0.2rem 0.5rem;
  border: 1px solid #666;
  color: #666;
  border-radius: 3px;
  margin-right: 0.5rem;

  &.is-selected {
    color: #49ab34;
    border-color: #49ab34;
  }
}
</style>
