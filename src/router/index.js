import { createRouter, createWebHistory } from "vue-router";
import { useProfileStore } from "@/stores/profile";

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
      path: "/quizzes/answer/:id/:number",
      name: "quizzes-answer",
      component: () => import("@/views/quizzes/partials/AnswerQuizzesView.vue"),
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
  const profileStore = useProfileStore();
  const profile = profileStore.profile;
  const requiresAuthentication = to.meta.requiresAuthentication;

  if (profile.token && profile.type === "administrator") {
    if (requiresAuthentication || to.name === "login") {
      profileStore.reset();
    }
    next();
  } else if (profile.token && profile.type !== "administrator") {
    if (to.name === "login") {
      next({ name: "dashboard" });
    } else if (to.name === "administrator") {
      profileStore.reset();
      next();
    } else {
      next();
    }
  } else {
    if (requiresAuthentication) {
      next({ name: "login" });
    } else {
      next();
    }
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
 