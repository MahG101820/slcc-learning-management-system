<template>
  <section class="h-full grid grid-cols-12 gap-4">
    <div class="col-span-4 flex flex-col gap-4">
      <div class="border-gray-300 bg-gray-300 flex-1 border rounded-lg animate-pulse" />

      <div
        v-for="(item, index) in 3"
        :key="index"
        class="border-gray-300 bg-gray-300 h-20 border rounded-lg animate-pulse"
      />
    </div>

    <div class="col-span-8 grid gap-4">
      <div class="grid grid-cols-2 gap-4">
        <div
          v-for="(item, index) in 2"
          :key="index"
          class="border-gray-300 bg-gray-300 border rounded-lg animate-pulse"
        />
      </div>

      <div class="grid grid-cols-3 gap-4">
        <div
          v-for="(item, index) in 3"
          :key="index"
          class="border-gray-300 bg-gray-300 border rounded-lg animate-pulse"
        />
      </div>
    </div>
  </section>
</template>
