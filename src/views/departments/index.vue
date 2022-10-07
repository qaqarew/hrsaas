<template>
  <div class="departments-container" style=" margin: 10px auto;">
    <el-card>
      <tree-tools :tree-node="company" :is-root="false" @addDept="addDept" />
    </el-card>
    <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
      <tree-tools slot-scope="{data}" :tree-node="data" @addDept="addDept" @editDept="editDept" @refreshList="getDepartments" />
    </el-tree>
    <add-dept ref="addDept" :dialogvisible.sync="dialogvisible" :tree-node="currentNode" />
  </div>
</template>

<script>
import { getDepartments } from '@/api/departments'
import treeTools from './components/treeTools.vue'
import { tranListToTreeData } from '@/utils'
import AddDept from './components/add-dept.vue'
export default {
  name: 'HrsaasIndex',
  components: { treeTools, AddDept },

  data() {
    return {
      dialogvisible: false,
      currentNode: {},
      defaultProps: {
        label: 'name'
      },
      departs: [{ name: '总裁办', manager: '曹操', children: [{ name: '董事会', manager: '曹丕' }] },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }],
      company: { name: '', manager: '' }

    }
  },

  mounted() {
    this.getDepartments()
  },

  methods: {
    async getDepartments() {
      const { depts, companyManage, companyName } = await getDepartments()
      this.departs = tranListToTreeData(depts, '')
      this.company = { name: companyName, manager: companyManage, id: '' }
    },
    addDept(node) {
      this.dialogvisible = true // 显示弹层
      this.currentNode = node
    },
    editDept(node) {
      this.dialogvisible = true //
      this.currentNode = { ...node }
      this.$refs.addDept.formData = { ...node }
    }
  }
}
</script>

<style lang="scss">
.departments-container {
  width: 80%;
  margin: 100px auto;
}
</style>
