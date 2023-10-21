<template>
  <Suspense>
    <template #default>
      <MaterialsForChaptersView />
    </template>

    <template #fallback>
      <template v-if="hasError">
        <div class="h-full grid place-items-center">
          <img :src="ServerErrorIcon" alt="Server Error Icon" class="w-[35rem]" />
        </div>
      </template>

      <template v-else>
        <div class="grid grid-cols-12 gap-x-2 gap-y-8">
          <div
            class="border-gray-300 bg-gray-300 col-span-3 h-64 border rounded-lg animate-pulse"
          />
        </div>
      </template>
    </template>
  </Suspense>
</template>

<script setup>
import { ref, onErrorCaptured } from "vue";

import MaterialsForChaptersView from "@/views/materials/partials/MaterialsForChaptersView.vue";
import ServerErrorIcon from "@/assets/img/ServerErrorIcon.png";

const hasError = ref(false);

const handleError = () => {
  hasError.value = true;
};

onErrorCaptured(handleError);
</script>
