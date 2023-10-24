<template>
  <Transition
    enter-from-class="scale-0 opacity-0"
    enter-active-class="transition-all duration-700"
    leave-to-class="scale-0 opacity-0"
    leave-active-class="transition-all duration-700"
  >
    <slot />
  </Transition>
</template>
