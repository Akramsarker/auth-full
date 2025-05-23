<template>
  <header class="font-mono fixed top-0 right-0 w-full z-30 bg-white">
    <div class="max-w-[100vw] mx-auto w-[95%] sm:w-full sm:px-[1.5rem] px-0 py-3 flex items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center">
        <NuxtLink to="/" class="text-xl font-bold">
          Logo Here
        </NuxtLink>
      </div>
      <!-- Right side -->
      <div class="flex items-center gap-4">
        <div>
          <NuxtLink to="/signin"
            class="bg-[#FFE600] border-2 border-black px-4 py-1 text-base font-medium uppercase shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:-translate-y-0.3 hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all">
            SignIn →
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>

  <div v-show="showPopUpProfileBox" class="fixed top-16 right-6 z-50 w-80">
    <popup-profile-box />
  </div>
</template>

<script setup>
import {
  LayoutDashboard,
  PlusCircle,
  Receipt,
  ScanLine,
  Settings,
  UserCheck,
  Search,
  DollarSign,
} from "lucide-vue-next";
import { useMainStore } from "~/stores/index.js";
const store = useMainStore();
const showPopUpProfileBox = ref(false);

onMounted(() => {
  const target = document.querySelector(".popup");
  document.addEventListener("click", (event) => {
    const withinBoundaries = event.composedPath().includes(target);
    if (!withinBoundaries) showPopUpProfileBox.value = false;
  });
});
</script>

<style scoped></style>
