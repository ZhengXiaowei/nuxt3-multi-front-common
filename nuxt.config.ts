import { defineNuxtConfig } from "nuxt3";
import path from "path";

console.log("root config");

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
const rootConf = defineNuxtConfig({
  // srcDir: "src/",
  css: [path.resolve("@", "..", "src/assets/index.scss")],
  alias: {
    "@common": path.resolve("@", "..", "src/common")
  }
});

export default rootConf;
