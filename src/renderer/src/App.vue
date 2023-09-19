<script setup lang="ts">
import Versions from './components/Versions.vue'
import {run} from "../../worker/worker";
const click = async () => {
  await run()
}
</script>

<template>
  <div>
    <a @click="click">启动</a>
  </div>
</template>


<style lang="less">
@import './assets/css/styles.less';
</style>
