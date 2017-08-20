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
              <input type="file" accept="image/*" name="files">
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
        <div class="download-btn" @click="downLoad">下载模板</div>
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
      <div>
        <vue-core-image-upload
          :class="['btn', 'btn-primary']"
          :crop="false"
          @imageuploaded="imageuploaded"
          :max-file-size="5242880"
          compress="50"
          :headers="headers"
          url="/pickupcard/dashboard/providermanage/upload" >
        </vue-core-image-upload>
      </div>
      <div class="submit-btn">
        <mn-btn theme="primary" block :disabled="!PowerOfAttorneyImage || !BusinessLicenseImage" @click="submit">提交申请</mn-btn>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { uploadImage, applyQualification } from '../../axios/user'
  import LoadingMask from 'vue-human/utils/LoadingMask'
  import Alert from 'vue-human/utils/Alert'
  import VueCoreImageUpload from 'vue-core-image-upload'

  export default {
    components: {
      VueCoreImageUpload
    },
    computed: {
      ...mapGetters({
        qualification: 'qualification'
      })
    },
    data () {
      return {
        icons: {
          plus: require('vue-human-icons/js/ios/plus-empty')
        },
        BusinessLicenseImage: undefined,
        PowerOfAttorneyImage: undefined,
        headers: {
          Accept: 'application/json'
        }
      }
    },
    methods: {
      imageuploaded (e) {
        console.log(e)
      },
      uploadImages (event, type) {
        let target = event.target || event.srcElement
        let file = target.files[0]
        let reader = new FileReader()
        let _self = this

        reader.readAsDataURL(file)
        reader.onload = function (e) {
          console.log(this.result)
          var result = this.result
          var img = new Image()

          img.src = result

          if (result.length > 960 * 960) {
            console.log(_self.compress(img))
          }
          const ByteBinary = e.target.result.slice(e.target.result.indexOf(',') + 1, e.target.result.length)
          const data = {
            ByteBinary: ByteBinary,
            TypeName: file.name
          }
          _self.loadingmask = LoadingMask.create({
          }).show()

          uploadImage(data).then(response => {
            if (_self.loadingmask) _self.loadingmask.destroy()
            _self[type] = response.data.Data
          })
        }
      },
      compress (img) {
        var canvas = document.createElement('canvas')
        // var ctx = canvas.getContext('2d')

        canvas.width = img.width
        canvas.height = img.height

        // 利用canvas进行绘图
        // 将原来图片的质量压缩到原先的0.2倍。
        var data = canvas.toDataURL('image/jpeg', 0.2)
        debugger
        return data
      },
      submit () {
        this.applyQualification()
        .then(response => {
          if (this.loadingmask) this.loadingmask.destroy()
          if (response.data.Error === 0) {
            this.$store.commit('UPDATE_QUALIFICATION', [])
            this.$router.go(-2)
          } else {
            this.alertLayer = Alert.create({
              title: response.data.Message,
              cancelText: '知道了'
            }).show().on()
          }
        })
      },
      downLoad () {
        this.$store.commit('UPDATE_QUALIFICATION', {
          ...this.qualification,
          BusinessLicenseImage: this.BusinessLicenseImage,
          PowerOfAttorneyImage: this.PowerOfAttorneyImage
        })
        this.$router.push({name: 'sendCommission'})
      },
      /**
       * 申请资质
       * @return {[type]} [description]
       */
      async applyQualification () {
        this.loadingmask = LoadingMask.create({
        }).show()
        const response = await applyQualification({
          ...this.qualification,
          BusinessLicenseImage: this.BusinessLicenseImage,
          PowerOfAttorneyImage: this.PowerOfAttorneyImage
        })
        return response
      }
    },
    mounted () {
      this.BusinessLicenseImage = this.qualification.BusinessLicenseImage
      this.PowerOfAttorneyImage = this.qualification.PowerOfAttorneyImage
    },
    beforeDestroy () {
      if (this.loadingmask) this.loadingmask.destroy()
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
