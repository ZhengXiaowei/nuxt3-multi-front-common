import { defineNuxtConfig } from "nuxt3";
import rootConf from "../../nuxt.config";

console.log("eu config");

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
const euConf = defineNuxtConfig({
  ...rootConf
});

export default euConf;
