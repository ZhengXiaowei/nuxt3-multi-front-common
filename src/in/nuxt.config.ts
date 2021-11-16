import { defineNuxtConfig } from "nuxt3";
import rootConf from "../../nuxt.config";

console.log("in config");

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
const inConf = defineNuxtConfig({
  ...rootConf
});

export default inConf;
