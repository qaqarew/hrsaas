<template>
  <upload-excel />
</template>

<script>
export default {
  methods: {
    handleSuccess({ header, results }) {
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      const arr = []
      results.forEach(item => {
        const userinfo = {}
        Object.keys(item).forEach(key => {
          userinfo[userRelations[key]] = item[key]
        })
        arr.push(userinfo)
      })
      console.log(arr)
    }
  }
}
</script>

<style>

</style>
