<template>
  <div>
    <sign-modal :openModal="toggleModal"></sign-modal>
    <mn-scroller>
      <mn-container>
        <div>
          <mn-section class="pickup-type">
            <h2 style="padding-left: 1rem;">我的提货记录</h2>
            <mn-card>
              <mn-card-item>
                <mn-card-body>
                  <div
                    v-for="(item, key) in pickType"
                    :key="key"
                    :class="['pickType-item', {'is-selected': item.value === activeType}]"
                    @click="onSelectType(item)">
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
        </div>

        <div v-else>
          <mn-card>
            <mn-card-item>
              <mn-card-body>
                <mn-input v-model="models.phone"
                 placeholder="请输入提货人手机号"></mn-input>
              </mn-card-body>
            </mn-card-item>
            <mn-card-item>
              <mn-card-body class="verify-code">
                <mn-input v-model="models.verifyCode"
                 placeholder="请输入短信验证码"></mn-input>
                 <div :class="['verify-code-btn', {'is-disabled': sendingCode || !rightPhone}]" @click="smsCode">
                   {{sendingCode ? `${secondDown}s后重试` : '获取验证码'}}
                 </div>
              </mn-card-body>
            </mn-card-item>
          </mn-card>
        </div>

        <div class="submit-btn" style="margin-bottom: 1rem;">
          <mn-btn theme="primary" block :disabled="!searchBtnShow" @click="search">查询提货记录</mn-btn>
        </div>

        <div v-if="stationOrders && activeType === 1">
          <mn-card class="product" v-for="(item, key) in stationOrders" :key="key">
            <mn-card-item>
              <mn-card-prefix class="product-img">
                <div class="img" style="width: 80px; height: 80px;background: #ccc;">
                  <img :src="item.imagePath">
                </div>
              </mn-card-prefix>
              <mn-card-body>
                <div class="product-title">
                  {{item.pickupcardProductName}}
                </div>
                <div class="product-info">
                  <span style="color: #999; font-size: 0.875rem;">×1</span>
                </div>
              </mn-card-body>
            </mn-card-item>
            <mn-card-item>
              <mn-card-prefix>
                <mn-label>提货时间</mn-label>
              </mn-card-prefix>
              <mn-card-body>
              {{item.pickupTime}}
              </mn-card-body>
            </mn-card-item>
            <mn-card-item>
              <mn-card-prefix>
                <mn-label>配送方式</mn-label>
              </mn-card-prefix>
              <mn-card-body>
              站点自提
              </mn-card-body>
            </mn-card-item>
            <mn-card-item>
              <mn-card-prefix>
                <mn-label>配送状态</mn-label>
              </mn-card-prefix>
              <mn-card-body style="color: #ea623a;" class='track-item'>
                <div>{{item.orderStatus ? item.orderStatus : '待配送'}}</div>
                <span v-if="item.orderStatus === '待取货' && !item.pickUpInfo" @click="pickUpPsw(item)">获取密码 <mn-loading-icon v-if="gettingPsw"></mn-loading-icon></span>
              </mn-card-body>
            </mn-card-item>
            <mn-card-item v-if="item.pickUpInfo">
              <mn-card-prefix>
                <mn-label>开柜密码</mn-label>
              </mn-card-prefix>
              <mn-card-body>
              <span style="color: #fff;background: #ea623a;padding: 0.2rem 0.5rem;border-radius: 4px;">{{item.pickUpInfo.Password}}</span>
              开柜后10分钟失效
              </mn-card-body>
            </mn-card-item>
            <mn-card-item v-if="item.pickUpInfo">
              <mn-card-prefix>
                <mn-label>箱柜编号</mn-label>
              </mn-card-prefix>
              <mn-card-body>
                <div>
                  <div v-for="(box, $index) in item.pickUpInfo.PhoneBoxInfos" :key="$index">
                    <span style="color: #ea623a;" v-if="box">{{box.TypeName}} {{box.CabinetNumber}}-{{box.SerialNumber}}号箱</span>
                  </div>
                </div>
              </mn-card-body>
            </mn-card-item>
            <mn-card-item>
              <mn-card-prefix>
                <mn-label>配送站点</mn-label>
              </mn-card-prefix>
              <mn-card-body>
              {{item.stationName}}
              </mn-card-body>
            </mn-card-item>
            <mn-card-item>
              <mn-card-prefix>
                <mn-label>配送时间</mn-label>
              </mn-card-prefix>
              <mn-card-body>
              {{item.shippingTime}}
              </mn-card-body>
            </mn-card-item>
          </mn-card>
        </div>

        <div v-if="expressOrders && activeType === 2">
          <mn-card class="product" v-for="(item, key) in expressOrders" :key="key">
            <mn-card-item>
              <mn-card-prefix class="product-img">
                <div class="img" style="width: 80px; height: 80px;background: #ccc;">
                  <img :src="item.imagePath">
                </div>
              </mn-card-prefix>
              <mn-card-body>
                <div class="product-title">
                  {{item.pickupcardProductName}}
                </div>
                <div class="product-info">
                  <span style="color: #999; font-size: 0.875rem;">×1</span>
                </div>
              </mn-card-body>
            </mn-card-item>
            <mn-card-item>
              <mn-card-prefix>
                <mn-label>提货时间</mn-label>
              </mn-card-prefix>
              <mn-card-body>
              {{item.pickupTime}}
              </mn-card-body>
            </mn-card-item>
            <mn-card-item style="color: #ea623a;">
              <mn-card-prefix>
                <mn-label>配送状态</mn-label>
              </mn-card-prefix>
              <mn-card-body>
              {{item.expressNum ? '已发货' : '待发货'}}
              </mn-card-body>
            </mn-card-item>
            <mn-card-item v-if="item.expressCompany">
              <mn-card-prefix>
                <mn-label>配送物流</mn-label>
              </mn-card-prefix>
              <mn-card-body>
              {{item.expressCompany}}
              </mn-card-body>
            </mn-card-item>
            <mn-card-item v-if="item.expressNum">
              <mn-card-prefix>
                <mn-label>物流单号</mn-label>
              </mn-card-prefix>
              <mn-card-body class='track-item'>
              <span>
                {{item.expressNum}}
              </span>
              <span @click="searchTrack(item)">查询</span>
              </mn-card-body>
            </mn-card-item>
            <mn-card-item>
              <mn-card-prefix>
                <mn-label>收货人</mn-label>
              </mn-card-prefix>
              <mn-card-body>
              {{item.consignee}}
              </mn-card-body>
            </mn-card-item>
            <mn-card-item>
              <mn-card-prefix>
                <mn-label>联系电话</mn-label>
              </mn-card-prefix>
              <mn-card-body>
              {{item.consigneePhonenum}}
              </mn-card-body>
            </mn-card-item>
            <mn-card-item>
              <mn-card-prefix>
                <mn-label>收货地址</mn-label>
              </mn-card-prefix>
              <mn-card-body>
              {{item.consigneeAddress}}
              </mn-card-body>
            </mn-card-item>
          </mn-card>
        </div>
      </mn-container>
    </mn-scroller>

    <mn-modal :visible.sync="showModal" class="sign-modal" style="height: 60%;">
      <mn-scroller :save="false">
        <mn-card v-if="trackList">
          <mn-card-item v-for="(item, key) in trackList" :key="key">
            <mn-card-body>
              <div style="font-size: 0.875rem;">{{item.AcceptStation}}</div>
              <small style="color: #666;">{{item.AcceptTime}}</small>
            </mn-card-body>
          </mn-card-item>
        </mn-card>
        <div v-else class="empty-track">
          暂无包裹数据,请稍后再查询
        </div>
      </mn-scroller>
    </mn-modal>
  </div>
