<template>
  <div>
    <affix-component position="top" :offset="20">
      <el-button >测试按钮</el-button>
    </affix-component>
  </div>
</template>

<script setup lang="ts">
import AffixComponent from "./affix-component.vue";</script>
<script lang="ts">
export default {
  name: "affix"
};
</script>

<style scoped>

</style>
