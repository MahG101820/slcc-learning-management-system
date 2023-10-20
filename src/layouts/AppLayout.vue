<template>
  <TheNavbar />

  <main class="bg-gray-300 h-screen grid place-items-center">
    <slot />
  </main>
</template>

<script setup>
import TheNavbar from "@/components/TheNavbar.vue";
</script>
