<template>
  <div class="main">
    <div>
      <el-menu
          mode="horizontal"
          :ellipsis="false"
          @select="handleSelect">
        <el-sub-menu v-for="[key,value] in Object.entries(menu)"
                      :key="key"
                      :index="key">
          <template #title>{{key}}</template>
          <el-menu-item v-for="item in menu[key]"
                        :key="1"
                        :index="item"
          >{{item}}</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import table from "../data/table.json";
import { ElMessage } from 'element-plus'

export default {
  name: "Main",
  props: {
    roleId:'',
  },
  watch: {
    roleId(newRoleId) {
      this.level1Menu='';
      this.level2Menu='';
      this.lv2MenuList = {};
      console.log("Role ID changed to",newRoleId);
      ElMessage({
        message: `Role ID is changed to ${newRoleId}.`,
        type: 'warning',
      })
      this.getPermissions(newRoleId);

    },
    level1Menu(newVal) {
      this.level2Menu='';
      this.lv2MenuList = this.menu[newVal];
      if (this.lv2MenuList === undefined) {
        this.lv2MenuList = {}
      }
      console.log(this.lv2MenuList)
    }
  },
  data() {
    return {
      menu: {},
      resMenu:{},
      url:'https://my-json-server.typicode.com/lapisit/code-test-data/menu-bar-parameters/',
      systemControl:'',
      permission:'',
      level1Menu:'',
      level2Menu:'',
      lv2MenuList:[],
    }
  },
  methods: {
    handleSelect(key, keyPath)  {
      console.log(key, keyPath);
      ElMessage({
        message: `${keyPath} is selected.`,
        type: 'warning',
      })
    },
    getPermissions(newRoleId) {
      axios.get(this.url+newRoleId)
          .then(response => {
            const data = response.data;
            this.permission = data.permissionList;
            this.systemControl = data.systemStatus;
            console.log(data,this.systemControl,this.permission);
            this.deriveMenu();
            this.menu = JSON.parse(JSON.stringify(this.resMenu));
            for (let m in this.menu) {
              if (this.menu[m].length === 0 ){
                delete this.menu[m];
              }
            }
          })
          .catch(error => {
            console.error('Error',error);
          });

    },
    /**
     * derive menu result
     */
    deriveMenu() {
      for (let menu in table){
        this.resMenu[menu]=[];
        this.checkLegalSub(menu);
      }
    },
    /**
     * check inner loop
     * @param menu
     */
    checkLegalSub(menu) {
      let inner = table[menu];
      for (let sub in inner){
        // if system control is false, check the next available submenu
        if ("system" in inner[sub] && this.systemControl[inner[sub].system] !== true){
          continue;
        }
        // check permission
        if (this.permission.includes(inner[sub].permission[0])){
          this.resMenu[menu].push(sub);
        }
      }
    }
  }
}
</script>

<style scoped>
.main {
  display: flex;
  margin: 20px;
}
.main div{
  margin-right:10px;
}
.custom-disabled-option {
  /*pointer-events: none;*/
  cursor: default;
}
</style>