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
      path: "/materials/chapter/:id",
      name: "materials-chapter",
      component: () => import("@/views/materials/partials/LessonsView.vue"),
      meta: { requiresAuthentication: true }
    },
    {
      path: "/materials/lesson/:id",
      name: "materials-lesson",
      component: () => import("@/views/materials/partials/ReadLessonView.vue"),
      meta: { requiresAuthentication: true }
    },
    {
      path: "/materials/lesson/edit/:id/",
      name: "materials-lesson-edit",
      component: () => import("@/views/materials/partials/EditLessonView.vue"),
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
      meta: { requiresAuthentication: false }
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

router.beforeEach((to, _, next) => {
  const storedProfile = JSON.parse(localStorage.getItem("profile"));
  const requiresAuthentication = to.meta.requiresAuthentication;
  const isAdmin = storedProfile ? (storedProfile.type === "administrator" ? true : false) : false;

  if (isAdmin && to.name !== "administrator") {
    localStorage.clear();
    window.location.reload();
  }

  if (requiresAuthentication && !storedProfile) {
    next({ name: "login" });
  } else if (to.name === "login" && storedProfile) {
    next({ name: "dashboard" });
  } else {
    next();
  }
});

router.afterEach((to) => {
  const linksList = Array.from(document.querySelectorAll("header ul a"));

  const links = linksList.map((link) => ({
    name: link.innerText.toLowerCase(),
    width: link.getBoundingClientRect().width
  }));

  const activeRouteName = ["materials-chapter", "materials-lesson"].includes(to.name)
    ? "materials"
    : to.name;

  const activeLinkIndex = links.findIndex((link) => link.name === activeRouteName);

  if (activeLinkIndex !== -1) {
    const root = document.querySelector(":root");

    const linksListSum = links
      .slice(0, activeLinkIndex)
      .map((link) => link.width)
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0);

    root.style.setProperty("--activeLinkWidth", `${links[activeLinkIndex].width}px`);
    root.style.setProperty("--activeLinkLocation", `${linksListSum + activeLinkIndex * 2}px`);
  }
});

export default router;
