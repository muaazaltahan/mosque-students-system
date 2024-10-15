import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
// Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faBars,
  faBell,
  faHome,
  faQuestionCircle,
  faUsers,
  faUserSecret,
} from "@fortawesome/free-solid-svg-icons"; // library.add(faHatWizard, faUser, faHome);
library.add(faUserSecret, faHome, faBell, faUsers, faQuestionCircle, faBars);

const app = createApp(App);
const pinia = createPinia();

app
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(pinia)
  .mount("#app");
