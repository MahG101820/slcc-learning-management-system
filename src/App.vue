<template>
  <TheNavbar v-if="navbarVisibility" />

  <main class="p-3 flex-1 overflow-hidden">
    <div class="max-w-screen-xl h-full mx-auto p-1 overflow-x-auto">
      <RouterView />
    </div>
  </main>
</template>

<script setup>
import { ref, watch } from "vue";
import { RouterView, useRouter, useRoute } from "vue-router";

import TheNavbar from "@/components/TheNavbar.vue";

const router = useRouter();
const route = useRoute();
const navbarVisibility = ref(route.meta.requiresAuthentication);

watch(
  () => route.name,
  (newRouteName, oldRouteName) => {
    navbarVisibility.value = route.meta.requiresAuthentication;

    if (!oldRouteName || (oldRouteName === "error" && newRouteName !== "error")) {
      router.push({ name: newRouteName });
    }
  }
);
</script>
