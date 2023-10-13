<template>
  <div class="border-gray-300 bg-gray-100 mb-8 p-4 border rounded-lg grid">
    <p class="font-bold text-center uppercase grid">
      <span class="text-xl">Welcome back to</span>
      <span class="text-sm">SLCC E-Learning portal</span>
    </p>

    <div class="p-4 grid place-items-center gap-4">
      <div class="relative">
        <img
          src="https://scontent.fmnl9-4.fna.fbcdn.net/v/t39.30808-6/357203077_2509728879194098_204956894696360182_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=F8Gv3oYxZIMAX_HcFZ5&_nc_ht=scontent.fmnl9-4.fna&oh=00_AfBZOj6mHK3iyHo07xm033J7K83EjBXZlhVyfb8b-QMz3A&oe=652DDB09"
          alt="Profile picture"
          class="border-emerald-600 bg-gray-200 w-32 aspect-square border-4 rounded-full object-cover object-center"
        />

        <p
          class="border-gray-100 bg-emerald-600 text-gray-100 w-8 aspect-square text-xs border-4 rounded-full grid place-items-center absolute left-2 bottom-0"
        >
          S
        </p>
      </div>

      <div class="flex-1 text-center grid gap-1.5">
        <p class="font-medium uppercase truncate">Mon Albert L. Gamil</p>

        <p
          class="border-gray-300 bg-gray-200 text-gray-800 px-2 py-1 text-xs truncate border rounded-full"
        >
          mrgamilmonalbert@gmail.com
        </p>
      </div>
    </div>
  </div>

  <div
    class="border-purple-300 bg-purple-100 text-purple-600 p-4 border rounded-lg flex items-center justify-between"
  >
    <div class="flex items-center gap-2">
      <div>
        <MaterialsIcon />
      </div>

      <div>
        <p class="font-medium uppercase">Materials</p>
        <p class="text-gray-600 text-xs">Available materials</p>
      </div>
    </div>

    <p
      class="border-purple-300 bg-purple-200 w-8 aspect-square font-bold border rounded-lg grid place-items-center"
    >
      {{ chapters.length }}
    </p>
  </div>

  <div
    class="border-teal-300 bg-teal-100 text-teal-600 p-4 border rounded-lg flex items-center justify-between"
  >
    <div class="flex items-center gap-2">
      <QuizzesIcon />

      <div>
        <p class="font-medium uppercase">Quizzes</p>
        <p class="text-gray-600 text-xs">Available quizzes</p>
      </div>
    </div>

    <p
      class="border-teal-300 bg-teal-200 w-8 aspect-square font-bold border rounded-lg grid place-items-center"
    >
      0
    </p>
  </div>

  <div
    class="border-amber-300 bg-amber-100 text-amber-600 p-4 border rounded-lg flex items-center justify-between"
  >
    <div class="flex items-center gap-2">
      <div>
        <LeaderboardIcon />
      </div>

      <div>
        <p class="font-medium uppercase">Leaderboard</p>
        <p class="text-gray-600 text-xs">Current rank</p>
      </div>
    </div>

    <p
      class="border-amber-300 bg-amber-200 w-8 aspect-square font-bold border rounded-lg grid place-items-center"
    >
      0
    </p>
  </div>
</template>

<script setup>
import { readMaterials } from "@/api/materials";

import MaterialsIcon from "@/assets/icons/MaterialsIcon.vue";
import QuizzesIcon from "@/assets/icons/QuizzesIcon.vue";
import LeaderboardIcon from "@/assets/icons/LeaderboardIcon.vue";

const chapters = await readMaterials("chapter");
</script>
