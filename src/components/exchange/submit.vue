<template>
  <div>
    <sign-modal :openModal="toggleModal"></sign-modal>
    <mn-scroller>
      <mn-container>
        <mn-card class="product">
          <mn-card-item>
            <mn-card-prefix class="product-img">
              <div class="img" style="width: 80px; height: 80px;background: #ccc;">
                <img src="http://pic-prd.suiyi.com.cn/group1/M00/00/76/CgE-EFmfqTiAVUg9AABIQgXkjmU955.jpg">
              </div>
            </mn-card-prefix>
            <mn-card-body>
              <div class="product-title">
                test五香牛肉
              </div>
              <div class="product-info">
                <span style="color: #999; font-size: 0.875rem;">×1</span>
              </div>
            </mn-card-body>
          </mn-card-item>
        </mn-card>

        <div>
          <mn-section class="invoicesType">
            <h2 style="font-size: 1rem;background: #fff;padding-left: 1rem;">提货方式</h2>
            <mn-card>
              <mn-card-item>
                <mn-card-body>
                  <div v-for="(item, key) in pickType" :key="key" :class="['pickType-item', {'is-selected': item.value === activeType}]" @click="onSelectType(item)">
                    {{item.label}}
                  </div>
                </mn-card-body>
              </mn-card-item>
            </mn-card>
          </mn-section>
        </div>
        <div v-if="activeType === 1">
          <mn-card class="user-info">
            <mn-card-item>
              <mn-card-prefix>
                <mn-label>当前账号</mn-label>
              </mn-card-prefix>
              <mn-card-body>
                <div>{{token.phone ? token.phone : '请先登录'}}</div>
                <div @click="toggleSign" class="toggle-btn">{{token.phone ? '切换账号' : '登录'}}</div>
              </mn-card-body>
            </mn-card-item>
          </mn-card>

          <mn-card>
            <mn-card-item type="link" @click="$router.push({name: 'exchangeAddress'})">
              <mn-card-prefix>
                <mn-label>自提站点</mn-label>
              </mn-card-prefix>
              <mn-card-body>
                <div>{{workstation.WorkStationName ? workstation.WorkStationName : '请选择'}}</div>
              </mn-card-body>
            </mn-card-item>
          </mn-card>

          <mn-card>
            <mn-card-item type="link" @click="chooseTime">
              <mn-card-prefix>
                <mn-label>配送时间</mn-label>
              </mn-card-prefix>
              <mn-card-body>
                <div>{{receivetime.Date ? `${receivetime.Date} ${receivetime.PeriodList.Period}` : '请选择'}}</div>
              </mn-card-body>
            </mn-card-item>
          </mn-card>

          <div class="submit-btn">
            <mn-btn theme="primary" ref="submit" block>确认提货</mn-btn>
          </div>
        </div>

        <mn-form :validate="$v" @success="success" ref="form" class="address" v-if="activeType === 2">
          <mn-card>
            <mn-card-item>
              <mn-card-prefix>
                <mn-label>收货人</mn-label>
              </mn-card-prefix>
              <mn-card-body>
                <mn-input v-model="models.cardNum"
                 placeholder="收货人姓名"></mn-input>
              </mn-card-body>
            </mn-card-item>
            <mn-card-item>
              <mn-card-prefix>
                <mn-label>联系电话</mn-label>
              </mn-card-prefix>
              <mn-card-body>
                <mn-input v-model="models.passwd"
                 placeholder="收货人电话"></mn-input>
              </mn-card-body>
            </mn-card-item>
            <mn-card-item>
              <mn-card-prefix>
                <mn-label>收货地址</mn-label>
              </mn-card-prefix>
              <mn-card-body>
                <mn-input v-model="models.passwd"
                 placeholder="请填写详细地址"></mn-input>
              </mn-card-body>
            </mn-card-item>
          </mn-card>

           <mn-section-note>
            <mn-helper :validate="$v.models.cardNum">
              <mn-helper-item name="required">请输入卡号</mn-helper-item>
              <mn-helper-item name="minLength">卡号长度应为8位</mn-helper-item>
              <mn-helper-item name="maxLength">卡号长度应为8位</mn-helper-item>
            </mn-helper>
          </mn-section-note>

          <mn-section-note>
            <mn-helper :validate="$v.models.passwd">
              <mn-helper-item name="required">请输入卡片密码</mn-helper-item>
              <mn-helper-item name="minLength">密码长度应为6位</mn-helper-item>
              <mn-helper-item name="maxLength">密码长度应为6位</mn-helper-item>
            </mn-helper>
          </mn-section-note>

          <div class="submit-btn">
            <mn-btn theme="primary" ref="submit" block>确认提货</mn-btn>
          </div>
        </mn-form>
      </mn-container>
    </mn-scroller>
  </div>
</template>

<script>
  import input from 'vue-human/suites/input'
  import {
    required,
    minLength,
    maxLength } from 'vuelidate/lib/validators'
  import SignModal from '../sign/exchangeSign.vue'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      ...input.map(),
      SignModal
    },
    validations: {
      models: {
        cardNum: {
          required,
          minLength: minLength(8),
          maxLength: maxLength(8)
        },
        passwd: {
          required,
          minLength: minLength(6),
          maxLength: maxLength(6)
        }
      }
    },
    computed: {
      ...mapGetters({
        token: 'exToken',
        workstation: 'station',
        receivetime: 'receivetime'
      })
    },
    data () {
      return {
        models: {
          cardNum: undefined,
          passwd: undefined
        },
        pickType: [{
          label: '站点自提',
          value: 1
        }, {
          label: '快递配送',
          value: 2
        }],
        activeType: 1,
        toggleModal: false
      }
    },
    methods: {
      success () {
      },
      onSelectType (item) {
        this.activeType = item.value
      },
      toggleSign () {
        this.toggleModal = !this.toggleModal
      },
      chooseTime () {
        if (this.workstation.WorkStationId) {
          this.$router.push({name: 'exchangeReceiveTime', params: {workStationId: this.workstation.WorkStationId}})
        }
      }
    },
    created () {
    },
    beforeDestroy () {
    },
    watch: {
      'token.customerGuid' (val) {
        this.$store.commit('UPDATE_ORDER_RECEIVETIME', {})
        this.$store.commit('UPDATE_ORDER_WORKSTATION', {})
      }
    }
  }
</script>

<style lang="scss" scoped>
.pickType-item {
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

.product {
  .mn-card-body {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &-img {
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}

.user-info {
  .mn-card-body:last-child {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 1rem;
    color: #666;

    .toggle-btn {
      color: #49ab34;
      text-decoration: underline;
    }
  }
}
</style>
