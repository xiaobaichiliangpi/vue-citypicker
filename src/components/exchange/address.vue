<template>
  <div>
    <div>
      <div style="position: relative;">
        <p class="loading" v-if="!address"><mn-loading-icon></mn-loading-icon>正在加载中</p>

        <mn-section class="order-address" v-if="address">
          <mn-card class="order-address-item"
            v-for="item in address"
           :key="item.Id">
            <mn-card-item @click.native="onChooseAddress(item)">
              <mn-card-prefix v-if="(pageType === 'exchangeAddress') && (workstation.WorkStationId
                && (item.WorkStationId === workstation.WorkStationId))">
                <mn-icon :name="icons.checkmarkEmpty"
                  class="is-selected"></mn-icon>
              </mn-card-prefix>
              <mn-card-body>
                <div class="name">
                  <p>{{ item.WorkStationName }}</p>
                  <mn-icon :name="icons.snowy"
                    :class="{ 'is-freeze': item.HasFreezeBox }"
                    ></mn-icon>
                  <span class="tag is-default"
                    v-if="item.IsDefault">默认</span>
                </div>

                <p class="address">{{ item.ShippingAddress }}</p>
              </mn-card-body>
              <mn-card-suffix action>
                <mn-icon :name="icons.location"
                  :scale="1.2"
                  class="location"
                  ></mn-icon>
              </mn-card-suffix>
            </mn-card-item>
            <mn-card-item v-if="isEdit">
              <mn-card-body>
                <div class="address-tool">
                  <div>
                    <mn-icon :name="item.IsDefault ? icons.checkmark : icons.circle"
                    :class="[{ 'is-default': item.IsDefault }]"
                    @click.native="onSelect(item)"></mn-icon>设为默认
                  </div>
                  <div
                  class="address-tool-delete"
                  v-if="pageType === 'addressManage' || (workstation.WorkStationId
                  ? item.WorkStationId !== workstation.WorkStationId
                  : !item.IsDefault)"
                  @click="onDelete(item)">
                    <span>删除</span>
                  </div>
                </div>
              </mn-card-body>
            </mn-card-item>
          </mn-card>
        </mn-section>
        <div class="address-actions" v-if="pageType !== 'addressManage'">
          <span @click="isEdit = true" v-if="!isEdit">编辑</span>
          <span @click="isEdit = false" v-else>完成</span>
        </div>
      </div>
      <div class="address-bottom">
        <mn-btn theme="primary" size="sm" block @click="$router.push({name: 'exchangeStation'})">+新建自提站点</mn-btn>
      </div>
    </div>
  </div>
</template>

