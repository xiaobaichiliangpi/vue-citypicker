<template>
  <mn-scroller>
    <mn-container>
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
      <mn-form :validate="$v" @success="success" ref="form" class="address">
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
          <mn-card-item style="border-bottom: solid 1px rgba(0, 0, 0, 0.1);">
            <mn-card-body>
              <mn-input v-model="models.passwd"
               placeholder="输入卡片密码"></mn-input>
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
          <mn-btn theme="primary" ref="submit" block>我要提货</mn-btn>
        </div>
        <div class="form-footer">
          <div @click="$router.push({name: 'homepage'})">购买提货卡</div>
          <div>我的提货卡记录</div>
        </div>
      </mn-form>
    </mn-container>
  </mn-scroller>
</template>

<script>
  import input from 'vue-human/suites/input'
  import {
    required,
    minLength,
    maxLength } from 'vuelidate/lib/validators'

  export default {
    components: {
      ...input.map()
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
        activeType: 1
      }
    },
    methods: {
      success () {
      },
      onSelectType (item) {
        this.activeType = item.value
      }
    },
    created () {
    },
    beforeDestroy () {
    }
  }
</script>

<style lang="scss">
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
</style>