</template>

<script>
  import input from 'vue-human/suites/input'
  import modal from 'vue-human/suites/modal'
  import SignModal from '../sign/exchangeSign.vue'
  import { mapGetters } from 'vuex'
  import { smsCode, listByPhone, listByAccount, pickUpPsw } from '../../axios/exchange'
  import LoadingMask from 'vue-human/utils/LoadingMask'
  import Alert from 'vue-human/utils/Alert'

  export default {
    components: {
      ...input.map(),
      ...modal.map(),
      SignModal
    },
    computed: {
      ...mapGetters({
        token: 'exToken',
        city: 'exCity'
      }),
      searchBtnShow () {
        if (this.activeType === 1) {
          return this.token.customerGuid
        } else {
          return this.models.phone && this.models.verifyCode
        }
      },
      rightPhone () {
        return /^1[3|4|5|7|8][0-9]{9}$/.test(this.models.phone)
      }
    },
    data () {
      return {
        pickType: [{
          label: '自提订单',
          value: 1
        }, {
          label: '快递订单',
          value: 2
        }],
        stationOrders: undefined,
        expressOrders: undefined,
        toggleModal: false,
        activeType: 1,
        models: {
          phone: undefined,
          verifyCode: undefined
        },
        sendingCode: false,
        secondDown: 59,
        timer: undefined,
        showModal: false,
        trackList: undefined,
        gettingPsw: false
      }
    },
    methods: {
      toggleSign () {
        this.toggleModal = !this.toggleModal
      },
      onSelectType (item) {
        this.activeType = item.value
      },
      smsCode () {
        if (this.sendingCode || !this.rightPhone) return

        const params = {
          phoneNum: this.models.phone
        }
        this.sendingCode = true
        smsCode(params)
        .then(response => {
          this.timer = setInterval(() => {
            this.secondDown -= 1
            if (this.secondDown === 0) {
              clearInterval(this.timer)
              this.timer = undefined
              this.secondDown = 60
              this.sendingCode = false
            }
          }, 1000)
        })
        .catch(error => {
          this.sendingCode = false
          console.log(error)
          this.alertLayer = Alert.create({
            title: '出错了~',
            description: error.response.data.message,
            cancelText: '好的'
          }).show()
        })
      },
      listByPhone () {
        const params = {
          ...this.models
        }

        listByPhone(params)
        .then(response => {
          if (this.loadingMaskLayer) this.loadingMaskLayer.destroy()
          this.expressOrders = response.data.target
        })
        .catch(error => {
          if (this.loadingMaskLayer) this.loadingMaskLayer.destroy()
          this.alertLayer = Alert.create({
            title: '出错了~',
            description: error.response.data.message,
            cancelText: '好的'
          }).show()
        })
      },
      listByAccount () {
        const params = {
          customerguid: this.token.customerGuid
        }

        listByAccount(params)
        .then(response => {
          if (this.loadingMaskLayer) this.loadingMaskLayer.destroy()
          this.stationOrders = response.data.target
        })
        .catch(error => {
          if (this.loadingMaskLayer) this.loadingMaskLayer.destroy()
          this.alertLayer = Alert.create({
            title: '出错了~',
            description: error.response.data.message,
            cancelText: '好的'
          }).show()
        })
      },
      search () {
        this.loadingMaskLayer = LoadingMask.create().show()
        if (this.activeType === 1) {
          this.listByAccount()
        } else {
          this.listByPhone()
        }
      },
      searchTrack (item) {
        if (Array.isArray(item.trackList)) {
          this.trackList = [...item.trackList].reverse()
        } else {
          this.trackList = undefined
        }

        this.showModal = true
      },
      pickUpPsw (item) {
        if (this.gettingPsw) return
        this.gettingPsw = true

        const params = {
          orderid: item.zitiOrderId,
          customerguid: this.token.customerGuid,
          citycode: this.city.CityFlag
        }

        pickUpPsw(params)
        .then(response => {
          console.log(response)
          this.gettingPsw = false
          item.pickUpInfo = response.data.target
        })
        .catch(error => {
          console.log(error)
          this.gettingPsw = false
        })
      }
    },
    created () {
    },
    beforeDestroy () {
      if (this.loadingMaskLayer) this.loadingMaskLayer.destroy()
      if (this.alertLayer) this.alertLayer.destroy()
    },
    watch: {
    }
  }
