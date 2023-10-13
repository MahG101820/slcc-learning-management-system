<template>
  <section class="h-[calc(100vh-2rem)] flex flex-col items-center justify-center gap-4">
    <img src="@/assets/img/ErrorIcon.svg" alt="Error 404: Page not found" class="w-full" />

    <p class="text-xl font-bold">Looks like you've found the doorway to the great nothing</p>

    <PrimaryButton @click="navigateToDashboard()"> <p>Take me to dashboard</p> </PrimaryButton>
  </section>
</template>

<script setup>
import { useRouter } from "vue-router";

import PrimaryButton from "@/components/PrimaryButton.vue";

const router = useRouter();

const navigateToDashboard = () => router.push({ name: "dashboard" });
</script>
