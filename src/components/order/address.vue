<template>
  <mn-scroller>
    <mn-container>
      <mn-form :validate="$v" @success="success" ref="form" class="address">
        <mn-card>
          <mn-card-item>
            <mn-card-prefix>
              <mn-label :validate="$v.models.consignee">收货人</mn-label>
            </mn-card-prefix>
            <mn-card-body>
              <mn-input v-model="models.consignee"
               placeholder="收货人姓名"></mn-input>
            </mn-card-body>
          </mn-card-item>
          <mn-card-item>
            <mn-card-prefix>
              <mn-label :validate="$v.models.consigneePhonenum">联系电话</mn-label>
            </mn-card-prefix>
            <mn-card-body>
              <mn-input v-model="models.consigneePhonenum"
               placeholder="收货人电话"></mn-input>
            </mn-card-body>
          </mn-card-item>
          <mn-card-item class="address-textarea">
            <mn-card-prefix>
              <mn-label :validate="$v.models.consigneeAddress">收货地址</mn-label>
            </mn-card-prefix>
            <mn-card-body>
               <mn-textarea v-model="models.consigneeAddress" placeholder="请填写详细地址" :max-length="100" :rows="2"></mn-textarea>
            </mn-card-body>
          </mn-card-item>
        </mn-card>

         <mn-section-note>
          <mn-helper :validate="$v.models.consignee">
            <mn-helper-item name="required">收货人不能为空</mn-helper-item>
          </mn-helper>
        </mn-section-note>

        <mn-section-note>
          <mn-helper :validate="$v.models.consigneePhonenum">
            <mn-helper-item name="required">联系电话不能为空</mn-helper-item>
            <mn-helper-item name="phone">手机格式不对</mn-helper-item>
          </mn-helper>
        </mn-section-note>

        <mn-section-note>
          <mn-helper :validate="$v.models.consigneeAddress">
            <mn-helper-item name="required">收货地址不能为空</mn-helper-item>
          </mn-helper>
        </mn-section-note>

        <div class="address-submit-btn">
          <mn-btn theme="primary" ref="submit" block>确定</mn-btn>
        </div>
      </mn-form>
    </mn-container>
  </mn-scroller>
</template>

<script>
  import input from 'vue-human/suites/input'
  import textarea from 'vue-human/suites/textarea'
  import { required } from 'vuelidate/lib/validators'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      ...input.map(),
      ...textarea.map()
    },
    validations: {
      models: {
        consignee: {
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
        },
        consigneeAddress: {
          required
        }
      }
    },
    data () {
      return {
        models: {
          consignee: undefined,
          consigneePhonenum: undefined,
          consigneeAddress: undefined
        }
      }
    },
    computed: {
      ...mapGetters({
        address: 'address'
      })
    },
    methods: {
      success () {
        this.$store.commit('UPDATE_ADDRESS', this.models)
        this.$router.go(-1)
      }
    },
    created () {
      if (this.address) {
        Object.keys(this.models).forEach(key => {
          this.models[key] = this.address[key]
        })
      }
    },
    beforeDestroy () {
      if (this.alertLayer) this.alertLayer.destroy()
      if (this.loadingmask) this.loadingmask.destroy()
    }
  }
</script>

<style lang="scss">
.address-submit-btn {
  padding: 0 1rem;

  .mn-btn.is-primary {
    background-color: #49ab34;
    border-radius: 6px;

    &:active,
    &:hover {
      background: darken(#49ab34, 10%);
    }
  }
}

.address {
  .mn-textarea-counter {
    display: none;
  }

  .address-textarea {
    align-items: flex-start;
  }
}
</style>
