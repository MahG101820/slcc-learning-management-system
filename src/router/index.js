import { createRouter, createWebHistory } from "vue-router";
import { ref } from "vue";

import LoginView from "@/views/login/IndexView.vue";
import ErrorView from "@/views/error/IndexView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: () => import("@/views/dashboard/IndexView.vue"),
      meta: { requiresAuthentication: true }
    },
    {
      path: "/materials",
      name: "materials",
      component: () => import("@/views/materials/IndexView.vue"),
      meta: { requiresAuthentication: true }
    },
    {
      path: "/quizzes",
      name: "quizzes",
      component: () => import("@/views/quizzes/IndexView.vue"),
      meta: { requiresAuthentication: true }
    },
    {
      path: "/leaderboard",
      name: "leaderboard",
      component: () => import("@/views/leaderboard/IndexView.vue"),
      meta: { requiresAuthentication: true }
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("@/views/profile/IndexView.vue"),
      meta: { requiresAuthentication: true }
    },
    {
      path: "/administrator",
      name: "administrator",
      component: () => import("@/views/administrator/IndexView.vue"),
      meta: { requiresAuthentication: true }
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: { requiresAuthentication: false }
    },
    {
      path: "/:pathMatch(.*)*",
      name: "error",
      component: ErrorView,
      meta: { requiresAuthentication: false }
    }
  ]
});

router.afterEach((to, from) => {
  const activeLink = ref(0);

  const links = document.querySelectorAll("header ul a");
  const linksList = [];
  const additionalWidth = 5.1875;

  Object.keys(links).forEach((link) => {
    const details = {
      name: links[link].innerText.toLowerCase(),
      width: from.name
        ? links[link].getBoundingClientRect().width
        : links[link].getBoundingClientRect().width + additionalWidth
    };

    linksList.push(details);
  });

  linksList.forEach((link, index) => {
    if (link.name === to.name) {
      document.querySelector(":root").style.setProperty("--activeLinkWidth", link.width + "px");
      activeLink.value = index;
    }
  });

  const linksListSum = linksList
    .slice(0, activeLink.value)
    .map((link) => link.width)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  document
    .querySelector(":root")
    .style.setProperty("--activeLinkLocation", linksListSum + activeLink.value * 2 + "px");
});

export default router;
