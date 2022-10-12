<template>
  <div class="app-container">
    <page-tools :showbefore="true">
      <template #before>
        <span>共166条记录</span>
      </template>
      <template #after>
        <el-button size="small" type="warning" @click="$router.push('./import')">导入</el-button>
        <el-button size="small" type="danger" @click="exportExce">导出</el-button>
        <el-button size="small" type="primary" @click="handleEmploy">新增员工</el-button>
      </template>
    </page-tools>
    <!-- 放置表格和分页 -->
    <el-card>
      <el-table v-loading="loading" border :data="List">
        <el-table-column label="序号" sortable="" width="80" type="index" />
        <el-table-column label="姓名" prop="username" />
        <el-table-column label="工号" prop="workNumber" />
        <el-table-column label="聘用形式" prop="formOfEmployment" :formatter="formatEmployment" />
        <el-table-column label="部门" prop="departmentName" />
        <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
          <template slot-scope="{row}">{{ row.timeOfEntry | formatDate }}</template>
        </el-table-column>
        <el-table-column label="账户状态" prop="enableState" />
        <el-table-column label="操作" fixed="right" width="280">
          <template slot-scope="{row}">
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small">角色</el-button>
            <el-button type="text" size="small" @click="del(row.id)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
      <!-- 分页组件 -->
      <el-row type="flex" justify="end" align="middle" style="height: 60px">
        <el-pagination
          :total="total"
          layout="prev, pager, next,sizes,total"
          :current-page.sync="page.page"
          :page-size.sync="page.size"
          :page-sizes="[2,5,10]"
          @current-change="getEmployeeList"
          @size-change="getEmployeeList"
        />
      </el-row>
    </el-card>
    <add-employee :dialog-visible.sync="dialogVisible" />

  </div>
</template>

<script>

import EmployeesList from '@/api/constant/employees'
import PageTools from '@/components/PageTools/index.vue'
import { getEmployeeListAPI, delEmployee } from '@/api/employees'
import AddEmployee from './component/add-employee.vue'
export default {
  name: 'Dashboard',

  components: { PageTools, AddEmployee },

  data() {
    return {
      page: {
        page: 1,
        size: 10
      },
      List: [],
      total: 0,
      loading: false,
      hireType: EmployeesList.hireType,
      dialogVisible: false
    }
  },
  mounted() {
    this.getEmployeeList()
  },

  methods: {
    async getEmployeeList() {
      try {
        const { rows, total } = await getEmployeeListAPI(this.page)
        this.loading = true
        this.List = rows
        this.total = total
      } finally {
        this.loading = false
      }
    },
    formatEmployment(row, column, cellValue) {
      const res = this.hireType.find(ele => ele.id === cellValue)
      return res && res.value || '非正式'
    },
    handleEmploy() {
      this.dialogVisible = true
    },
    async del(id) {
      try {
        await this.$confirm('确认删除该员工吗', '提示', ({
          type: 'warning'
        }))
        await delEmployee(id)
        this.getEmployeeList()
      } catch (error) {
        console.log(error)
      }
    },
    async exportExce() {
      const { export_json_to_excel } = await import('@/vendor/Export2Excel.js')
      const { rows } = await getEmployeeListAPI({
        page: 1,
        size: this.total
      })
      console.log(rows)
      const exportExcelMapPath = {
        '手机号': 'mobile',
        '姓名': 'username',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      const header = Object.keys(exportExcelMapPath)

      const data = rows.map(item => {
        return header.map(res => {
          if (res === '聘用形式') {
            const find = this.hireType.find(hire => {
              return hire.id === item[exportExcelMapPath[res]]
            })
            return find ? find.value : '未知'
          }
          return item[exportExcelMapPath[res]]
        })
      })
      export_json_to_excel({
        header, // 表头 必填
        data, // 具体数据 必填
        filename: '员工列表', // 非必填
        autoWidth: true, // 非必填
        bookType: 'xlsx' // 非必填
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
