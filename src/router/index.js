import { createRouter, createWebHistory } from "vue-router";

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
      path: "/materials/chapter/id=:id&number=:number&description=:description",
      name: "materials-lessons",
      component: () => import("@/views/materials/partials/LessonsView.vue"),
      meta: { requiresAuthentication: true }
    },
    {
      path: "/materials/lesson/id=:id&number=:number&description=:description",
      name: "materials-lesson",
      component: () => import("@/views/materials/partials/ReadLessonView.vue"),
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
    },
    {
      path: "/dashboard",
      redirect: { name: "dashboard" }
    }
  ]
});

router.afterEach((to) => {
  const links = document.querySelectorAll("header ul a");
  const linksList = Array.from(links).map((link) => ({
    name: link.innerText.toLowerCase(),
    width: link.getBoundingClientRect().width
  }));

  const name = ["materials-lessons", "materials-lesson"].includes(to.name) ? "materials" : to.name;

  const activeLink = linksList.findIndex((link) => link.name === name);

  if (activeLink !== -1) {
    document
      .querySelector(":root")
      .style.setProperty("--activeLinkWidth", linksList[activeLink].width + "px");

    const linksListSum = linksList
      .slice(0, activeLink)
      .map((link) => link.width)
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0);

    document
      .querySelector(":root")
      .style.setProperty("--activeLinkLocation", linksListSum + activeLink * 2 + "px");
  }
});

export default router;
