import { defineNuxtConfig } from "nuxt3";
import rootConf from "../../nuxt.config";

console.log("vn config");

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
const vnConf = defineNuxtConfig({
  ...rootConf
});

export default vnConf;
