<template>
  <div>
    <el-upload
      action="#"
      class="styleUploadImg"
      list-type="picture-card"
      :on-preview="onPreview"
      :on-remove="onRemove"
      :file-list="fileList"
      :on-change="onChange"
      :http-request="httpRequest"
      :limit="1"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog
      title="图片预览"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <img style="width:100%" :src="UploadImgurl" alt="">
    </el-dialog>
  </div>
</template>
<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDbCnJj064vlXCpFTbcbOgNAwyaAe3MpBY',
  SecretKey: 'TtfKrDQURCmDWiXCmBOXbq1lLjttmZFk'
})
export default {
  name: 'UploadImg',
  props: {
    defaultUrl: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      // 上传的文件列表,
      fileList: [
        // { name: 'default', url: 'http://destiny001.gitee.io/image/cxk.gif' }
      ],
      dialogVisible: false,
      UploadImgurl: ''
    }
  },
  watch: {
    defaultUrl() {
      this.fileList.push({
        name: 'default', url: this.defaultUrl
      })
    }
  },
  methods: {
    onPreview(file) {
      this.UploadImgurl = file.url
      this.dialogVisible = true
      // console.log('点击预览')
    },
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    onChange(file, fileList) {
      console.log(file)
      this.fileList = fileList
    },
    // 覆盖默认的上传行为，可以自定义上传的实现
    httpRequest({ file }) {
      cos.putObject({
        Bucket: 'sb-txkwqhq-1314382598', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-shanghai', /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        Body: file, /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */
        onProgress: function(progressData) {
          console.log(JSON.stringify(progressData))
        }
      }, (err, data) => {
        if (err) return this.$message.error('图片上传失败')
        this.$emit('on-success', {
          imgUrl: 'http//' + data.Location
        })
      })
    },
    beforeUpload(file) {
      const types = ['image/jpeg', 'image/png']
      // console.log(file)
      const ishas = types.includes(file.type)
      if (!ishas) {
        this.$message.error('只能上传' + types.join(',') + '类型的图片')
        return false
      }
      //  if (!types.includes(item => item === file.type)) {
      //   this.$message.error('只能上传' + types.join(',') + '类型的图片')
      //   return false
      //  }
      const MaxSize = 5 * 1024 * 1024
      if (file.size > MaxSize) {
        this.$message.error('图片大小不能超过1M')
        return false
      }
    }
  }
}
</script>

<style scoped lang="scss">
.styleUploadImg{
 width: 148px;
 height: 148px;
 overflow: hidden;
}
</style>
