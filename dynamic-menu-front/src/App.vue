<script>
import { RouterLink, RouterView } from 'vue-router'
import Role from "./components/Role.vue";
import Main from "./components/Main.vue";
export default {
  components: {
    Role,
    Main
  },
  data() {
    return {
      currentRoleId:''
    };
  },
  methods: {
    updateRoleId(newRoleId) {
      this.currentRoleId = newRoleId;
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="header">
      <div>
        <img alt="Vue logo" class="logo" src="@/assets/hammer-and-pick.svg" width="40" height="40" />
        <h1>
          &nbsp;Dynamic Menu Builder &nbsp;&nbsp;
        </h1>
        <Main :role-id="currentRoleId"/>
      </div>

      <div>
        <Role @roleChanged="updateRoleId"/>
      </div>
    </div>
    <div>

    </div>
  </div>
</template>

<style scoped>
.container {
  margin: 0;
  padding: 0;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}
.header div {
  display: flex;
  align-items: center;
}

.header h1 {
  font-weight: bold;
  font-family: "Comic Sans MS";
  font-size: 30px;
}
</style>
