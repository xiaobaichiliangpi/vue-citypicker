<template>
  <div class="upload-card">
    <h2>
      <div>
        营业执照<span style="color: red;">*</span>
      </div>
    </h2>
    <mn-card >
      <mn-card-item>
        <mn-card-body>
          <div class="images" v-if="BusinessLicenseImage">
            <img :src="BusinessLicenseImage">
          </div>
          <div class="upload-icon" v-else>
            <mn-icon :name="icons.plus" :scale="2"></mn-icon>
          </div>
          <div class="upload-box">
            <form role="form"
              method="post"
              enctype='multipart/form-data'
              @change="uploadImages($event, 'BusinessLicenseImage')">
              <input type="file" accept="image/*">
            </form>
          </div>
        </mn-card-body>
      </mn-card-item>
    </mn-card>
    <div class="upload-card">
      <h2>
        <div>
          委托书<span style="color: red;">*</span><span style="color: #989898; font-size: 0.875rem;">请下载模板填写并加盖公章</span>
        </div>
        <div class="download-btn" @click="$router.push({name: 'sendCommission'})">下载模板</div>
      </h2>
      <mn-card class="upload-card">
        <mn-card-item>
          <mn-card-body>
            <div class="images" v-if="PowerOfAttorneyImage">
              <img :src="PowerOfAttorneyImage">
            </div>
            <div class="upload-icon" v-else>
              <mn-icon :name="icons.plus" :scale="2"></mn-icon>
            </div>
            <div class="upload-box">
              <form role="form"
                method="post"
                enctype='multipart/form-data'
                @change="uploadImages($event, 'PowerOfAttorneyImage')">
                <input type="file" accept="image/*">
              </form>
            </div>
          </mn-card-body>
        </mn-card-item>
      </mn-card>

      <div class="submit-btn">
        <mn-btn theme="primary" block :disabled="!PowerOfAttorneyImage || !BusinessLicenseImage" @click="submit">下一步</mn-btn>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { uploadImage } from '../../axios/user'

  export default {
    computed: {
      ...mapGetters({
        token: 'token'
      })
    },
    data () {
      return {
        icons: {
          plus: require('vue-human-icons/js/ios/plus-empty')
        },
        BusinessLicenseImage: undefined,
        PowerOfAttorneyImage: undefined
      }
    },
    methods: {
      uploadImages (event, type) {
        let file = event.target.files[0]
        let reader = new FileReader()
        let _self = this
        this.uploadLoading = true
        reader.readAsDataURL(file)
        reader.onload = function (e) {
          const ByteBinary = e.target.result.slice(e.target.result.indexOf(',') + 1, e.target.result.length)
          const data = {
            ByteBinary: ByteBinary,
            TypeName: file.name
          }
          uploadImage(data).then(response => {
            _self[type] = response.data.Data
          })
        }
      },
      submit () {
        console.log(11)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .upload-card {

    h2 {
      color: #323232;
      font-size: 1rem;
      font-weight: 200;
      padding: 0.5rem 0.75rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .mn-card-body {
      position: relative;
      height: 5rem;
    }
  }

  .upload-box input {
    width: 5rem;
    height: 5rem;
    outline: none;
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 99;
  }

  .upload-icon {
    position: absolute;
    left: 0;
    top: 0;
    width: 5rem;
    height: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px dashed #d1d1d1;
    color: #d1d1d1;
  }

  .images {
    img {
      display: block;
      width: 5rem;
      height: 5rem;
    }
  }

  .download-btn {
    color: #666;
    font-size: 0.875rem;
    border: 1px solid #999;
    border-radius: 3px;
    padding: 0.2rem 0.6rem;
  }
</style>
