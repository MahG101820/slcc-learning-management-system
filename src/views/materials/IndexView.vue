<template>
  <Suspense>
    <template #default>
      <MaterialsForChaptersView />
    </template>

    <template #fallback>
      <div class="grid grid-cols-12 gap-x-2 gap-y-8">
        <div class="border-gray-300 bg-gray-300 col-span-3 h-64 border rounded-lg animate-pulse" />
      </div>
    </template>
  </Suspense>
</template>

<script setup>
import MaterialsForChaptersView from "@/views/materials/partials/MaterialsForChaptersView.vue";
</script>
