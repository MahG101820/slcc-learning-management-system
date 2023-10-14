<template>
  <Suspense :key="componentKey">
    <template #default>
      <section class="h-full grid place-items-center">
        <div class="grid grid-cols-12 gap-8">
          <div class="col-span-4 flex flex-col gap-2">
            <StatisticsView />
          </div>

          <div class="col-span-8 flex flex-col justify-between">
            <PrimaryButton @click="rerenderIndexView()" class="self-end">
              <p>Refresh dashboard</p>
            </PrimaryButton>

            <div class="flex flex-col gap-8">
              <div class="space-y-2">
                <p class="text-xl font-bold uppercase">Recently added materials</p>

                <div class="grid grid-cols-2 gap-2">
                  <RecentlyAddedView />
                </div>
              </div>

              <div class="flex flex-col gap-2">
                <p class="text-xl font-bold uppercase">Top students on leaderboard</p>

                <div class="grid grid-cols-3 gap-2">
                  <TopStudentsView />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>

    <template #fallback>
      <section class="h-full grid grid-cols-12 gap-4">
        <div class="col-span-4 flex flex-col gap-4">
          <div class="border-gray-300 bg-gray-300 flex-1 border rounded-lg animate-pulse" />

          <div
            v-for="(item, index) in 3"
            :key="index"
            class="border-gray-300 bg-gray-300 h-20 border rounded-lg animate-pulse"
          />
        </div>

        <div class="col-span-8 grid grid-rows-2 gap-4">
          <div class="grid grid-cols-2 gap-4">
            <div
              v-for="(item, index) in 2"
              :key="index"
              class="border-gray-300 bg-gray-300 border rounded-lg animate-pulse"
            />
          </div>

          <div class="grid grid-cols-3 gap-4">
            <div
              v-for="(item, index) in 3"
              :key="index"
              class="border-gray-300 bg-gray-300 border rounded-lg animate-pulse"
            />
          </div>
        </div>
      </section>
    </template>
  </Suspense>
</template>

<script setup>
import { ref } from "vue";

import StatisticsView from "@/views/dashboard/partials/StatisticsView.vue";
import RecentlyAddedView from "@/views/dashboard/partials/RecentlyAddedView.vue";
import TopStudentsView from "@/views/dashboard/partials/TopStudentsView.vue";

import PrimaryButton from "@/components/PrimaryButton.vue";

const componentKey = ref(0);

const rerenderIndexView = () => {
  componentKey.value++;
};
</script>
