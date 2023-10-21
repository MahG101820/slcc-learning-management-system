<template>
  <section class="h-full grid grid-cols-12 gap-4">
    <!-- <div class="border-gray-300 bg-gray-300 h-20 border rounded-lg animate-pulse" />
    <div class="border-gray-300 bg-gray-300 flex-1 border rounded-lg animate-pulse" /> -->

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
            v-for="(_, index) in 100"
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
                src=""
                alt=""
                class="border-emerald-600 bg-emerald-600 w-6 aspect-square border rounded-full"
              />

              <p class="truncate">Mon Albert Gamil</p>
            </td>

            <td class="col-span-2 px-4 py-2 text-center">
              {{ Math.floor(Math.random() * 100) }}
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
            <p class="text-gray-600 text-xs">Current rank</p>
          </div>
        </div>

        <p class="mr-2 text-4xl font-bold">0</p>
      </div>

      <p class="text-xl font-bold uppercase">Top students on leaderboards</p>

      <div class="flex-1 grid gap-2">
        <div
          v-for="(_, index) in 3"
          :key="index"
          class="border-gray-300 bg-gray-100 text-gray-700 p-2 border rounded-lg flex flex-col gap-2"
        >
          <div
            style="
              background-image: url(https://img.freepik.com/free-vector/scientist-working_23-2148492751.jpg?w=740&t=st=1697798214~exp=1697798814~hmac=a7ff5f883620bcbe8d35a4a54ee253a5d34856dc5a80c56268f99661b93730f0);
            "
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
                {{ `0 pts` }}
              </p>
            </div>

            <p class="truncate">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum, non.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import LeaderboardIcon from "@/assets/icons/LeaderboardIcon.vue";
</script>
