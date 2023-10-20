<template>
  <div class="border-gray-300 bg-gray-100 text-gray-700 flex-1 border rounded-lg overflow-hidden">
    <table class="h-full grid">
      <thead>
        <tr class="bg-purple-600 text-gray-100 p-2 rounded-t-lg uppercase grid grid-cols-12">
          <th class="col-span-10 p-2">{{ props.type }} Names</th>
          <th class="col-span-2 p-2">Action</th>
        </tr>
      </thead>

      <tbody class="overflow-y-auto">
        <tr
          v-for="(item, index) in 10"
          :key="index"
          :class="`${
            index % 2 === 0 ? 'bg-gray-300/50 text-gray-900' : 'bg-gray-200/50 text-gray-800'
          } grid grid-cols-12 transition-colors hover:bg-gray-400/50 hover:text-gray-950`"
        >
          <td class="col-span-10 px-4 py-2 flex items-center gap-2">
            <p class="font-medium mr-4">{{ `${index + 1}.` }}</p>

            <img
              src=""
              alt=""
              class="border-emerald-600 bg-emerald-600 w-6 aspect-square border rounded-full"
            />
            <p class="truncate">Mon Albert Gamil</p>
          </td>

          <td class="col-span-2 p-2">
            <PrimaryButton class="mx-auto">
              <p>Archive account</p>
            </PrimaryButton>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import PrimaryButton from "@/components/PrimaryButton.vue";

const props = defineProps(["type", "show"]);
</script>