</script>

<style lang="scss" scoped>
.pickType-item {
  width: 50%;
  text-align: center;

  &.is-selected {
    color: #49ab34;
    border-color: #49ab34;
  }

  &:last-child {
    border-left: 1px solid #999;
  }
}

.product {
  margin-bottom: 0;
  border-bottom: 1px solid #ccc;

  .mn-card-item {
    border: none;

    .mn-label {
      color: #666;
    }
  }

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

.pickup-type {
  background: #fff;

  h2 {
    text-align: center;
    padding: 0.6rem;
    font-size: 1rem;
  }

  .mn-card {
    margin-bottom: 0;

    .mn-card-item {
      padding: 0.5rem 0;

      .mn-card-body {
        display: flex;

      }
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

.verify-code {
  display: flex;

  .mn-input {
    flex: 1 0 65%;
  }

  &-btn {
    flex: 1 0 35%;
    border-left: 1px solid #ccc;
    padding-left: 1rem;
    color: #49ab34;

    &.is-disabled {
      color: #ccc;
    }
  }
}

.empty-track {
  width: 100%;
  text-align: center;
  color: #666;
  position: absolute;
  top: 50%;
  margin-top: -1rem;
}

.track-item {
  & > span:last-child {
    border: 1px solid #666;
    color: #666;
    padding: 2px 1rem;
    border-radius: 3px;
    font-size: 0.875rem;
  }
}
</style>
