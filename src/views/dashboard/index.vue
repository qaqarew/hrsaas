<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <upload-excel :before-upload="beforeUpload" :on-success="handleSuccess" />
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    handleSuccess(data) {
      console.log(data)
    },
    beforeUpload(file) {
      if (file.size > 1024) {
        this.$message.error('to Big')
        return false
      }
      return true
    }
  }
  // created() {
  //   this.$store.dispatch('user/getUserInfo')
  // }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
