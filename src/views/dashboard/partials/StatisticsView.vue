<template>
  <div
    class="border-gray-300 bg-gray-100 md:row-span-full md:col-span-2 p-4 border rounded-lg flex flex-col items-center justify-center gap-4"
  >
    <div class="relative">
      <img
        @error="handleErrorOnFetching"
        :src="store.profile.image"
        alt="Profile picture"
        class="border-emerald-600 bg-gray-300 w-32 aspect-square border-4 rounded-full object-cover object-center"
      />

      <p
        class="border-gray-100 bg-emerald-600 text-gray-100 w-8 aspect-square text-xs border-4 rounded-full grid place-items-center absolute left-2 bottom-0"
      >
        {{ store.profile.type.toUpperCase().charAt(0) }}
      </p>
    </div>

    <div class="text-center grid">
      <p class="font-medium uppercase truncate">
        {{
          `${store.profile.fname} ${store.profile.mname ? store.profile.mname : ``} ${
            store.profile.lname
          }`
        }}
      </p>

      <p
        class="border-gray-300/50 bg-gray-200/50 text-gray-800 w-max mx-auto px-2 py-1 text-xs truncate border rounded-full"
      >
        {{ store.profile.email }}
      </p>
    </div>
  </div>

  <div
    class="border-gray-300 bg-gray-100 text-purple-600 col-span-full p-4 border rounded-lg flex items-center justify-between"
  >
    <div class="flex-1 flex items-center gap-2">
      <div
        class="`border-purple-300 bg-purple-100 w-10 aspect-square border rounded grid place-items-center`"
      >
        <MaterialsIcon class="m-auto" />
      </div>

      <div class="flex-1">
        <p class="font-medium uppercase">Materials</p>
        <p class="text-gray-600 text-xs">Available materials</p>
      </div>
    </div>

    <p class="mr-2 text-4xl font-bold">{{ chapters }}</p>
  </div>

  <div
    class="border-gray-300 bg-gray-100 text-purple-600 col-span-full p-4 border rounded-lg flex items-center justify-between"
  >
    <div class="flex-1 flex items-center gap-2 col-span-full">
      <div
        class="`border-sky-300 bg-sky-100 w-10 aspect-square border rounded grid place-items-center`"
      >
        <QuizzesIcon class="m-auto" />
      </div>

      <div>
        <p class="font-medium uppercase">Quizzes</p>
        <p class="text-gray-600 text-xs">Available quizzes</p>
      </div>
    </div>

    <p class="mr-2 text-4xl font-bold">{{ quizzes }}</p>
  </div>

  <div
    class="border-gray-300 bg-gray-100 text-purple-600 col-span-full p-4 border rounded-lg flex items-center justify-between"
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

    <p class="mr-2 text-4xl font-bold">{{ leaderboard - 1 }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { readMaterials } from "@/api/materials";
import { readQuizzes } from "@/api/quizzes";
import { readLeaderboard } from "@/api/leaderboard";
import { useProfileStore } from "@/stores/profile";

import MaterialsIcon from "@/assets/icons/MaterialsIcon.vue";
import QuizzesIcon from "@/assets/icons/QuizzesIcon.vue";
import LeaderboardIcon from "@/assets/icons/LeaderboardIcon.vue";
import ImagePlaceholder from "@/assets/img/ImagePlaceholder.jpg";

const store = useProfileStore();

const imageSource = ref(
  "https://img.freepik.com/free-vector/nikola-tesla-cartoon-character-white-background_1308-81627.jpg?w=826&t=st=1697682902~exp=1697683502~hmac=2014106291a496e2aa4874f0449edd49f14d27764f4740273806aaf1665b1f76"
);

const handleErrorOnFetching = () => (imageSource.value = ImagePlaceholder);

const chaptersList = await readMaterials("chapter");
const chapters = chaptersList.length;

const quizzesList = await readQuizzes(store.profile.id);
const quizzes = quizzesList.length;

const leaderboardList = await readLeaderboard();
const leaderboard = leaderboardList.length;
</script>
