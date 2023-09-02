<template>
  <div class="main">
    <div>Current Role ID: {{currentRoleId}}</div>
    <div>
      <el-select placeholder="Select Role ID"
                 v-model="currentRoleId"
                 @change="notifyMain">
        <el-option disabled value="0" class="custom-disabled-option">Select Role ID</el-option>
        <el-option v-for="item in roleList" :key="item.id" :value="item.id">{{item.id}}</el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ElMessage } from 'element-plus';

export default {
  name: "Role",
  data() {
    return {
      currentRoleId:1,
      url:'https://my-json-server.typicode.com/lapisit/code-test-data/menu-bar-parameters',
      roleList:[],
    }
  },
  mounted() {
    // request available id from API
    axios.get(this.url)
    .then(response =>{
      this.roleList = response.data;
      console.log(this.roleList)
    })
    .catch(error => {
      console.error('Error', error);
    });
    // init notification
    this.notifyMain();
  },
  methods:{
    /**
     * notify main.vue when role id changes
     */
    notifyMain() {

      this.$emit('roleChanged',this.currentRoleId);
    }
  },

}
</script>

<style scoped>
.main {
  display: flex;
  font-family: Helvetica;
  font-size: 20px;
}

.main div {
  margin: 10px;
}

.custom-disabled-option {
  /*pointer-events: none;*/
  cursor: default;
}

</style>