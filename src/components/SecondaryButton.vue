<template>
  <button
    :type="props.submit ? `submit` : `button`"
    class="border-amber-600 bg-amber-600 text-slate-100 px-4 py-2 truncate border rounded-full transition-colors overflow-hidden hover:border-amber-700 hover:bg-amber-700 hover:text-slate-200 focus-visible:border-amber-700 focus-visible:bg-amber-700 focus-visible:text-slate-200"
  >
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({ submit: Boolean });
</script>
