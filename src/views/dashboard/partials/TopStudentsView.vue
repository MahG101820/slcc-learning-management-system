<template>
  <div
    v-for="(item, index) in 3"
    :key="index"
    class="border-gray-300 bg-gray-100 text-gray-700 p-2 border rounded-lg grid grid-cols-12"
  >
    <img
      src="https://scontent.fmnl9-4.fna.fbcdn.net/v/t39.30808-6/357203077_2509728879194098_204956894696360182_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=F8Gv3oYxZIMAX_HcFZ5&_nc_ht=scontent.fmnl9-4.fna&oh=00_AfBZOj6mHK3iyHo07xm033J7K83EjBXZlhVyfb8b-QMz3A&oe=652DDB09"
      alt="Top student image"
      class="col-span-4 aspect-square object-cover object-center rounded-lg"
    />

    <div class="col-span-8 p-2 grid">
      <p class="font-bold truncate">
        {{ `${index === 0 ? "First" : index === 1 ? "Second" : "Third"} place` }}
      </p>
      <p class="text-xs truncate">100 points</p>
      <p class="mt-2 truncate">Mon Albert Gamil</p>
    </div>
  </div>
</template>
