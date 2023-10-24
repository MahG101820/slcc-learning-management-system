<template>
  <button
    :type="props.submit ? `submit` : `button`"
    class="border-transparent bg-transparent text-slate-600 px-4 py-2 truncate border rounded-full inline-flex items-center gap-4 transition-colors hover:border-transparent hover:bg-transparent hover:text-slate-700 focus-visible:border-transparent focus-visible:bg-transparent focus-visible:text-slate-700"
  >
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({ submit: Boolean });
</script>
