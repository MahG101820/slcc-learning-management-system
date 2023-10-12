<template>
  <header
    class="border-gray-100 border-b-gray-300 bg-gray-100 text-gray-700 p-1 border grid place-items-center"
  >
    <nav class="w-full max-w-screen-xl p-1 flex items-center justify-between">
      <RouterLink :to="{ name: `dashboard` }">
        <p class="font-bold">Shining Light Christian College, Inc.</p>
      </RouterLink>

      <div class="flex items-center gap-4">
        <ul class="flex items-center gap-0.5 relative">
          <li v-for="(link, index) in links" :key="index">
            <RouterLink
              :to="{ name: link.name.toLowerCase() }"
              class="border-gray-100 px-4 py-2 border rounded-lg block transition-colors hover:bg-gray-200 hover:text-gray-800"
            >
              <p class="font-medium">{{ link.name }}</p>
            </RouterLink>
          </li>
        </ul>

        <PrimaryButton>
          <p>Logout</p>
        </PrimaryButton>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { onMounted } from "vue";
import { RouterLink } from "vue-router";

import PrimaryButton from "@/components/PrimaryButton.vue";

const links = [
  {
    name: "Dashboard",
    icon: "Icon"
  },
  {
    name: "Materials",
    icon: "Icon"
  },
  {
    name: "Quizzes",
    icon: "Icon"
  },
  {
    name: "Leaderboard",
    icon: "Icon"
  },
  {
    name: "Profile",
    icon: "Icon"
  }
];

onMounted(() => {
  // const linksWidth = [];

  // Object.keys(document.querySelectorAll("header ul a")).forEach((link) =>
  //   linksWidth.push(document.querySelectorAll("header ul a")[link].offsetWidth)
  // );

  // const activeLinkWidth = document.querySelector(
  //   "header ul a.router-link-active.router-link-exact-active"
  // ).offsetWidth;

  // console.log(activeLinkWidth);
});
</script>