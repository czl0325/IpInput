# IpInput 一个IP地址输入框


### 预览效果

![预览效果](./截图.png)

### 安装

```sh
npm install ip-input-vue3 --save
```

### 使用

```js
import IpInput from 'ip-input-vue3'
import "ip-input-vue3/dist/IpInput.css"

const ipAddr = reactive({
  ip: "127.0.0.1",
  port: 8080
})
```

```html
<ip-input v-model:ip="ipAddr.ip" v-model:port="ipAddr.port"/>
```

### 参数

| 参数 | 名称 | 是否必填 | 默认值 |
| :--: | :--: | :--: | :--: |
| v-model:ip | ip地址 | 是 |  |
| v-model:port | 端口号 | 否 |  |
| disabled | 是否禁用 | 否 | false |

