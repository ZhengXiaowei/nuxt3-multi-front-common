<template>
  <div lang="en" class="f-m">home page kr1</div>
  <div lang="kr" class="f-m">home page kr2</div>
  <div lang="in" class="f-m">home page kr3</div>
  <div lang="vn" class="f-m">home page kr4</div>
  <div lang="en">
    <p lang="kr" class="f-m">home page</p>
    <p class="f-b">home page</p>
    <p class="f-n">home page</p>
  </div>
</template>

<script setup>
useMeta({
  htmlAttrs: {
    lang: "zh"
  },
  bodyAttrs: {
    class: "home test"
  }
});
</script>
