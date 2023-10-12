<template>
  <TheNavbar />

  <main class="p-4 grid place-items-center">
    <RouterView />
  </main>
</template>

<script setup>
import { RouterView } from "vue-router";

import TheNavbar from "@/components/TheNavbar.vue";
</script>
