<template>
  <!-- 新增部门的弹层 -->
  <el-dialog :title="title" :visible="dialogvisible" @close="handleClose">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form ref="addDeptFrom" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择" @focus="getEmployeesSimple">
          <el-option v-for="item in peoples" :key="item.id" :label="item.username" :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button v-loading="loading" type="primary" size="small" @click="subimt">确定</el-button>
        <el-button size="small" @click="handleClose">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getEmployeesSimple } from '@/api/employees'
import { getDepartments, addDepartments, updateDepartments } from '@/api/departments'
export default {
  name: 'HrsaasAddDept',
  props: {
    dialogvisible: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    const codeCheck = async(rule, value, callback) => {
      const { depts } = await getDepartments()
      let isRepeat = true
      // 编辑模式下让自己和自己校验？：解决方案：对比过程中把自己排除掉然后再去对比
      if (this.formData.id) {
        // isRepeat= depts.some(ele => 排除自己 && ele.code === value)
        isRepeat = depts.some(ele => ele.id !== this.formData.id && ele.code === value)
      } else {
        isRepeat = depts.some(ele => ele.code === value)
      }
      isRepeat ? callback(new Error(`模块下已存在${value}啊`)) : callback()
    }
    const nameCheck = async(rule, value, callback) => {
      const { depts } = await getDepartments()
      let isRepeat = true
      // 编辑模式下让自己和自己校验？：解决方案：对比过程中把自己排除掉然后再去对比
      if (this.formData.id) {
        // isRepeat= depts.some(ele => 排除自己 && ele.code === value)
        const deptstj1 = depts.filter(item => item.pid === this.treeNode.pid && item.id !== this.treeNode.id)

        isRepeat = deptstj1.some(ele => ele.name === value)
      } else {
        const deptstj = depts.filter(item => item.pid === this.treeNode.id)
        isRepeat = deptstj.some(ele => ele.code === value)
      }
      isRepeat ? callback(new Error(`该部门下已经存在${value}部门名称`)) : callback()
    }
    return {
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      rules: {

        name: [
          { required: true, message: '部门名称必填', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称1-50个字符', trigger: 'blur' },
          { validator: nameCheck, trigger: 'blur' }

        ],
        code: [
          { required: true, message: '部门编码必填', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码1-50个字符', trigger: 'blur' },
          { validator: codeCheck, trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '部门负责人必填' }
        ],
        introduce: [
          { required: true, message: '部门介绍必填', trigger: 'blur' },
          { min: 5, max: 300, message: '部门介绍1-300个字符', trigger: 'blur' }
        ]
      },
      peoples: [],
      loading: false

    }
  },
  computed: {
    title() {
      return this.formData.id ? '编辑模式' : '新增模式'
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:dialogvisible', false)
      this.$refs.addDeptFrom.resetFields()
      this.formData = {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      }
    },
    async  getEmployeesSimple() {
      this.peoples = await getEmployeesSimple()
    },
    async subimt() {
      try {
        await this.$refs.addDeptFrom.validate()
        this.loading = true
        if (this.formData.id) {
          await updateDepartments(this.formData)
        } else {
          await addDepartments({ ...this.formData, pid: this.treeNode.id })
        }

        // 因为是添加子部门，所以我们需要将新增的部门pid设置成当前部门的id，新增部门就成了自己的子部门

        this.$message.success(`${this.formData.id ? '编辑' : '新增成功'}`)

        this.$parent.getDepartments()
        // $parent直接调用父级方法

        this.handleClose()
        // 关闭弹窗
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>

</style>
