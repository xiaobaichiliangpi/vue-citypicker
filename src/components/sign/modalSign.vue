<template>
  <mn-modal :visible.sync="showModal" class="sign-modal">
    <h1>
    请登录
    </h1>
    <mn-form :validate="$v" @success="success" ref="form">
      <mn-section>
        <mn-card>
          <mn-card-item type="link">
            <mn-card-body>
              <mn-select
                :options="options.cities"
                v-model="models.city"
                @input="onSelectCity"></mn-select>
            </mn-card-body>
          </mn-card-item>
          <mn-card-item>
            <mn-card-body>
              <mn-input v-model="models.username" placeholder="请输入账号"></mn-input>
            </mn-card-body>
          </mn-card-item>
          <mn-card-item>
            <mn-card-body>
              <mn-input type="password" v-model="models.password" placeholder="请输入密码"></mn-input>
            </mn-card-body>
          </mn-card-item>
        </mn-card>

        <mn-section-note>
          <mn-helper :validate="$v.models.username">
            <mn-helper-item name="required">请输入用户名</mn-helper-item>
          </mn-helper>
          <mn-helper :validate="$v.models.password">
            <mn-helper-item name="required">请输入密码</mn-helper-item>
          </mn-helper>
           <mn-helper :validate="$v.models.city">
            <mn-helper-item name="required">请选择城市</mn-helper-item>
          </mn-helper>
        </mn-section-note>
      </mn-section>

      <mn-section>
        <div class="submit-btn">
          <mn-btn theme="primary" ref="submit" block>登录</mn-btn>
        </div>
        </mn-section-btn>
      </mn-section>
      <div class="register">
        <a href="https://wechat.34580.com/register/index">
          没有账号? 免费注册
        </a>
      </div>
    </mn-form>
  </mn-modal>
</template>

<script>
  import modal from 'vue-human/suites/modal'
  import {
    required,
    minLength,
    maxLength } from 'vuelidate/lib/validators'
  import input from 'vue-human/suites/input'
  import select from 'vue-human/suites/select'
  import Message from 'vue-human/utils/Message'
  import { cityList } from '../../axios/user'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      ...modal.map(),
      ...input.map(),
      ...select.map()
    },
    validations: {
      models: {
        username: {
          required,
          minLength: minLength(4),
          maxLength: maxLength(100)
        },
        password: {
          required,
          minLength: minLength(6),
          maxLength: maxLength(20)
        },
        city: {
          required
        }
      }
    },
    props: {
      openModal: Boolean
    },
    data () {
      return {
        showModal: false,
        models: {
          username: undefined,
          password: undefined,
          city: undefined
        },
        options: {
          cities: [{
            label: '选择提货城市',
            value: undefined
          }]
        }
      }
    },
    computed: {
      ...mapGetters({
        city: 'city'
      })
    },
    methods: {
      /**
       * 成功提交表单
       * @method success
       * @return {Promise}
       */
      async success () {
        this.setFormLoading(true)

        try {
          await this.$store.dispatch('user.signIn', this.models)
          this.messageLayer = Message.create({ type: 'success', message: '成功登录' }).show()
          this.$emit('successSign')
          this.showModal = false
        } catch (error) {
          this.showModal = false
          // this.messageLayer = Message.create({ type: 'error', message: error.message }).show()
        }

        this.setFormLoading(false)
      },
      /**
       * 控制
       * @method setFormLoading
       * @param  {boolean}       loading - 是否加载状态
       * @return {undefined}
       */
      setFormLoading (loading) {
        this.$refs.form.loading = loading
        this.$refs.submit.loading = loading
      },
      /**
       * 城市列表
       * @return {[type]} [description]
       */
      async cityList () {
        const response = await cityList()
        return response
      },
      onSelectCity (value) {
        const [city] = this.options.cities.filter(item => {
          return item.CityFlag === value
        })
        console.log(city)
        this.$store.commit('UPDATE_CITY', city)
      }
    },
    mounted () {
      this.models.city = this.city && this.city.value

      this.cityList()
      .then(response => {
        this.options.cities = [{
          label: '选择登录城市',
          value: undefined
        }]

        response.data.Data.forEach(item => {
          this.options.cities.push({
            ...item,
            label: item.CityName,
            value: item.CityFlag
          })
        })
      })
    },
    watch: {
      openModal (val) {
        this.showModal = true
      }
    }
  }
</script>

<style lang="scss" scoped>
.sign-modal {
  padding: 0 0 2rem;

  h1 {
    background: #49ab34;
    text-align: center;
    color: #fff;
    font-size: 1.3rem;
    padding: 0.5rem 0;
  }

  .mn-card {
    padding: 2rem 1rem 0;

    .mn-card-item {
      border: 1px solid #cdcdcd;
      margin-bottom: 1rem;
      border-radius: 2rem;
      padding: 0.5rem 1rem;
    }
  }

  .submit-btn {
    padding: 0 1rem;
  }

  .mn-btn.is-primary {
    border-radius: 2rem;
  }

  .register {
    text-align: center;

    a {
      color: #49ab34;
      font-size: 0.875rem;
    }
  }
}
</style>
