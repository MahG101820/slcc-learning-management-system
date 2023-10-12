<template>
  <h1 class="text-3xl font-bold capitalize underline">{{ page }}!</h1>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const page = route.name;
</script>
