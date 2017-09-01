<template>
  <div style="position: relative;height: 100%;">
    <p class="loading" v-if="!receiveTime"><mn-loading-icon></mn-loading-icon>正在加载中</p>

    <mn-section class="order-receivetime" v-if="receiveTime">
      <mn-card>
        <mn-card-item v-for="item in receiveTime.ShippingTimes"
          :key="item.Id">
          <mn-card-body class="order-receivetime-list">
            <div class="date">
              <p>{{ item.Date }}</p>
              <p>{{ item.RelativeToday }}{{ item.Week }}</p>
            </div>
            <div class="time">
              <div class="time-item"
                v-for="time in item.PeriodList"
                :key="time.Id"
                @click="onChooseTime(item, time)">
                <p :class="{ 'is-canship': time.Canshipping }">
                  {{ time.Period }}
                </p>
                <mn-icon :name="(!time.Canshipping) ? icons.checkmark : icons.circle"
                  v-if="!receivetime.PeriodList"
                  ></mn-icon>
                <mn-icon :name="(receivetime.PeriodList.Shippingtime === time.Shippingtime &&
                  receivetime.Date === item.Date)
                  ? icons.checkmark : icons.circle"
                  :class="{ 'is-selected': receivetime.PeriodList.Shippingtime === time.Shippingtime &&
                    receivetime.Date === item.Date }"
                  v-if="receivetime.PeriodList"
                  ></mn-icon>
              </div>
            </div>
          </mn-card-body>
        </mn-card-item>
      </mn-card>
      <p class="tips">{{ receiveTime.MaxEndTimeTip }}</p>
    </mn-section>
  </div>
</template>

<script>
  import { listUserReceiverTime } from '../../axios/exchange'
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        receivetime: 'receivetime'
      })
    },
    data () {
      return {
        receiveTime: undefined,
        icons: {
          circle: require('vue-human-icons/js/ios/circle-outline'),
          checkmark: require('vue-human-icons/js/ios/checkmark')
        }
      }
    },
    methods: {
      /**
       * 从服务器获得取货时间信息
       * @return {Promise}
       */
      async listUserReceiverTime () {
        const params = {
          workStationId: this.$route.params.workStationId,
          cardNum: this.$route.query.cardNum
        }
        const response = await listUserReceiverTime(params)
        this.receiveTime = response.data.target
      },
      onChooseTime (item, time) {
        if (!time.Canshipping) return

        item.PeriodList = time
        this.$store.commit('UPDATE_ORDER_RECEIVETIME', item)
        this.$router.go(-1)
      }
    },
    created () {
      this.listUserReceiverTime()
    },
    beforeDestroy () {
      this.$store.commit('UPDATE_PICK_TYPE', 1)
    }
  }
</script>

<style lang="scss" scoped>
  .loading {
    font-size: 0.875rem;
    text-align: center;
    color: #999;
    padding: 1rem;
  }

  .order-receivetime {
    .mn-card-item {
      padding: 0 0.5rem;
    }

    &-list {
      display: flex;

      .date {
        flex: 0 0 35%;
        text-align: center;
        align-self: center;

        p + p {
          color: #999;
        }
      }

      .time {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        line-height: 3.5rem;
        padding: 0 0.5rem;

        &-item:last-child {
          border-top: 1px solid #eee;
        }

        &-item {
          display: flex;
          justify-content: space-between;

          p {
            color: #999;

            &.is-canship {
              color: #333;
            }
          }

          & .mn-icon {
            align-self: center;
            color: #999;

            &.is-selected {
              color: #49aa34;
            }
          }
        }
      }
    }

    .tips {
      color: #f05423;
      padding: 0rem 1rem;
    }
  }
</style>
y
