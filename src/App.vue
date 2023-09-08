<script setup lang="ts">
import IpInput from "./components/IpInput.vue"
import { reactive } from "vue"
const ipAddr = reactive({
  ip: "127.0.0.1",
  port: 8080
})
</script>

<template>
  <div>
    <ip-input v-model:ip="ipAddr.ip" v-model:port="ipAddr.port"/>
  </div>
</template>

<style scoped>
</style>
