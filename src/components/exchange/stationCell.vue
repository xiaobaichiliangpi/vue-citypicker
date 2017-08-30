<template>
  <div>
    <mn-scroller @bottom="onScrollToBottom">
      <div class="stations-cell">
        <div class="stations-cell-item"
          v-for="(item, key) in stations"
          :key="key"
          @click="onSelect(item)">
          <div class="stations-icon">
             <mn-icon :name="item.Id === isSelected ? icons.checkmark: icons.circle"
              :class="[{ 'is-selected': item.Id === isSelected}]"
              :scale="0.9"></mn-icon>
          </div>
          <div class="stations-title">
            <span>{{item.Name}}</span>
            <span>{{item.Distance < 1000 ? `${item.Distance}m` : `${(item.Distance / 1000).toFixed(1)}km`}}</span>
          </div>
        </div>
      </div>
      <div class="has-one-padding-y has-center-text" v-if="isLoading" style="color: #999;">
        <mn-loading-icon></mn-loading-icon> 正在加载
      </div>
      <div class="has-one-padding-y has-center-text" v-if="!HasNextPage" style="color: #999;">
       <small>没有更多了</small>
      </div>
    </mn-scroller>
    <mn-modal :visible.sync="showModal" class="station-modal">
      <div class="station-modal-content">
        <div class="modal-tip">
          <div>站点提醒:</div>
          <div>请选择您所在生活或工作区域的自提站点，以免发生无法进入而不能及时取货的情况。</div>
          <div>
            <mn-icon :name="icons.close" :scale="0.9" @click.native="showModal = false"></mn-icon>
          </div>
        </div>
        <div class="modal-info">
          <div>
            <div class="title">
              <span>{{currentStation.Name}}</span>
              <mn-icon :name="icons.snowy" :scale="0.9" v-if="currentStation.HasFreezeBox"></mn-icon>
            </div>
            <div class="address">
              {{currentStation.Address}}
            </div>
          </div>
          <div>
            <mn-icon :name="icons.location" :scale="0.9"></mn-icon>
          </div>
        </div>
        <div class="modal-tool">
          <mn-btn theme="primary" size="sm" block @click="submit">保存自提站点</mn-btn>
          <span>
            <mn-icon :name="isDefault ? icons.checkmark : icons.circle"
              :scale="0.9"
              @click.native="isDefault = !isDefault"
              :class="{ 'is-selected': isDefault }"></mn-icon>
            设置为默认配送站点
          </span>
        </div>
      </div>
    </mn-modal>
  </div>
</template>

<script>
  import modal from 'vue-human/suites/modal'
  import { createOrUpdateAddress } from '../../axios/exchange'

  export default {
    components: {
      ...modal.map()
    },
    props: {
      stations: {
        type: Array
      },
      isLoading: {
        type: Boolean
      },
      HasNextPage: {
        type: Boolean
      }
    },
    data () {
      return {
        currentStation: {},
        showModal: false,
        isSelected: undefined,
        icons: {
          location: require('vue-human-icons/js/ios/location'),
          close: require('vue-human-icons/js/ios/close-empty'),
          snowy: require('vue-human-icons/js/ios/snowy'),
          checkmark: require('vue-human-icons/js/ios/checkmark'),
          circle: require('vue-human-icons/js/ios/circle-outline')
        },
        isDefault: true
      }
    },
    computed: {
    },
    methods: {
      /**
       * 选择站点
       * @return {[type]} [description]
       */
      onSelect (item) {
        this.isSelected = item.Id
        this.isDefault = true
        this.currentStation = item
        this.showModal = true
      },
      /**
       * 更新站点
       * @return {[type]} [description]
       */
      async updateAddress (params) {
        const response = await createOrUpdateAddress(params)
        console.log(response)
      },
      /**
       * 提交保存
       * @return {[type]} [description]
       */
      submit () {
        const params = {
          addressId: -1,
          workStationId: this.currentStation.Id,
          isdefault: this.isDefault
        }

        this.showModal = false

        this.updateAddress(params)
        .then(response => {
          this.$router.go(-1)
        })
      },
      onScrollToBottom () {
        this.$emit('scrollerBottom')
      }
    },
    created () {
    }
  }
</script>

<style lang="scss" scoped>
  .stations-cell {
    &-item {
      color: rgb(102, 102, 102);
      display: flex;
      align-items: center;
      font-size: 1rem;
      line-height: 1;
    }

    .stations-icon {
      padding-left: 0.4rem;
      width: 2rem;

      .is-selected {
        color: #49aa34;
      }
    }

    .stations-title {
      flex: 1;
      line-height: 2rem;
      padding: 0.5rem 0;
      border-bottom: 1px solid rgb(216, 216, 216);
      display: flex;
      justify-content: space-between;
      padding-right: 0.5rem;

      span:last-child {
        background: rgb(231, 244, 236);
        padding: 0 0.5rem;
        height: 2rem;
        line-height: 2rem;
        border-radius: 1rem;
        color: rgb(20, 153, 66);
        font-size: 0.75rem;
      }
    }
  }

  .mn-modal.station-modal {
    top: inherit;
    right: 0;
    left: 0;
    bottom: 0;
    border-radius: 0;
    padding: 1rem;

    .modal-tip {
      display: flex;
      justify-content: space-between;
      font-size: 0.75rem;
      line-height: 1.1;
      color: #f05423;
      margin-bottom: 1rem;

      div {
        &:first-child {
          width: 7rem;
          color: #333;
        }
      }
    }

    .modal-info {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;

      div:first-child {
        flex: 1;
      }

      .address {
        font-size: 0.875rem;
        color: #777;
      }

      .title {
        font-size: 1rem;
      }

      .mn-icon {
        color: #4da1cd;
      }
    }

    .modal-tool {
      font-size: 0.875rem;

      .mn-btn {
        background-color: #49aa34;
        border-radius: 5px;
        margin-bottom: 1rem;
      }

      .mn-icon {
        color: #999;

        &.is-selected {
          color: #49aa34;
        }
      }
    }
  }
</style>
