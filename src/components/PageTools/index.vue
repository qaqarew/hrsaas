<template>
  <el-card class="page-tools">
    <el-row type="flex" justify="space-between" align="middle">
      <el-col v-if="Showbefore">
        <div :class="`before${type}`">
          <i :class="`el-icon-${type}`" />
          <slot name="before" />
        </div>
      </el-col>
      <el-col>
        <el-row type="flex" justify="end">
          <!-- <el-button size="small" type="warning">导入</el-button>
          <el-button size="small" type="danger">导出</el-button> -->
          <slot name="after" />

        </el-row>
      </el-col>
    </el-row>
  </el-card>
  <!-- 组件封装只可以支持四种类型：info success warning error
 4种类型样式结构
 type
 validar
 前半部分（before）可以通过变量来控制显示隐藏
 -->
</template>
<script>
export default {
  name: 'PageTools',
  props: {
    type: {
      type: String,
      default: 'info',
      validator(value) {
        if (['info', 'success', 'warning', 'error'].includes(value)) {
          return true
        }
        return false
      }
    },
    // eslint-disable-next-line vue/prop-name-casing
    Showbefore: {
      type: Boolean,
      default: true
    }
  }
}
</script>
<style lang='scss'>
 .page-tools {
    margin: 10px 0;
    .before {
      line-height: 34px;
      display: inline-block;
      border-radius: 3px;
      i {
        margin-right: 5px;
      }
      &.info {
        padding: 0px 10px;
        border: 1px solid rgba(145, 213, 255, 1);
        background: rgba(230, 247, 255, 1);
        i {
          color: #409eff;
        }
      }
    }
 }
</style>
