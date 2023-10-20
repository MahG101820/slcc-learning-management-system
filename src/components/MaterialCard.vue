<template>
  <button
    type="button"
    class="border-gray-300 bg-gray-100 text-gray-700 col-span-3 h-64 border rounded-lg flex flex-col"
  >
    <img
      :src="props.image"
      @error="handleErrorOnLoading()"
      alt="Material image"
      class="bg-gray-300 w-full aspect-video object-cover rounded-t-lg"
    />

    <div class="flex-1 p-4 text-left flex items-center gap-4">
      <div class="flex-1 grid">
        <p class="font-semibold truncate">{{ props.title }}</p>
        <p class="text-sm truncate">
          {{ props.description }}
        </p>
      </div>
    </div>
  </button>
</template>

<script setup>
import { ref } from "vue";
import ImagePlaceholder from "@/assets/img/ImagePlaceholder.jpg";

const props = defineProps(["image", "title", "description"]);

const imageSource = ref(props.image);

const handleErrorOnLoading = () => {
  imageSource.value = ImagePlaceholder;
};
</script>
