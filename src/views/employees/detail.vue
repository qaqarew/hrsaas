<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <el-tabs v-model="activeName">
          <el-tab-pane label="登录账户设置" name="first">
            <el-form ref="form" label-width="100px" class="demo-ruleForm" :model="accountInfo" :rules="accountInfoRules">
              <el-form-item label="姓名" prop="username">
                <el-input v-model="accountInfo.username" />
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="accountInfo.password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="updateEmployees">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情" name="second">
            <user-info />
          </el-tab-pane>
          <el-tab-pane label="岗位信息" name="third">

            <job-info />
          </el-tab-pane>

        </el-tabs>

      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDeatilById, saveUserDeatilById } from '@/api/user'
import jobInfo from './component/job-info.vue'
import UserInfo from './component/user-info.vue'
export default {
  components: { jobInfo, UserInfo },
  data() {
    return {
      activeName: 'first',
      accountInfo: {},
      accountInfoRules: {
        username: [
          { required: true, message: '请输入员工名称', trigger: 'blur' },
          { min: 2, max: 10, message: '输入正确的格式', trigger: 'blur' }

        ],
        password: [
          { required: true, message: 'Please enter a password', trigger: 'blur' },
          { min: 6, message: 'Please enter a password', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.loadEmployeesInfo()
  },
  methods: {
    async loadEmployeesInfo() {
      const res = await getUserDeatilById(this.$route.params.id)
      this.accountInfo = res
    },
    async updateEmployees() {
      try {
        this.$refs.form.validate()
        await saveUserDeatilById(this.accountInfo)
        this.$message.success('更新成功')
        this.$router.back()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>

</style>
