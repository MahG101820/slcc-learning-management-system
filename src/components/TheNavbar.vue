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

        <PrimaryButton @click="logoutAccount"> Logout </PrimaryButton>
      </div>
    </nav>
  </header>

  <aside
    :class="sidebarVisibility ? `translate-x-0` : `-translate-x-full`"
    class="bg-gray-900/50 fixed inset-0 z-50 transition-transform lg:hidden"
  >
    <nav class="bg-gray-100 text-gray-700 w-2/3 max-w-sm h-full p-4 flex flex-col">
      <IconedButton @click="setSidebarVisibility()" class="self-end">
        <CloseIcon />
      </IconedButton>

      <div class="grid place-items-center gap-4">
        <div class="relative">
          <img
            src=""
            alt=""
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

      <ul class="my-8 grid">
        <li v-for="(link, index) in links" :key="index">
          <RouterLink
            @click="setSidebarVisibility()"
            :to="{ name: link.name.toLowerCase() }"
            class="border-transparent px-4 py-2 border rounded-lg flex items-center gap-2 relative"
          >
            <component :is="link.icon" />

            <p>{{ link.name }}</p>
          </RouterLink>
        </li>
      </ul>

      <PrimaryButton @click="logoutAccount"> Logout </PrimaryButton>
    </nav>
  </aside>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { RouterLink } from "vue-router";
import { useProfileStore } from "@/stores/profile";

import IconedButton from "@/components/IconedButton.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";

import MenuIcon from "@/assets/icons/MenuIcon.vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";
import DashboardIcon from "@/assets/icons/DashboardIcon.vue";
import MaterialsIcon from "@/assets/icons/MaterialsIcon.vue";
import QuizzesIcon from "@/assets/icons/QuizzesIcon.vue";
import LeaderboardIcon from "@/assets/icons/LeaderboardIcon.vue";
import ProfileIcon from "@/assets/icons/ProfileIcon.vue";

const links = [
  {
    name: "Dashboard",
    icon: DashboardIcon
  },
  {
    name: "Materials",
    icon: MaterialsIcon
  },
  {
    name: "Quizzes",
    icon: QuizzesIcon
  },
  {
    name: "Leaderboard",
    icon: LeaderboardIcon
  },
  {
    name: "Profile",
    icon: ProfileIcon
  }
];

const router = useRouter();
const store = useProfileStore();
const sidebarVisibility = ref(false);

const setSidebarVisibility = () => (sidebarVisibility.value = !sidebarVisibility.value);

const logoutAccount = () => {
  store.reset();
  localStorage.clear();
  router.push({ name: "login" }).then(() => router.go(0));
};
</script>

<style lang="postcss" scoped>
aside ul a.router-link-active.router-link-exact-active,
header ul a.router-link-active.router-link-exact-active {
  @apply text-emerald-600;
}

aside ul a.router-link-active.router-link-exact-active {
  @apply border-gray-300;
}

aside ul a.router-link-active.router-link-exact-active::after {
  @apply bg-emerald-600 w-1 h-4 rounded-lg absolute left-0 content-[''];
}

header ul::after {
  @apply bg-emerald-600 w-activeLinkWidth h-1 rounded-lg absolute -bottom-2.5 translate-x-activeLinkLocation transition-all content-[''];
}
</style>
