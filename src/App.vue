<template>
  <TheNavbar v-if="navbarVisibility" />

  <main class="p-3 lg:h-[calc(100vh-59.2px)] lg:max-h-[800px]">
    <div class="max-w-screen-xl h-full mx-auto p-1 overflow-x-auto">
      <RouterView />
    </div>
  </main>
</template>

<script setup>
import { ref, watch } from "vue";
import { RouterView, useRoute, useRouter } from "vue-router";

import TheNavbar from "@/components/TheNavbar.vue";

const route = useRoute();
const router = useRouter();
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
