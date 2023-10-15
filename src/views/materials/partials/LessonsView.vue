<template>
  <section class="h-full space-y-4">
    <div class="flex items-center justify-between gap-2">
      <PrimaryButton @click="navigateToChaptersView()">
        <ChevronLeftIcon />

        <p>{{ route.params.description }}</p>
      </PrimaryButton>

      <div v-if="materialsForLessonsView" class="flex items-center gap-2">
        <IconedButton class="bg-sky-600 text-gray-100">
          <EditIcon />
        </IconedButton>

        <IconedButton class="bg-rose-600 text-gray-100">
          <DeleteIcon />
        </IconedButton>
      </div>
    </div>

    <Suspense>
      <template #default>
        <MaterialsForLessonsView ref="materialsForLessonsView" />
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
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";

import MaterialsForLessonsView from "@/views/materials/partials/MaterialsForLessonsView.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import IconedButton from "@/components/IconedButton.vue";
import ChevronLeftIcon from "@/assets/icons/ChevronLeftIcon.vue";
import EditIcon from "@/assets/icons/EditIcon.vue";
import DeleteIcon from "@/assets/icons/DeleteIcon.vue";

const router = useRouter();
const route = useRoute();

const materialsForLessonsView = ref(null);

const navigateToChaptersView = () => {
  router.push({ name: "materials" });
};
</script>
