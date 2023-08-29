<template>
  <div class="ip_input_container">
    <div v-for="(item, index) in state.ipControlArr" class="ip_input_box">
      <input
          :ref="setInputRef"
          :key="index"
          :name="index + ''"
          :value="item"
          type="text"
          @input="(el) => handleInput(index, el)"
          @keydown="(el) => handleKeyDown(index, el)"
          :disabled="disabled"
      />
      <i class="symbol_box" v-if="index < state.ipControlArr.length - 1">·</i>
    </div>
    <div class="ip_input_box" v-if="port !== undefined">
      <i>:</i>
      <input
          class="port_input"
          :value="portRef"
          @input="handleInputPort"
          type="number"
          :disabled="disabled"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRef, watch } from "vue"
defineOptions({
  name: "IpInput"
})
const props = defineProps({
  ip: {
    type: String
  },
  port: {
    type: Number
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits<{
  (event: "update:port", port: number): void;
  (event: "update:ip", ip: string): void;
  (event: "change", ip: string, port?: number): void;
}>()

const portRef = toRef(props, "port")
const inputRefs: HTMLInputElement[] = []
const state = reactive({
  ipControlArr: new Array(4),
  ipArrs: new Array(4) as (number | undefined)[]
})
const setInputRef = (el: any) => {
  if (!el || inputRefs.findIndex((inputRef) => inputRef.name === el.name) > -1)
    return
  inputRefs.push(el as HTMLInputElement)
}
const handleInput = (index: number, el: any) => {
  const targetValue = el.target.value
  // 将原始值设置到输入框中
  el.target.value = state.ipControlArr[index] ?? ""
  // 输入. 跳转下个
  if (el.data === "." && index < state.ipControlArr.length - 1) {
    inputRefs[index + 1].focus()
    if (state.ipControlArr[index + 1] !== "") {
      inputRefs[index + 1].select()
    }
    return
  }
  // 如果输入的不是一个数字
  if (isNaN(Number(el.data))) {
    return
  }
  if (Number(targetValue) < 0) {
    state.ipControlArr[index] = 0
  } else if (Number(targetValue) > 255) {
    state.ipControlArr[index] = 255
  } else {
    // 设置新的值
    state.ipControlArr[index] = targetValue
  }
  const ip = state.ipControlArr.join(".")
  // 返回新的值
  emit("update:ip", ip)
  // 调用返回值
  emit("change", ip, props.port)
  // 当前的值时三位数没到最后时，下一个自动获取焦点
  if (targetValue.length === 3 && index < state.ipControlArr.length - 1) {
    inputRefs[index + 1].focus()
    if (state.ipControlArr[index + 1] !== "") {
      inputRefs[index + 1].select()
    }
  }
}
const handleKeyDown = (index: number, el: any) => {
  if (el.keyCode === 8 && state.ipControlArr[index] === "" && index > 0) {
    const inputRef = inputRefs[index - 1]
    if (inputRef) {
      inputRef.focus()
    }
  }
}
const handleInputPort = (e: any) => {
  if (e.target.value) {
    // 触发了
    emit("update:port", Number(e.target.value))
    emit("change", state.ipControlArr.join("."), Number(e.target.value))
  }
}
watch(() => props.ip, (ip) => {
  ip?.split(".")?.forEach((el, index) => {
    state.ipControlArr[index] = el ? Number(el) : ""
  })}, { immediate: true }
)
</script>

<style lang="scss" scoped>
.ip_input_container {
  display: inline-flex;
  align-items: center;
  border: 1px solid #ccc;
  box-sizing: border-box;
  min-height: 32px;
}

.ip_input_container:hover {
  border-color: #40a9ff;
}

.ip_input_box {
  display: inline-flex;
  align-items: center;
}

input {
  outline: none;
  width: 40px;
  border: none;
  text-align: center;
  line-height: 1px;
  background-color: transparent;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.symbol_box {
  font-weight: 500;
}

.port_input {
  width: 60px;
  margin: 0 8px;
}
</style>
