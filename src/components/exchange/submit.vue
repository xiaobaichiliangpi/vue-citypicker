<template>
  <div>
    <sign-modal :openModal="toggleModal"></sign-modal>
    <mn-scroller>
      <mn-container>
        <mn-card class="product">
          <mn-card-item>
            <mn-card-prefix class="product-img">
              <div class="img" style="width: 80px; height: 80px;background: #ccc;">
                <img :src="product.imagePath">
              </div>
            </mn-card-prefix>
            <mn-card-body>
              <div class="product-title">
                {{product.productName}}
              </div>
              <div class="product-info">
                <span style="color: #999; font-size: 0.875rem;">×{{product.number}}</span>
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
                  <div
                    v-for="(item, key) in pickType"
                    :key="key"
                    :class="['pickType-item', {'is-selected': item.value === activeType}]"
                    @click="onSelectType(item)"
                    v-if="(item.value === product.pickupMethod) || (product.pickupMethod === 3)">
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
            <mn-card-item type="link" @click="chooseStation">
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
            <mn-btn theme="primary" block @click="stationSubmit">确认提货</mn-btn>
          </div>
        </div>

        <mn-form :validate="$v" @success="success" ref="form" class="address" v-if="activeType === 2">
          <mn-card>
            <mn-card-item>
              <mn-card-prefix>
                <mn-label>收货人</mn-label>
              </mn-card-prefix>
              <mn-card-body>
                <mn-input v-model="models.consignee"
                 placeholder="收货人姓名"></mn-input>
              </mn-card-body>
            </mn-card-item>
            <mn-card-item>
              <mn-card-prefix>
                <mn-label>联系电话</mn-label>
              </mn-card-prefix>
              <mn-card-body>
                <mn-input v-model="models.consigneePhonenum"
                 placeholder="收货人电话"></mn-input>
              </mn-card-body>
            </mn-card-item>
            <mn-card-item>
              <mn-card-prefix>
                <mn-label>收货地址</mn-label>
              </mn-card-prefix>
              <mn-card-body>
                <mn-input v-model="models.consigneeAddress"
                 placeholder="请填写详细地址"></mn-input>
              </mn-card-body>
            </mn-card-item>
          </mn-card>

           <mn-section-note>
            <mn-helper :validate="$v.models.consignee">
              <mn-helper-item name="required">请输入收货人</mn-helper-item>
            </mn-helper>
          </mn-section-note>

          <mn-section-note>
            <mn-helper :validate="$v.models.consigneePhonenum">
              <mn-helper-item name="required">请输入收货人电话</mn-helper-item>
              <mn-helper-item name="phone">电话格式不对</mn-helper-item>
            </mn-helper>
          </mn-section-note>

          <mn-section-note>
            <mn-helper :validate="$v.models.consigneeAddress">
              <mn-helper-item name="required">请填写详细地址</mn-helper-item>
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
    required } from 'vuelidate/lib/validators'
  import SignModal from '../sign/exchangeSign.vue'
  import { mapGetters } from 'vuex'
  import { getProductByCard, pickupProduct } from '../../axios/exchange'
  import Alert from 'vue-human/utils/Alert'
  import LoadingMask from 'vue-human/utils/LoadingMask'

  export default {
    components: {
      ...input.map(),
      SignModal
    },
    validations: {
      models: {
        consignee: {
          required
        },
        consigneeAddress: {
          required
        },
        consigneePhonenum: {
          required,
          phone () {
            if (this.models.consigneePhonenum) {
              return /^1[3|4|5|7|8][0-9]{9}$/.test(this.models.consigneePhonenum)
            } else {
              return true
            }
          }
        }
      }
    },
    computed: {
      ...mapGetters({
        token: 'exToken',
        city: 'exCity',
        workstation: 'station',
        receivetime: 'receivetime',
        vuexActiveType: 'activeType'
      })
    },
    data () {
      return {
        models: {
          consignee: undefined,
          consigneeAddress: undefined,
          consigneePhonenum: undefined
        },
        pickType: [{
          label: '站点自提',
          value: 1
        }, {
          label: '快递配送',
          value: 2
        }],
        activeType: undefined,
        toggleModal: false,
        product: {}
      }
    },
    methods: {
      success () {
        const data = {
          cardNum: this.$route.query.cardNum,
          passwd: this.$route.query.passwd,
          pickupMethod: this.activeType,
          expressInput: {
            ...this.models
          }
        }

        this.pickupProduct(data)
      },
      stationSubmit () {
        if (!this.token.customerGuid) {
          this.toggleSign()
        } else if (!this.workstation.WorkStationId) {
          this.alertLayer = Alert.create({
            title: '请选择自提站点',
            cancelText: '好的'
          }).show()
        } else if (!this.workstation.WorkStationId) {
          this.alertLayer = Alert.create({
            title: '请先选择配送时间',
            cancelText: '好的'
          }).show()
        } else {
          const data = {
            cardNum: this.$route.query.cardNum,
            passwd: this.$route.query.passwd,
            pickupMethod: this.activeType,
            zitiInput: {
              addressId: this.workstation.AddressId,
              workstationId: this.workstation.WorkStationId,
              stationName: this.workstation.WorkStationName,
              shippingTime: this.receivetime.Datebackend,
              timeSlot: this.receivetime.PeriodList.Periodbackend,
              customerGuid: this.token.customerGuid,
              cityCode: this.city.CityFlag
            }
          }

          this.pickupProduct(data)
        }
      },
      pickupProduct (data) {
        this.loadingMaskLayer = LoadingMask.create().show()
        pickupProduct(data)
        .then(response => {
          console.log(response)
          if (this.loadingMaskLayer) this.loadingMaskLayer.destroy()
          this.$router.push({name: 'exchangeResult'})
        })
        .catch(error => {
          console.log(error)
          if (this.loadingMaskLayer) this.loadingMaskLayer.destroy()
          this.alertLayer = Alert.create({
            title: '出错了!',
            description: error.response.data.message,
            cancelText: '好的'
          }).show()
        })
      },
      onSelectType (item) {
        this.activeType = item.value
      },
      toggleSign () {
        this.toggleModal = !this.toggleModal
      },
      chooseStation () {
        if (this.token.customerGuid) {
          this.$router.push({name: 'exchangeAddress'})
        } else {
          this.toggleSign()
        }
      },
      chooseTime () {
        if (this.workstation.WorkStationId) {
          this.$router.push({name: 'exchangeReceiveTime', params: {workStationId: this.workstation.WorkStationId}, query: {cardNum: this.$route.query.cardNum}})
        } else {
          this.alertLayer = Alert.create({
            title: '请先选择自提站点',
            cancelText: '好的'
          }).show()
        }
      },
      getProductByCard () {
        getProductByCard(this.$route.query.cardNum)
        .then(response => {
          this.product = response.data.target[0]
          this.activeType = this.vuexActiveType
        })
        .catch(error => {
          console.log(error)
        })
      }
    },
    created () {
      this.getProductByCard()
    },
    beforeDestroy () {
      this.$store.commit('UPDATE_PICK_TYPE', undefined)
      if (this.loadingMaskLayer) this.loadingMaskLayer.destroy()
      if (this.alertLayer) this.alertLayer.destroy()
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
