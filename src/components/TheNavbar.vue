<template>
  <header
    class="border-gray-100 border-b-gray-300 bg-gray-100 text-gray-700 p-1 border grid place-items-center"
  >
    <nav class="w-full max-w-screen-xl p-1 flex items-center justify-between">
      <div class="flex items-center">
        <IconedButton @click="setSidebarVisibility()" class="lg:hidden">
          <MenuIcon />
        </IconedButton>

        <RouterLink
          :to="{ name: `dashboard` }"
          class="border-transparent px-4 py-2 border rounded-lg flex items-center gap-2"
        >
          <img src="@/assets/img/SlccIcon.png" alt="SLCC Icon" class="w-5 aspect-square" />

          <p class="font-bold">
            <span class="sm:hidden">SLCC</span>
            <span class="hidden sm:block">Shining Light Christian College, Inc.</span>
          </p>
        </RouterLink>
      </div>

      <div class="flex items-center gap-4">
        <ul class="hidden items-center gap-0.5 relative lg:flex">
          <li v-for="(link, index) in links" :key="index">
            <RouterLink
              :to="{ name: link.name.toLowerCase() }"
              class="border-transparent px-4 py-2 border rounded-lg block transition-colors hover:bg-gray-200 hover:text-gray-800"
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

  <aside
    :class="sidebarVisibility ? `translate-x-0` : `-translate-x-full`"
    class="bg-gray-900/50 fixed inset-0 z-50 transition-transform"
  >
    <nav class="bg-gray-100 text-gray-700 w-2/3 max-w-sm h-full p-4 flex flex-col gap-8">
      <IconedButton @click="setSidebarVisibility()" class="self-end">
        <CloseIcon />
      </IconedButton>

      <ul class="grid">
        <li v-for="(link, index) in links" :key="index">
          <RouterLink
            @click="setSidebarVisibility()"
            :to="{ name: link.name.toLowerCase() }"
            class="border-transparent px-4 py-2 border rounded-lg block"
          >
            <p>{{ link.name }}</p>
          </RouterLink>
        </li>
      </ul>

      <PrimaryButton>
        <p class="mx-auto font-medium">Logout</p>
      </PrimaryButton>
    </nav>
  </aside>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";

import IconedButton from "@/components/IconedButton.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";

import MenuIcon from "@/assets/icons/MenuIcon.vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";

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

const sidebarVisibility = ref(false);

const setSidebarVisibility = () => (sidebarVisibility.value = !sidebarVisibility.value);
</script>

<style lang="postcss" scoped>
header ul a.router-link-active.router-link-exact-active,
aside ul a.router-link-active.router-link-exact-active {
  @apply text-emerald-600;
}
</style>
