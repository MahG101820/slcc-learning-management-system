<template>
  <div
    v-for="(item, index) in 3"
    :key="index"
    class="border-gray-300 bg-gray-100 text-gray-700 p-2 border rounded-lg flex flex-col gap-2"
  >
    <div
      style="
        background-image: url(https://img.freepik.com/free-vector/scientist-working_23-2148492751.jpg?w=740&t=st=1697798214~exp=1697798814~hmac=a7ff5f883620bcbe8d35a4a54ee253a5d34856dc5a80c56268f99661b93730f0);
      "
      class="bg-gray-300 flex-1 rounded bg-cover bg-center bg-no-repeat"
    />

    <div class="grid">
      <div class="flex items-center justify-between">
        <p class="text-xl font-semibold uppercase">
          {{ `${index === 0 ? "First" : index === 1 ? "Second" : "Third"} Place` }}
        </p>

        <p
          class="border-gray-300/50 bg-gray-200/50 text-gray-700/50 px-2 py-1 text-xs font-medium border rounded-lg"
        >
          {{ `0 pts` }}
        </p>
      </div>

      <p class="truncate">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum, non.</p>
    </div>
  </div>
</template>
