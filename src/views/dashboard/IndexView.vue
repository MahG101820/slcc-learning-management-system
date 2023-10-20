<template>
  <Suspense>
    <template #default>
      <section class="h-full grid grid-cols-12 grid-rows-5 gap-2">
        <div class="col-span-4 row-span-full p-4 rounded-lg grid grid-rows-6 gap-4">
          <StatisticsView />
        </div>

        <div class="col-span-8 row-span-3 p-4 rounded-lg flex flex-col gap-4">
          <p class="text-xl font-bold uppercase">Recently added materials</p>

          <div class="flex-1 grid grid-flow-col grid-cols-2 gap-2">
            <RecentlyAddedView />
          </div>
        </div>

        <div class="col-span-8 row-span-2 p-4 rounded-lg flex flex-col gap-4">
          <p class="text-xl font-bold uppercase">Top students on leaderboards</p>

          <div class="flex-1 grid grid-flow-col grid-cols-3 gap-2">
            <TopStudentsView />
          </div>
        </div>
      </section>
    </template>

    <template #fallback>
      <LoaderView />
    </template>
  </Suspense>
</template>

<script setup>
import StatisticsView from "@/views/dashboard/partials/StatisticsView.vue";
import RecentlyAddedView from "@/views/dashboard/partials/RecentlyAddedView.vue";
import TopStudentsView from "@/views/dashboard/partials/TopStudentsView.vue";

import LoaderView from "@/views/dashboard/partials/LoaderView.vue";
</script>
