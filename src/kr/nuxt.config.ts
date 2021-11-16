import { defineNuxtConfig } from "nuxt3";
import rootConf from "../../nuxt.config";

console.log("kr config");

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
const krConf = defineNuxtConfig({
  ...rootConf
});

export default krConf;
