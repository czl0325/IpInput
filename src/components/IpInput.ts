import IpInput from "./IpInput.vue"
import { App, Component } from "vue"

IpInput.install = (app: App) => {
  app.component("IpInput", IpInput)
};
const IpInputVue: Component = IpInput
export default IpInputVue
