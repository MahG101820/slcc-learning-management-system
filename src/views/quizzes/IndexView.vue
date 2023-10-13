<template>
  <section class="h-full grid grid-cols-12 grid-rows-2 gap-4">
    <div
      v-for="(item, index) in 8"
      :key="index"
      class="border-gray-300 bg-gray-300 col-span-3 border rounded-lg animate-pulse"
    />
  </section>
</template>
