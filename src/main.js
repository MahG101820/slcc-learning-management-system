import "./assets/css/main.css";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { QuillEditor } from "@vueup/vue-quill";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(router);
app.component("QuillEditor", QuillEditor);
app.mount("#app");
