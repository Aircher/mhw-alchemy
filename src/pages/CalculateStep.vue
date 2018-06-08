<template>
  <div class="content">
    <el-row>
      <el-table :data="tableData" stripe size="small" class="table-decoration" style="width: 100%">
        <el-table-column prop="decorations1" label="装饰品1"></el-table-column>
        <el-table-column prop="decorations2" label="装饰品2"></el-table-column>
        <el-table-column prop="decorations3" label="装饰品3"></el-table-column>
      </el-table>
    </el-row>
    <el-button class="btn-alchemy" type="danger" round @click="alchemy" size="small">Do This</el-button>
    <el-button class="btn-next" type="info" round @click="nextStep" size="small">Do Next</el-button>
    <el-button class="btn-add" icon="el-icon-plus" circle @click="addDecorations"></el-button>
    <el-button class="btn-delete" type="danger" icon="el-icon-delete" circle @click="deleteDecorations"></el-button>
  </div>
</template>

<script>
export default {
  name: 'calculateStep',
  data () {
    return {
      tableData: [],
      currentDecorations: [],
      stepMode: null
    }
  },
  methods: {
    alchemy () {
      const vm = this
      if (vm.tableData.length === 0) return
      vm.tableData.shift()
      window.localStorage.setItem('decorations', JSON.stringify(this.tableData))
    },
    nextStep () {
      const vm = this
      if (vm.tableData.length === 0) return
      if (vm.stepMode === '0') { // 112
        vm.tableData.shift()
        vm.stepMode = '1'
      } else if (vm.stepMode === '1') { // 121
        vm.tableData.shift()
        vm.stepMode = '2'
      } else if (vm.stepMode === '2') { // 211
        vm.tableData.splice(0, 2)
        vm.stepMode = '0'
      }
      window.localStorage.setItem('stepMode', this.stepMode)
      window.localStorage.setItem('decorations', JSON.stringify(this.tableData))
    },
    addDecorations () {
      this.$router.push({path: '/addItem'})
    },
    deleteDecorations () {
      this.tableData = []
      window.localStorage.removeItem('decorations')
    }
  },
  created () {
    this.tableData = JSON.parse(window.localStorage.getItem('decorations'))
    this.stepMode = window.localStorage.getItem('stepMode')
  }
}
</script>

<style lang="less" scoped>
  .btn-alchemy{
    position: fixed;
    bottom: 50px;
    right: 10px;
  }
  .btn-next{
    position: fixed;
    bottom: 10px;
    right: 10px;
  }
  .btn-add{
    position: fixed;
    bottom: 10px;
    left: 10px;
  }
  .btn-delete{
    position: fixed;
    bottom: 10px;
    left: 60px;
  }
</style>

<style lang="less">
  .table-decoration{
    tbody{
      tr:first-child{
        color: #f56c6c;
      }
    }
  }
</style>
