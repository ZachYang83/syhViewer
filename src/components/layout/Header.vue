<template>
  <div class="header">
    <!-- <div class="title">
      <img src="@/assets/header.png" />
    </div> -->
    <div class="navbar"></div>
    <div class="user_box">
      <el-avatar
        :size="40"
        :src="src"
        style="margin: 0 5px; display: flex; alignitems: center"
      >
      </el-avatar>
      <!-- <p style="padding: 10px">{{ $store.state.user.username }}</p> -->
      <img slot="reference" src="@/assets/loadout.png" @click="loginOut" />
      <!-- <i class="icon icon-logo-out" @click="_loginOut"></i> -->
    </div>
  </div>
</template>

<script>
import src from "@/assets/admin.jpg";


export default {
  data() {
    return {
      src: src,
    };
  },
  methods: {
    loginOut() {
      this.$store.commit("REMOVE_INFO");
      localStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  width:100%;
  display: flex;
  justify-content: space-between;
  height: 80px;
  line-height: 80px;
  font-size: 20px;
  // background: rgba(0,18,37,0.85);
  background: url("~assets/header.png") no-repeat #001225;
  background-size: 100% 100%;
  padding: 0 20px;
  color: #fff;
}

.title {
  display: flex;
  align-items: center;
  width: 23%;
  // background: #4be17b;
}

.navbar {
  width: 65%;
  // background: #40ecb6;
}

.user_box {
  width: 12%;
  // background: #4bc8e1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 20px;
}
</style>