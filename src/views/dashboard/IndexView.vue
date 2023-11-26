<template>
  <Suspense>
    <template #default>
      <section class="h-full grid lg:grid-cols-12 lg:grid-rows-5 gap-2">
        <div
          class="col-span-4 grid grid-flow-row row-span-full p-4 md:grid-cols-2 md:grid-rows-6 lg:grid-rows-1 gap-4"
        >
          <StatisticsView />
        </div>

        <div class="col-span-8 row-span-3 p-4 flex flex-col gap-4">
          <p class="text-xl font-bold uppercase">Recently added materials</p>

          <div class="flex-1 grid md:grid-flow-col md:grid-cols-2 gap-2">
            <RecentlyAddedView />
          </div>
        </div>

        <div class="col-span-8 row-span-2 p-4 flex flex-col gap-4">
          <p class="text-xl font-bold uppercase">Top students on leaderboard</p>

          <div class="flex-1 grid md:grid-cols-2 lg:grid-flow-col lg:grid-cols-3 gap-2">
            <TopStudentsView />
          </div>
        </div>
      </section>
    </template>

    <template #fallback>
      <template v-if="hasError">
        <div class="h-full grid place-items-center">
          <img :src="ServerErrorIcon" alt="Server Error Icon" class="w-[35rem]" />
        </div>
      </template>

      <template v-else>
        <LoaderView />
      </template>
    </template>
  </Suspense>
</template>

<script setup>
import { ref, onErrorCaptured } from "vue";

import StatisticsView from "@/views/dashboard/partials/StatisticsView.vue";
import RecentlyAddedView from "@/views/dashboard/partials/RecentlyAddedView.vue";
import TopStudentsView from "@/views/dashboard/partials/TopStudentsView.vue";
import LoaderView from "@/views/dashboard/partials/LoaderView.vue";
import ServerErrorIcon from "@/assets/img/ServerErrorIcon.png";

const hasError = ref(false);

const handleError = () => {
  hasError.value = true;
};

onErrorCaptured(handleError);
</script>