<script>
  import { createOrUpdateAddress, listUserAddress, deleteAddress } from '../../axios/exchange'
  import LoadingMask from 'vue-human/utils/LoadingMask'
  import Confirm from 'vue-human/utils/Confirm'
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        workstation: 'station'
      })
    },
    data () {
      return {
        address: undefined,
        icons: {
          location: require('../../assets/cell_my_address'),
          checkmarkEmpty: require('vue-human-icons/js/ios/checkmark-empty'),
          checkmark: require('vue-human-icons/js/ios/checkmark'),
          circle: require('vue-human-icons/js/ios/circle-outline'),
          snowy: require('vue-human-icons/js/ios/snowy')
        },
        pageType: this.$route.name,
        isEdit: false
      }
    },
    methods: {
      /**
       * 从服务器获得 地址列表，并赋值给 address
       * @return {Promise}
       */
      async listUserAddress () {
        this.loadingMaskLayer = LoadingMask.create().show()
        const response = await listUserAddress()
        this.address = response.data.target

        if (this.loadingMaskLayer) this.loadingMaskLayer.destroy()
      },
      onChooseAddress (item) {
        if (this.pageType === 'addressManage') return

        this.$store.commit('UPDATE_ORDER_WORKSTATION', item)
        this.$store.commit('UPDATE_ORDER_RECEIVETIME', {})
        this.$router.go(-1)
      },
      /**
       * 设置默认按钮
       * @param  {[type]} item 站点信息
       */
      onSelect (item) {
        const params = {
          workStationId: item.WorkStationId,
          addressId: item.AddressId,
          isdefault: !item.IsDefault
        }

        this.confirmLayer = Confirm.create({ title: '提示', description: `确认设置默认地址?` }).show()
        .on('confirm', () => {
          this.updateAddress(params)
          .then(response => {
            return this.listUserAddress()
          })
        })
      },
      /**
       * 设置默认站点
       * @param  {[Object]} params
       * @return {[promise]}
       */
      async updateAddress (params) {
        this.loadingMaskLayer = LoadingMask.create().show()
        await createOrUpdateAddress(params)

        if (this.loadingMaskLayer) this.loadingMaskLayer.destroy()
      },
      onDelete (item) {
        this.confirmLayer = Confirm.create({ title: '提示', description: `确认删除地址?` }).show()
        .on('confirm', () => {
          this.deleteAddress({
            addressId: item.AddressId
          })
          .then(response => {
            return this.listUserAddress()
          })
          .catch(error => {
            console.log(error)
            if (this.loadingMaskLayer) this.loadingMaskLayer.destroy()
          })
        })
      },
      /**
       * 删除地址
       */
      async deleteAddress (params) {
        this.loadingMaskLayer = LoadingMask.create().show()
        await deleteAddress(params)

        if (this.loadingMaskLayer) this.loadingMaskLayer.destroy()
      }
    },
    created () {
      switch (this.pageType) {
        case 'addressManage':
          this.isEdit = true
          break
      }

      this.listUserAddress()
    },
    beforeDestroy () {
      this.$store.commit('UPDATE_PICK_TYPE', 1)
      if (this.loadingMaskLayer) this.loadingMaskLayer.destroy()
      if (this.confirmLayer) this.confirmLayer.destroy()
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

  .order-address {
    padding-bottom: 4rem;

    &-item {
      .name {
        color: #49aa34;
        display: flex;
        line-height: 1.2rem;
        padding: 0.4rem 0;

        p {
          align-self: center;
        }
      }

      p.address {
        color: #7f7f7f;
        font-size: 0.875rem;
        line-height: 1rem;
      }

      .mn-icon.location {
        color: #52ccea;
      }

      .mn-icon.is-selected,
      .mn-icon.is-default {
        color: #49aa34;
      }

      .tag {
        font-size: 0.75rem;
        color: #fff;
        display: block;
        margin-left: 0.5rem;
        border-radius: 3px;
        align-self: center;
        height: 1.3rem;
        line-height: 1.3rem;
        padding: 0 0.5rem;

        &.is-default {
          background-color: #49aa34;
        }
      }

      .mn-icon {
        color: #999;
        align-self: center;

        &.is-freeze {
          color: #0abaff;
        }
      }
    }
  }

  .address-actions {
    position: fixed;
    bottom: 4rem;
    right: 1rem;
    z-index: 99;

    span {
      display: block;
      width: 44px;
      height: 44px;
      border-radius: 22px;
      background-color: rgba(0, 0, 0, 0.5);
      font-size: 0.875rem;
      color: #fff;
      line-height: 44px;
      text-align: center;
    }
  }

  .address-bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 3.75rem;
    background: rgb(246, 246, 246);
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 -1px 0 rgba(209, 209, 209, 0.30);

    .mn-btn.is-primary {
      background: #49aa34;
      width: 62.5%;
      height: 2.5rem;
      border-radius: 0.2rem;
      font-size: 1.1rem;

      &:active {
        background: darken(#49aa34, 10%);
      }
    }
  }

  .address-tool {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;
    line-height: 1.5rem;

    .mn-icon {
      margin-right: 0.4rem;
    }

    &-delete {
      padding: 0.1rem 1rem;
      border: 1px solid #333;
    }
  }
</style>
