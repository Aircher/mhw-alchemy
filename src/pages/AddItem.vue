<template>
  <div>
    <p><router-link to="/"><el-button icon="el-icon-back" circle></el-button></router-link>&nbsp;&nbsp;Monster Hunter World Decorations</p>
    <el-row :gutter="10">
      <el-col :xs="24" :sm="8">
        <el-select v-model="decorations1" filterable placeholder="装饰品1" class="select-decoration">
          <el-option
            v-for="item in decorations"
            :key="item.value"
            :label="item.text"
            :value="item">
          </el-option>
        </el-select>
      </el-col>
      <el-col :xs="24" :sm="8">
        <el-select v-model="decorations2" filterable placeholder="装饰品2" class="select-decoration">
          <el-option
            v-for="item in decorations"
            :key="item.value"
            :label="item.text"
            :value="item">
          </el-option>
        </el-select>
      </el-col>
      <el-col :xs="24" :sm="8">
        <el-select v-model="decorations3" filterable placeholder="装饰品3" class="select-decoration">
          <el-option
            v-for="item in decorations"
            :key="item.value"
            :label="item.text"
            :value="item">
          </el-option>
        </el-select>
      </el-col>
      <el-col :xs="24">
        <el-select v-model="stepMode" filterable placeholder="当前步骤" class="select-decoration" @change="stepChange">
          <el-option label="1-1-2" value="0"></el-option>
          <el-option label="1-2-1" value="1"></el-option>
          <el-option label="2-1-1" value="2"></el-option>
        </el-select>
      </el-col>
      <el-col :xs="24">
        <el-button class="btn-save" type="primary" plain @click="submitDecorations">添加</el-button>
      </el-col>
    </el-row>
    <el-row>
        <el-table
          :data="tableData"
          stripe
          size="small"
          style="width: 100%">
          <el-table-column
            prop="decorations1.text"
            label="装饰品1">
          </el-table-column>
          <el-table-column
            prop="decorations2.text"
            label="装饰品2">
          </el-table-column>
          <el-table-column
            prop="decorations3.text"
            label="装饰品3">
          </el-table-column>
        </el-table>
    </el-row>
  </div>
</template>

<script>
import { get } from '@/scripts/restClient'

export default {
  name: 'addItem',
  data () {
    return {
      decorations: [],
      decorations1: null,
      decorations2: null,
      decorations3: null,
      tableData: [],
      stepMode: null
    }
  },
  methods: {
    createFilter (queryString) {
      return (decorations) => {
        return (decorations.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    loadAll () {
      get('/static/localData/decorations.json').then((res) => {
        if (res.data.decorations) {
          this.decorations = res.data.decorations
        }
      })
    },
    submitDecorations () {
      const newItem = {
        decorations1: this.decorations1,
        decorations2: this.decorations2,
        decorations3: this.decorations3
      }
      this.tableData.unshift(newItem)
      window.localStorage.setItem('decorations', JSON.stringify(this.tableData))
    },
    stepChange () {
      window.localStorage.setItem('stepMode', this.stepMode)
    }
  },
  created () {
    this.loadAll()
    this.tableData = JSON.parse(window.localStorage.getItem('decorations')) || []
    this.stepMode = window.localStorage.getItem('stepMode') || null
  }
}
</script>

<style lang="less" scoped>
  .select-decoration{
    display: block;
    width: 100%;
    margin-bottom: 10px;
  }
  .btn-save{
    margin-bottom: 10px;
    width: 100%;
  }
</style>
