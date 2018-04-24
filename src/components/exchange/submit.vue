<template>
  <div v-if="product.length">
    <sign-modal :openModal="toggleModal"></sign-modal>
    <mn-scroller>
      <mn-container>
        <mn-card class="product">
          <h2 v-if="!models.consigneeProductId">请选择您要兑换的商品</h2>
          <h2 v-else>商品清单</h2>
          <!-- <mn-card-item v-for="(item, index) of product" :key="index">
            <mn-card-prefix class="product-img">
              <div class="img" style="width: 80px; height: 80px;background: #ccc;">
                <img :src="item.imagePath">
              </div>
            </mn-card-prefix>
            <mn-card-body>
              <div class="product-title">
                {{item.productName}}
              </div>
              <div class="product-info">
                <span style="color: #999; font-size: 0.875rem;">×{{item.number}}</span>
              </div>
            </mn-card-body>
          </mn-card-item> -->
          <div :class="['radio-group', {'has-bottom': product.length - 1 > key}]"
            v-for="(item, key) in product"
            :key="key">
          <mn-radio :data="item.realProductId"
            v-model="models.consigneeProductId"
            :class="{'selected': item.realProductId === models.consigneeProductId}">
            <div class="product-item">
              <div class="product-img">
                <div class="img">
                  <img :src="item.imagePath">
                </div>
              </div>
              <div :class="['product-detail']">
                <div class="product-title">
                  {{item.productName}}
                </div>
                <div class="product-info">
                  <span style="font-size: 0.875rem;">×{{item.number}}</span>
                </div>
              </div>
            </div>
          </mn-radio>
          <div :class="['product-intro', {'show-intro': showDetailId === key }]">
            <div class="product-intro-title" @click="onOpenDetail(key)">商品概述</div>
            <div :class="['product-intro-text']">{{ item.productName }}</div>
          </div>
          </div>
        </mn-card>

        <div>
          <mn-section class="invoicesType">
            <h2 style="font-weight: 500;font-size: 0.84rem;background: #fff;color:#333;padding-left: .75rem;padding-top: 0.8125rem;">
              请选择提货方式
            </h2>
            <mn-card>
              <mn-card-item>
                <mn-card-body>
                  <div
                    v-for="(item, key) in pickType"
                    :key="key"
                    :class="['pickType-item', {'is-selected': item.value === activeType}]"
                    @click="onSelectType(item)"
                    v-if="(item.value === product[0].pickupMethod) || (product[0].pickupMethod === 3)">
                    {{item.label}}
                  </div>
                </mn-card-body>
              </mn-card-item>
            </mn-card>
          </mn-section>

          <mn-section v-if="activeType === 2" style="color: #ea623a;padding-left: 1rem;font-size: 0.875rem;">
            温馨提示:*站点自提可明日送达, 快递5个工作日内发货
          </mn-section>
        </div>
        <div v-if="activeType === 1" class="pb-4">
          <mn-card class="user-info">
            <mn-card-item>
              <mn-card-prefix>
                <mn-label>当前账号</mn-label>
              </mn-card-prefix>
              <mn-card-body>
                <div>{{token.phone ? token.phone : '请先登录'}}</div>
                <div @click="toggleSign" class="toggle-btn">{{token.phone ? '退出登录' : '登录'}}</div>
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

        <mn-form :validate="$v" @success="success" ref="form" class="address pb-4" v-if="activeType === 2">
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
            <mn-card-item type="link" @click="chooseLocation">
              <mn-card-prefix>
                <mn-label>所在地区</mn-label>
              </mn-card-prefix>
              <mn-card-body>
                <div :class="['location-default', {'location': models.consigneeLocation}]">
                  {{models.consigneeLocation ? models.consigneeLocation : '请选择'}}
                </div>
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
            <mn-helper :validate="$v.models.consigneeLocation">
              <mn-helper-item name="required">请选择所在地区</mn-helper-item>
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
    <city-picker
      v-if="realCityArray"
      :visible.sync="showPicker"
      :cityArray="realCityArray"
      @close="onClose"
      @success="onSuccess">
    </city-picker>
  </div>
</template>

