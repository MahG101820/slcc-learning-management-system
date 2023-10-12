<template>
  <TheNavbar v-if="navbarVisibility" />

  <main class="p-4 grid place-items-center">
    <RouterView />
  </main>
</template>

<script setup>
import { ref, watch } from "vue";
import { RouterView, useRoute } from "vue-router";

import TheNavbar from "@/components/TheNavbar.vue";

const route = useRoute();
const navbarVisibility = ref();

watch(route, (route) => {
  navbarVisibility.value = route.meta.requiresAuthentication;
});
</script>
