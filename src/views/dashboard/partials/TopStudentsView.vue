<template>
  <div
    v-for="(item, index) in leaderboard"
    :key="index"
    class="border-gray-300 bg-gray-100 text-gray-700 p-2 border rounded-lg flex flex-col gap-2"
  >
    <div
      :style="`background-image: url(${item.image});`"
      class="bg-gray-300 flex-1 rounded bg-cover bg-center bg-no-repeat"
    />

    <div class="grid">
      <div class="flex items-center justify-between">
        <p class="text-xl font-semibold uppercase">
          {{ `${index === 0 ? "First" : index === 1 ? "Second" : "Third"} Place` }}
        </p>

        <p
          class="border-gray-300/50 bg-gray-200/50 text-gray-700/50 px-2 py-1 text-xs font-medium border rounded-lg"
        >
          {{ `${item.total_score} pts` }}
        </p>
      </div>

      <p class="truncate">{{ item.name }}</p>
    </div>
  </div>
</template>

<script setup>
import { readLeaderboard } from "@/api/leaderboard";

const leaderboardList = await readLeaderboard();
const leaderboard = leaderboardList.filter((_, index) => index <= 2);
</script>
