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

                </div>
              </mn-card-prefix>
              <mn-card-body>
                <div class="product-title">
                  {{item.pickupcardProductName}}
                </div>
                <div class="product-info">
                  <span style="color: #999; font-size: 0.875rem;">×{{item.number}}</span>
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
              <mn-card-body style="color: #ea623a;">
              {{item.orderStatus}}
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
        </div>

      </mn-container>
    </mn-scroller>
  </div>
</template>

<script>
  import input from 'vue-human/suites/input'
  import SignModal from '../sign/exchangeSign.vue'
  import { mapGetters } from 'vuex'
  import { smsCode, listByPhone, listByAccount } from '../../axios/exchange'

  export default {
    components: {
      ...input.map(),
      SignModal
    },
    computed: {
      ...mapGetters({
        token: 'exToken'
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
        timer: undefined
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
        })
      },
      listByPhone () {
        const params = {
          ...this.models
        }

        listByPhone(params)
        .then(response => {
          this.expressOrders = response.data.target
        })
        .catch(error => {
          console.log(error)
        })
      },
      listByAccount () {
        const params = {
          customerguid: this.token.customerGuid
        }

        listByAccount(params)
        .then(response => {
          this.stationOrders = response.data.target
        })
        .catch(error => {
          console.log(error)
        })
      },
      search () {
        if (this.activeType === 1) {
          this.listByAccount()
        } else {
          this.listByPhone()
        }
      }
    },
    created () {
    },
    beforeDestroy () {
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
</style>
