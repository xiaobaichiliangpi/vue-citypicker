<template>
  <div class="station-wrap">
    <div class="station-header">
      <mn-card class="station-search">
        <mn-card-item>
          <mn-card-body>
            <mn-input v-model="models.KeyWord"
              placeholder="站点名称搜索"
              ></mn-input>
          </mn-card-body>
          <mn-card-suffix action>
            <mn-btn
              theme="primary"
              size="sm"
              @click.native="onSearch">搜索</mn-btn>
          </mn-card-suffix>
        </mn-card-item>
      </mn-card>
    </div>
    <div class="station-box">
      <div class="station">
        <div class="station-menu station-flex">
          <mn-scroller>
            <div class="has-four-padding-y has-center-text" v-if="!areas">
              <mn-loading-icon></mn-loading-icon>
            </div>
            <ul v-else>
              <li v-for="(item, key) in areas" :key="key" @click="onSelect(item)" :class="{'is-selected': isSelected === item.Id}">
                <a href="javascript:;">
                  {{item.Name}}
                </a>
              </li>
            </ul>
          </mn-scroller>
        </div>
        <div class="station-content station-flex">
          <station-cell :stations="stations" @scrollerBottom="onScrollToBottom" :isLoading="isLoading" :HasNextPage="HasNextPage"></station-cell>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { listArea, listStation } from '../../axios/exchange'
  import StationCell from './stationCell'
  import input from 'vue-human/suites/input'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      StationCell,
      ...input.map()
    },
    computed: {
      ...mapGetters({
        exCity: 'exCity'
      })
    },
    data () {
      return {
        areas: undefined,
        isSelected: -1,
        stations: undefined,
        models: {
          PageIndex: 0,
          PageSize: 20,
          KeyWord: undefined
        },
        HasNextPage: true,
        isLoading: false,
        cities: {
          sz: [120.61546326, 31.32739295],
          wx: [120.30724525, 31.58760201],
          sh: [121.45832062, 31.22366501]
        }
      }
    },
    methods: {
      /**
       * 从服务端获取区域信息 复制给areas
       * @return {[promise]}
       */
      async listArea () {
        const response = await listArea()
        this.areas = response.data.target
        this.areas.unshift({
          Name: '全城',
          Id: -1
        })
      },
      /**
       * 点击区域处理方法
       */
      onSelect (item) {
        if (this.isSelected === item.Id) return

        this.stations = undefined
        this.HasNextPage = true
        this.models.PageIndex = 0

        if (item.Id !== -1) {
          this.models.AreaId = item.Id
        } else {
          this.models.AreaId = undefined
        }

        this.isSelected = item.Id
        this.listStation()
      },
      /**
       * 从服务端获取全部站点信息 赋值给stations
       * @return {[promise]}
       */
      async listStation () {
        if (this.isLoading || !this.HasNextPage) return
        this.isLoading = true
        this.models.PageIndex += 1

        const response = await listStation(this.models)
        if (this.models.KeyWord) {
          this.stations = response.data.target.SourceData
          this.HasNextPage = false
        } else {
          this.stations = [...(this.stations || []), ...response.data.target.SourceData]
          this.HasNextPage = response.data.target.HasNextPage
        }
        this.isLoading = false
      },
      /**
       * 搜索站点
       * @return {[type]} [description]
       */
      onSearch () {
        this.stations = undefined
        this.HasNextPage = true
        this.models.PageIndex = 0
        this.listStation()
      },
      onScrollToBottom () {
        this.listStation()
      }
    },
    created () {
      const flag = this.exCity.CityFlag
      this.models.Latitude = this.cities[flag][1]
      this.models.Longitude = this.cities[flag][0]

      this.listArea()
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
          this.models.Latitude = position.coords.latitude
          this.models.Longitude = position.coords.longitude
          console.log(position)
          this.listStation(this.models)
        }, error => {
          console.log(error)
          this.listStation(this.models)
        })
      } else {
        this.listStation(this.models)
      }
    }
  }
</script>

<style lang="scss">
.station-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.station-header {
  flex: 0 0;
}

.station-box {
  position: relative;
  flex: 1;
}

.station {
  display: flex;
  height: 100%;
  width: 100%;
  position: absolute;

  .station-flex {
    flex: 1;
  }

  .station-menu {
    position: relative;
    flex: 0 0 6.25rem;

    ul {
      padding: 0;
      margin: 0;
      li {
        list-style: none;
        padding: 0;
        margin: 0;

        &:first-child a {
          border-top: 1px solid transparent;
        }

        &.is-selected a,  {
          background: #fff;
        }

        &.is-selected a,
        &.is-selected + li a {
          border-top: 1px solid transparent;
        }

        a {
          display: block;
          font-size: 0.875rem;
          color: rgb(102, 102, 102);
          text-decoration: none;
          height: 2.75rem;
          line-height: 2.75rem;
          background: rgb(242, 242, 242);
          text-align: center;
          border-top: 1px solid rgb(216, 216, 216);
        }
      }
    }
  }

  .station-content {
    position: relative;
    background: #fff;
  }
}

.mn-card.station-search {
  margin-bottom: 0;
  background: #f2f2f2;

  .mn-card-item {
    padding: 0.4rem 0.625rem;
  }

  .mn-input {
    background: #fff;
    height: 2rem;
    border-radius: 4px;

    input {
      font-size: 0.875rem;
      text-align: center;
      color: #999;
    }
  }

  .mn-btn {
    border-radius: 0.3rem;
  }
}
</style>
