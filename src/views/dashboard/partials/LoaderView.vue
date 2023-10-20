<template>
  <section class="h-full grid grid-cols-12 grid-rows-5 gap-2 animate-pulse">
    <div class="col-span-4 row-span-full p-4 rounded-lg grid grid-rows-6 gap-4">
      <div class="bg-gray-300 rounded-lg row-span-3" />
      <div v-for="(item, index) in 3" :key="index" class="bg-gray-300 rounded-lg" />
    </div>

    <div class="col-span-8 row-span-3 p-4 rounded-lg flex flex-col gap-4">
      <div class="bg-gray-300 w-3/5 h-7 rounded-lg" />

      <div class="flex-1 grid grid-flow-col grid-cols-2 gap-2">
        <div v-for="(item, index) in 2" :key="index" class="bg-gray-300 rounded-lg" />
      </div>
    </div>

    <div class="col-span-8 row-span-2 p-4 rounded-lg flex flex-col gap-4">
      <div class="bg-gray-300 w-3/5 h-7 rounded-lg" />

      <div class="flex-1 grid grid-flow-col grid-cols-3 gap-2">
        <div v-for="(item, index) in 3" :key="index" class="bg-gray-300 rounded-lg" />
      </div>
    </div>
  </section>
</template>
