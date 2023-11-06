<template>
  <div
    class="border-gray-300 bg-gray-100 text-gray-700 col-span-8 border rounded-lg overflow-hidden"
  >
    <table class="h-full flex flex-col">
      <thead>
        <tr
          class="bg-emerald-600 text-gray-100 uppercase rounded-t-lg grid grid-flow-col grid-cols-12"
        >
          <th class="p-2 col-span-2">Ranking</th>
          <th class="p-2 col-span-8">Name</th>
          <th class="p-2 col-span-2">Score</th>
        </tr>
      </thead>

      <tbody class="flex-1 overflow-y-auto">
        <tr
          v-for="(item, index) in leaderboardTableList"
          :key="index"
          :class="`${
            index % 2 === 0 ? 'bg-gray-300/50 text-gray-900' : 'bg-gray-200/50 text-gray-800'
          } grid grid-cols-12 transition-colors hover:bg-gray-400/50 hover:text-gray-950`"
        >
          <td class="col-span-2 px-4 py-2 text-center">
            {{ index + 1 }}
          </td>

          <td class="col-span-8 px-4 py-2 flex items-center gap-2">
            <img
              :src="item.image"
              alt=""
              class="border-emerald-600 bg-emerald-600 w-6 aspect-square border rounded-full"
            />

            <p class="truncate">{{ item.name }}</p>
          </td>

          <td class="col-span-2 px-4 py-2 text-center">
            {{ item.total_score }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="col-span-4 flex flex-col gap-4">
    <div
      class="border-gray-300 bg-gray-100 text-amber-600 p-4 border rounded-lg flex items-center justify-between"
    >
      <div class="flex-1 flex items-center gap-2">
        <div
          class="`border-amber-300 bg-amber-100 w-10 aspect-square border rounded grid place-items-center`"
        >
          <LeaderboardIcon class="m-auto" />
        </div>

        <div>
          <p class="font-medium uppercase">Leaderboard</p>
          <p class="text-gray-600 text-xs">Students on leaderboard</p>
        </div>
      </div>

      <p class="mr-2 text-4xl font-bold">{{ leaderboardTableList.length }}</p>
    </div>

    <p class="text-xl font-bold uppercase">Top students on leaderboards</p>

    <div class="flex-1 grid gap-2">
      <div
        v-for="(item, index) in leaderboardTopList"
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

          <p class="truncate">
            {{ item.name }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { readLeaderboard } from "@/api/leaderboard";

import LeaderboardIcon from "@/assets/icons/LeaderboardIcon.vue";

const leaderboardList = await readLeaderboard();
const leaderboardTableList = leaderboardList.filter((item) => item.name !== null);
const leaderboardTopList = leaderboardTableList.filter((key) => key.ranking <= 3);
</script>
