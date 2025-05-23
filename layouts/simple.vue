<template>
  <div class="flex min-h-screen bg-[#FFFF]">
    <main
      class="custom-bg-color w-[100%] m-auto transition-all duration-150 ease-in"
    >
      <app-navbar class="big-display navigation"></app-navbar>
      <!-- <div v-if="store.userLoading" class="h-screen">
        <div
          class="font-mono min-h-[calc(100vh-68px)] items-center justify-center flex flex-row mt-[68px] bg-[linear-gradient(#f2f2f2_1px,transparent_1px),linear-gradient(90deg,#f2f2f2_1px,transparent_1px)] bg-[size:30px_30px] py-[60px]"
        >
          <loading-icon></loading-icon>
        </div>
      </div> -->
      <div class="mx-auto mt-[70px] h-[calc(100vh-70px)]">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
import { useMainStore } from "~/stores/index.js";
const { $pinia, $axios, $bus } = useNuxtApp();
const store = useMainStore($pinia);
</script>