<script>
  import input from 'vue-human/suites/input'
  import radio from 'vue-human/suites/radio'
  import {
    required } from 'vuelidate/lib/validators'
  import SignModal from '../sign/exchangeSign.vue'
  import { mapGetters } from 'vuex'
  import { getProductByCard, pickupProduct } from '../../axios/exchange'
  import Alert from 'vue-human/utils/Alert'
  import LoadingMask from 'vue-human/utils/LoadingMask'
  import CityPicker from '../common/picker.vue'
  import CityArray from '../common/areaData.js'
  // import Toast from '../common/toast'

  export default {
    components: {
      ...input.map(),
      ...radio.map(),
      SignModal,
      CityPicker
    },
    validations: {
      models: {
        consignee: {
          required
        },
        consigneeLocation: {
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
        vuexActiveType: 'activeType',
        productId: 'productId'
      })
    },
    data () {
      return {
        models: {
          consignee: undefined,
          consigneeAddress: undefined,
          consigneePhonenum: undefined,
          consigneeLocation: undefined,
          consigneeProductId: undefined
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
        product: [],
        showDetailId: -1,
        showPicker: false,
        cityArray: CityArray,
        realCityArray: undefined
      }
    },
    methods: {
      success () {
        // 未选择商品
        if (!this.models.consigneeProductId) {
          this.alertLayer = Alert.create({
            title: '请选择兑换商品',
            cancelText: '好的'
          }).show()
          return
        }
        const { consigneeAddress, consigneeLocation, ...rest } = this.models
        const data = {
          cardNum: this.$route.query.cardNum,
          passwd: this.$route.query.passwd,
          pickupMethod: this.activeType,
          realProductId: this.models.consigneeProductId,
          expressInput: {
            consigneeAddress: consigneeLocation + consigneeAddress,
            ...rest
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
            realProductId: this.models.consigneeProductId,
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
        // this.activeType = item.value
        if (!this.models.consigneeProductId) {
          this.alertLayer = Alert.create({
            title: '请选择要提取的商品',
            cancelText: '好的'
          }).show()
        } else {
          this.activeType = item.value
        }
      },
      toggleSign () {
        if (this.token.phone) {
          this.$store.commit('CLEAR_EX_AUTH_TOKEN')
          this.alertLayer = Alert.create({
            title: '退出成功',
            cancelText: '好的'
          }).show()
        } else {
          this.toggleModal = !this.toggleModal
        }
      },
      chooseStation () {
        if (this.token.customerGuid) {
          this.$router.push({name: 'exchangeAddress'})
        } else {
          this.toggleSign()
        }
      },
      chooseTime () {
        if (this.workstation.WorkStationId && this.models.consigneeProductId) {
          this.$router.push({
            name: 'exchangeReceiveTime',
            params: {workStationId: this.workstation.WorkStationId},
            query: {cardNum: this.$route.query.cardNum, realProductId: this.models.consigneeProductId}
          })
        } else {
          this.alertLayer = Alert.create({
            title: this.models.consigneeProductId ? '请先选择自提站点' : '请选择要提取的商品',
            cancelText: '好的'
          }).show()
        }
      },
      getProductByCard () {
        getProductByCard(this.$route.query.cardNum)
        .then(response => {
          this.product = response.data.target
          // response.data.target[0].productId = 1 // test
          // let data = JSON.parse(JSON.stringify(response.data.target[0]))
          // data.productId = 2
          // this.product = [response.data.target[0], data]  // test
          // this.product = [data]  // test

          // one product
          if (this.product.length === 1) {
            this.models.consigneeProductId = this.product[0].realProductId
          } else {
            this.models.consigneeProductId = this.productId
          }
          this.activeType = this.vuexActiveType
          this.destroyLoadingLayer()
        })
        .catch(error => {
          console.log(error)
          this.destroyLoadingLayer()
        })
      },
      createLoadingMask () {
        this.loadingMaskLayer = LoadingMask.create().show()
      },
      destroyLoadingLayer () {
        if (this.loadingMaskLayer) this.loadingMaskLayer.destroy()
      },
      onOpenDetail (val) {
        this.showDetailId !== -1 ? (this.showDetailId = -1) : (this.showDetailId = val)
      },
      chooseLocation () {
        this.onFreshCity()
        this.$nextTick(() => {
          this.showPicker = true
        })
      },
      onClose () {
        this.showPicker = false
      },
      onSuccess (val) {
        // test address:exchange/submit?cardNum=75883793&passwd=505868
        this.models.consigneeLocation = val.map(val => {
          return val.text
        }).join('')
        this.onClose()
      },
      onFreshCity () {
        const product = this.product.filter(val => {
          return val.realProductId === this.models.consigneeProductId
        })[0]
        const tempCityArray = [null, null, this.cityArray[2]]
        const tempProvince = []
        const tempCity = {}
        product.expressArea.forEach(val => {
          let isProvince = /[1-9]{2}[0]{4}/.test(val.value)
          if (isProvince) {
            let province = this.cityArray[0].filter(item => {
              return item.value === val.value
            })[0]
            tempProvince.push(province)
            tempCity[val.value] = this.cityArray[1][val.value]
          } else {
            let provinceStr = `${val.value.substring(0, 2)}0000`
            let province = this.cityArray[0].filter(item => {
              return item.value === provinceStr
            })[0]
            tempProvince.push(province)
            if (tempCity[provinceStr]) {
              tempCity[provinceStr].push(val)
            } else {
              tempCity[provinceStr] = [val]
            }
          }
        })
        tempCityArray[0] = tempProvince
        tempCityArray[1] = tempCity
        this.realCityArray = tempCityArray
      }
    },
    created () {
      console.log(this.cityArray)
      this.createLoadingMask()
      this.getProductByCard()
    },
    beforeDestroy () {
      this.$store.commit('UPDATE_PICK_TYPE', undefined)
      this.$store.commit('UPDATE_PRODUCTID', this.models.consigneeProductId)
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
  padding: .5rem .75rem;
  border: 1px solid #666;
  color: #666;
  border-radius: 3px;
  margin-right: 0.5rem;
  font-size: .875rem;

  &.is-selected {
    color: #49ab34;
    border-color: #49ab34;
  }
}

.product {

  h2 {
    font-size: 0.84rem;
    line-height: 1;
    padding: 0.75rem 0 .28rem 0.66rem;
    color: #333;
    font-weight: 500;
  }

  .mn-card-body, .product-item, .product-detail {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
  }

  .product-item {
    justify-content: flex-start;
  }

  .product-detail {
    flex: 1;
    min-height: 3.75rem;
    padding: .625rem 0;
    padding-right: 0.625rem;
    box-sizing: content-box;
  }

  .has-bottom {
    border-bottom: 1px solid #eee;
  }

  &-img {
    margin: 0 .65625rem 0 .875rem !important;

    .img {
      border: 1px solid #eee;
      border-radius: .3125rem;
      overflow: hidden;
      width: 3.75rem;
      height: 3.75rem;
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  &-title {
    flex: 1;
    font-size: .75rem;
  }

  &-info {
    flex: 0 0 2rem;
    text-align: right;
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

.mn-radio-label {
  .mn-card-item {
    padding: 0;


  }
}

.radio-group {
  color: #999;
}

.selected {
  color: #333;
}

.invoicesType {
  .mn-card-item {
    padding: .625rem 0 .875rem .75rem;
  }
}

.product-intro {
  overflow: hidden;

  &-title {
    font-size: .84rem;
    color: #999;
    padding: .9375rem 0.625rem .9375rem .625rem;
    position: relative;

    &::after {
      content: ' ';
      position: absolute;
      top: 50%;
      right: 0.625rem;
      display: block;
      border-width: 2px 2px 0 0;
      border-style: solid;
      border-color: #c8c8cd;
      transform: rotate(135deg) translateY(50%);
      height: 8px;
      width: 8px;
    }
  }

  &-text {
    max-height: 0;
    transition: all .3s ease;
    font-size: .8125rem;
    color: #333;
    padding: 0 1rem 0 .5625rem;
  }
}

.show-intro {

  .product-intro-title {
    &::after {
      transform: rotate(-45deg) translateY(35%) translateX(-4px);
    }
  }

  .product-intro-text {
    max-height: 4rem;
    padding: .75rem 1rem .75rem .5625rem;
  }
}

.pb-4 {
  padding-bottom: 2rem;
}
.location-default {
  color: #939393;
  font-weight: 600;
  // font-family: sans-serif;
}
.location {
  color: #333;
  font-weight: 400;
}
</style>

<style lang="scss">
.mn-radio-label {
  display: flex;
  align-items: center;
  padding: 0 .625rem;
  padding-right: 0;

  span:last-child {
    flex: 1;
  }
}
</style>
