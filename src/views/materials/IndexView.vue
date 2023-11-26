<template>
  <Suspense>
    <template #default>
      <div class="grid gap-4">
        <!-- <div class="hidden flex justify-end">
          <PrimaryButton> View all archived materials </PrimaryButton>
        </div> -->

        <MaterialsForChaptersView />
      </div>
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
// import PrimaryButton from "@/components/PrimaryButton.vue";
import ServerErrorIcon from "@/assets/img/ServerErrorIcon.png";

const hasError = ref(false);

const handleError = () => {
  hasError.value = true;
};

onErrorCaptured(handleError);
</script>
