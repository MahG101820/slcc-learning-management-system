<template>
  <section class="h-full space-y-4">
    <PrimaryButton @click="navigateToLessonsView()">
      <p>Back to lessons list</p>
    </PrimaryButton>
  </section>
</template>

<script setup>
import { useRouter } from "vue-router";

import PrimaryButton from "@/components/PrimaryButton.vue";

const router = useRouter();

const navigateToLessonsView = () => {
  router.go(-1);
};
</script>
