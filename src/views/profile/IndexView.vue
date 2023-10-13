<template>
  <section class="h-full grid grid-cols-12 gap-4">
    <div class="border-gray-300 bg-gray-300 col-span-4 border rounded-lg animate-pulse" />

    <div class="col-span-8 grid gap-4">
      <div
        v-for="(item, index) in 2"
        :key="index"
        class="border-gray-300 bg-gray-300 border rounded-lg animate-pulse"
      />
    </div>
  </section>
</template>
