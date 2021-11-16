# Nuxt 3 同类型多项目复用方案

比如各类型的官网

## 目录结构说明

```
- node_modules
- src # 项目目录
	- assets # 公共的样式和静态资源
	- common # 公共组件以及工具方法
	- in # in站结构目录
  	- pages # in站路由
    - app.vue # 页面根父组件 可有可无
    - nuxt.config.ts # in站的nuxt配置 从公共配置文件中进行拓展 底下vn同理
  - vn # vn站结构目录
  	- pages
    - nuxt.config.ts
- nuxt.config.ts # 公共nuxt配置文件
```

## 启动命令配置

在`package.json`中进行如下改造：

```json
"scripts": {
  "dev": "nuxi dev",
  "build": "nuxi build",
  "dev:in": "nuxi dev src/in/", // 开发环境下启动in站
  "dev:vn": "nuxi dev src/vn/", // 开发环境下启动vn站
  "build:in": "nuxi build src/in/", // 只打包in站资源
  "build:vn": "nuxi build src/vn/", // 只打包vn站资源
  "start": "node .output/server/index.mjs",
  "start:in": "node src/in/.output/server/index.mjs", // 直接运行编译后的in站 配合pm2进行常驻
  "start:vn": "node src/vn/.output/server/index.mjs", // 直接运行编译后的vn站 配合pm2进行常驻
}
```

## 公共配置

公共配置文件`nuxt.config.ts`存放在根目录下，各项目都可基于公共配置进行拓展。
比如在公共配置文件中公共样式和公共组件的`alias`：

```typescript
import { defineNuxtConfig } from "nuxt3";
import path from "path";

console.log("root config");

const rootConf = defineNuxtConfig({
  css: [path.resolve("@", "..", "src/assets/index.scss")],
  lias: {
    // 如果需要智能提示，tsconfig.json中也要配置对应的paths
    "@common": path.resolve("@", "..", "src/common")
  }
});

export default rootConf;
```

这里有一个点需要注意，正常来说，`@`指向的都是其根路由或者`src`文件夹，但是因为我们在启动时用的命令是`nuxi dev src/in/`，该命令会去寻找`src/in/`下的`nuxt.config.ts`配置文件，导致其根路由指向的就是我们的`src/in/`。所以我们在公共配置中如果想要访问其上的其他文件，则需要配合`path`进行处理。

然后我们在项目中的配置文件中对其进行拓展：

```typescript
import { defineNuxtConfig } from "nuxt3";
// 这里不可使用@符，因为这里的@指向的就是src/in文件夹
import rootConf from "../../nuxt.config";

console.log("in config");

const inConf = defineNuxtConfig({
  ...rootConf,
  // 做其他针对当前项目的配置
});

export default inConf;
```

## 使用公共组件

我们将公共组件到放在了`src/common`下，现在我们在该文件夹下新增公共组件`test-common.vue`：

```vue
<template>
  <div>公共组件</div>
</template>
```

然后我们在`src/in/pages/index.vue`中使用：

```vue
<template>
  <div>
    <div lang="en" class="f-m">home page in1</div>
    <div lang="kr" class="f-m">home page in2</div>
    <div lang="in" class="f-m">home page in3</div>
    <div lang="vn" class="f-m">home page in4</div>
    <test-common />
  </div>
</template>

<script setup>
import TestCommon from "@common/test-common";
</script>
```

# 多网站个性化字体方案

通常每个国家的网站都会使用各自不同的三方字体，**比如US使用字体A，IN使用字体B，而且可能存在一个公共组件被这些国家网站所使用**。

先定义各自语言字体样式：

```scss
[lang^="us"] body {
  font-family: "Noto Sans SC", sans-serif;
}

[lang^="in"].f-m {
  font-family: "Courier New", Courier, monospace;
}

[lang^="en"] {
  .f-m {
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
      "Lucida Sans", Arial, sans-serif;
  }

  .f-b {
    font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  }

  .f-n {
    font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  }
}
```

然后可以在html上进行使用：

```html
<div lang="us" class="f-m">home page</div>
<div lang="in" class="f-m">home page</div>

<!-- 或者 -->
<div lang="en">
  <p class="f-m">home page</p>
  <p class="f-b">home page</p>
  <p class="f-n">home page</p>
</div>
```

如果在公共组件的话，可以通过`props`动态修改：

```vue
<template>
  <div :lang="lang" class="f-m">content font</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const customComponent = defineComponent({
  name: "CustomComponent",
  props: {
    lang: {
      type: String,
      default: () => "us"
    }
  }
});

export default customComponent;
</script>
```

# 项目运行

## 开发

```bash
yarn dev:in # 启动in站点
yarn dev:vn # 启动vn站点
```

## 打包

```bash
yarn build:in # 打包in站点
yarn build:vn # 打包vn站点
```

## 启动

可配置`pm2`进行常驻

```bash
yarn start:in # 启动打包后的in站
yarn start:vn # 启动打包后的vn站
```