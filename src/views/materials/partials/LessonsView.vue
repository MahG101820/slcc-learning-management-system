<template>
  <section class="h-full space-y-4">
    <PrimaryButton @click="navigateToChaptersView()">
      <p>Back to chapters list</p>
    </PrimaryButton>

    <Suspense>
      <template #default>
        <MaterialsForLessonsView />
      </template>

      <template #fallback>
        <div class="grid grid-cols-12 gap-2">
          <div
            class="border-gray-300 bg-gray-300 col-span-3 h-64 border rounded-lg animate-pulse"
          />
        </div>
      </template>
    </Suspense>
  </section>
</template>

<script setup>
import { useRouter } from "vue-router";

import MaterialsForLessonsView from "@/views/materials/partials/MaterialsForLessonsView.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";

const router = useRouter();

const navigateToChaptersView = () => {
  router.push({ name: "materials" });
};
</script>
