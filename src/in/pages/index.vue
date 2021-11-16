<template>
  <div>
    <div lang="en" class="f-m">home page in1</div>
    <div lang="kr" class="f-m">home page in2</div>
    <div lang="in" class="f-m">home page in3</div>
    <div lang="vn" class="f-m">home page in4</div>
    <div lang="en">
      <p lang="kr" class="f-m">home page</p>
      <p class="f-b">home page</p>
      <p class="f-n">home page</p>
    </div>
    <test-common />
  </div>
</template>

<script setup>
import TestCommon from "@common/test-common";

useMeta({
  htmlAttrs: {
    lang: "zh"
  },
  bodyAttrs: {
    class: "home test"
  }
});
</script>
