<template>
  <TheNavbar v-if="navbarVisibility" />

  <main :class="route.name === `login` ? `` : `p-3 flex-1 overflow-hidden`">
    <div
      :class="
        route.name === `login`
          ? ``
          : `max-w-screen-xl h-full max-h-[40rem] mx-auto p-1 overflow-x-auto`
      "
    >
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
