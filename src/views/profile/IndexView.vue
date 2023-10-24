<template>
  <Suspense>
    <template #default>
      <section class="h-full grid place-items-center">
        <ProfileView />
      </section>
    </template>

    <template #fallback>
      <section class="h-full grid place-items-center">
        <div class="border-gray-300 bg-gray-300 w-6/12 h-5/6 border rounded-lg animate-pulse" />
      </section>
    </template>
  </Suspense>
</template>

<script setup>
import ProfileView from "@/views/profile/partials/ProfileView.vue";
</script>
