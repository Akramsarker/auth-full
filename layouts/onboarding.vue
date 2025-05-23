<template>
  <div v-if="store.userLoading">
    <div class="h-screen">
      <app-navbar />
      <div
        class="font-mono min-h-[calc(100vh-70px)] items-center justify-center flex flex-row mt-[68px] bg-[linear-gradient(#f2f2f2_1px,transparent_1px),linear-gradient(90deg,#f2f2f2_1px,transparent_1px)] bg-[size:30px_30px] py-[60px]"
      >
        <loading-icon></loading-icon>
      </div>
    </div>
  </div>
  <div v-else-if="!store.userDetails" class="h-screen">
    <app-navbar />
    <div
      class="font-mono min-h-[calc(100vh-70px)] items-center justify-center flex flex-row mt-[68px] bg-[linear-gradient(#f2f2f2_1px,transparent_1px),linear-gradient(90deg,#f2f2f2_1px,transparent_1px)] bg-[size:30px_30px] py-[60px]"
    >
      <not-signed-in></not-signed-in>
    </div>
  </div>
  <div v-else>
    <app-navbar />
    <div
      class="font-mono min-h-[calc(100vh-70px)] mt-[70px] bg-[linear-gradient(#f2f2f2_1px,transparent_1px),linear-gradient(90deg,#f2f2f2_1px,transparent_1px)] bg-[size:30px_30px] py-[60px] flex flex-col items-center justify-center"
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
import { useMainStore } from "~/stores/index.js";
const store = useMainStore();

const { signInWithGoogle } = useAuth();
</script>

<style></style>
