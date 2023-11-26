<template>
  <ZoomIn>
    <Suspense>
      <QuizItemsView />
    </Suspense>
  </ZoomIn>
</template>

<script setup>
import QuizItemsView from "@/views/quizzes/partials/QuizItemsView.vue";
import ZoomIn from "@/transitions/ZoomIn.vue";
</script>
