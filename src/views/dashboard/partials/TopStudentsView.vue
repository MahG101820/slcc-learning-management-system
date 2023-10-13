<template>
  <div
    v-for="(item, index) in 3"
    :key="index"
    style="
      background-image: url(&quot;https://img.freepik.com/free-vector/cute-young-boy-cartoon-character-holding-books_1308-46940.jpg?w=360&t=st=1697224532~exp=1697225132~hmac=fadc3d00644a07075c904f5bc85c3e7cbd5fe6654a06641342d5549d458e9542&quot;);
    "
    class="border-gray-300 bg-gray-100 h-36 bg-[length:90%] bg-left bg-no-repeat border rounded-lg"
  >
    <div
      class="bg-gradient-to-l from-gray-900 to-gray-600/50 from-10% text-gray-100 h-full p-4 rounded-lg flex items-center justify-between"
    >
      <div class="w-16">
        <p class="text-6xl">{{ index + 1 }}</p>
      </div>

      <div class="flex-1 font-bold grid">
        <p class="text-lg truncate uppercase tracking-wider">No top {{ index + 1 }}</p>

        <p class="text-lg">No points</p>
      </div>
    </div>
  </div>
</template>
