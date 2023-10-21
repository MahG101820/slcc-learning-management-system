<template>
  <button
    :type="props.type"
    :disabled="props.disabled"
    class="border-emerald-600 bg-emerald-600 text-gray-100 px-4 py-2 border rounded-lg flex items-center gap-4"
  >
    <template v-if="props.disabled">
      <svg
        class="animate-spin w-6 aspect-square"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </template>

    <template v-else>
      <slot />
    </template>
  </button>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: "button"
  },
  disabled: {
    type: Boolean,
    default: false
  }
});
</script>
