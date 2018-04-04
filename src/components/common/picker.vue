<template>
  <transition name="slide">
    <div class="container-box" v-if="visible">
      <div class="box-head">
        <slot name="head-text">
          配送至
        </slot>
        <mn-icon :name="icons.close" @click.native="onClose"></mn-icon>
      </div>
      <div class="box-intro">
        <div class="box-intro-item" v-for="(item, index) of results" :key="index">
          <span v-text="item.text" @click="onChangeTab(index)" :class="{'has-bd-bm': isActive(index)}"></span>
        </div>
      </div>
      <div class="box-content" ref="box">
        <div class="content-list" v-for="(arr, key) of defaultArr" :key="key">
          <div :class="['content-list-item', {'item-selected': results[key] && results[key].value === item.value}]"
            v-if="arr.length"
            v-for="(item, index) of arr"
            :key="index"
            @click="onClick(item, key)">
            <span class="item-text">{{ item.text }}</span>
            <span class="item-status" v-if="results[key] && results[key].value === item.value">
              <mn-icon :name="icons.active"></mn-icon>
            </span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Element from 'vue-human/utils/Element'
import layerMixin from 'vue-human/suites/layer/layerMixin'
import shadeMixin from 'vue-human/suites/layer/shadeMixin'
// import shadeMixin from '../mixin/shadeMixin'
// import cityArray from '../areaData.js'

export default new Element({
  name: 'city-picker',
  mixins: [
    layerMixin,
    shadeMixin
  ],
  data () {
    return {
      results: [
        {
          text: '请选择',
          value: undefined
        }
      ],
      icons: {
        close: require('vue-human-icons/js/ios/close-empty'),
        active: require('vue-human-icons/js/ios/checkmark-empty')
      },
      defaultArr: [
        this.cityArray[0],
        [],
        []
      ],
      activeIndex: 0,
      defaultData: {
        text: '请选择',
        value: undefined
      },
      isDone: false
    }
  },
  props: {
    shadePropsData: {
      default () {
        return {
          disableClosing: true
        }
      }
    },
    cityArray: {
      require: true,
      default () {
        return []
      }
    }
  },
  methods: {
    whenShadeCallHiding () {
      this.hide()
    },
    onClose () {
      // claer results
      if (!this.isDone) {
        this.results = [
          {
            text: '请选择',
            value: undefined
          }
        ]
      }
      this.$emit('close')
    },
    onClick (data, key) {
      if (data.value === this.results[key].value) { // 重复点击同一个
        return
      }
      // if (key === this.activeIndex) { // 同级选择(清除child)
      let len = this.results.length
      if (key < this.cityArray.length - 1 && this.haveChild(data, key)) { // 不是最后一级(需要带上'请选择')
        let temp = this.defaultData
        this.results.splice(key, len, data, temp)
        this.activeIndex = key + 1
        this.updateChild()
      } else {
        this.results.splice(key, len, data)
        this.isDone = true
        this.callBack()
      }
      // this.updateChild()
    },
    isActive (index) {
      return index === this.activeIndex
    },
    updateChild () {
      let temp = this.cityArray[this.activeIndex][this.results[this.activeIndex - 1].value]
      let len = this.defaultArr[this.activeIndex].length
      this.defaultArr[this.activeIndex].splice(0, len, ...temp)
      // 移到下一级
      this.onTranslate()
    },
    onTranslate () {
      this.$refs.box.style.transform = `translate(-${(this.activeIndex) * 100}%,0)`
    },
    callBack () {
      this.$emit('success', this.results)
    },
    onChangeTab (index) {
      this.activeIndex = index
      this.onTranslate()
    },
    haveChild (data, key) {
      let res = this.cityArray[key + 1][data.value] && this.cityArray[key + 1][data.value].length
      return res
    }
  },
  created () {
  },
  watch: {
    'visible' () {
      if (this.visible && this.results[0].value) {
        this.$nextTick(() => {
          this.onTranslate()
        })
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.container-box {
  background-color: #fff;
  width: 100%;
  height: auto;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 6666;
  box-shadow: 0px 5px 10px rgba(0,0,0,0.5);
  user-select: none;

  .box-head {
    padding: .625rem .5625rem;
    position: relative;
    font-size: .8125rem;
    color: #666;
    text-align: center;

    .mn-icon {
      position: absolute;
      top: 50%;
      transform: translate(-0.625rem, -50%);
      right: 0;
      z-index: 9999;
    }
  }

  .box-intro {
    display: flex;
    align-items: center;

    &-item {
      flex: 0 1 33.33%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #333;
      font-size: .875rem;
      box-sizing: border-box;

      &>span {
        padding: .5rem 1.5625rem;
        font-weight: 500;
        white-space: nowrap;
        border-bottom: 1px solid #fff;
      }

      .has-bd-bm {
        color: #49aa34;
        border-color: #49aa34;
      }
    }
  }

  .box-content {
    height: 15rem;
    // overflow: hidden;
    display: flex;
    transition: transform .3s ease;
    transform: translate(0,0);
    padding-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
    padding-bottom: env(safe-area-inset-bottom);

    .content-list {
      height: 100%;
      width: 100%;
      flex: 1 0 100%;
      overflow: hidden;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;

      &::-webkit-scrollbar {
        width: 1px;
      }

      &-item {
        width: 100%;
        height: 2.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 .625rem 0 2rem;
        font-size: .8125rem;
        color: #666;

        .item-text {}

        .item-status {
          color: #49aa34;
        }
      }

      .item-selected {
        background-color: #eee;
      }

    }
  }
}
.slide-enter, .slide-leave-active {
  transform: translate3d(0,110%,0);
}

.slide-enter-active, .slide-leave-active {
  transition: all .3s;
}
</style>
