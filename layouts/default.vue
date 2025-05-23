<template>
  <div v-if="store.userLoading">
    <div class="h-full">
      <app-navbar />
      <div
        class="font-mono min-h-[calc(100vh-70px)] items-center justify-center flex flex-row mt-[68px] bg-[linear-gradient(#f2f2f2_1px,transparent_1px),linear-gradient(90deg,#f2f2f2_1px,transparent_1px)] bg-[size:30px_30px] py-[70px]"
      >
        <loading-icon></loading-icon>
      </div>
    </div>
  </div>
  <div v-else-if="!store.userDetails" class="h-full">
    <app-navbar />
    <div
      class="font-mono flex flex-col items-center justify-center min-h-[calc(100vh-70px)] mt-[70px] bg-[linear-gradient(#f2f2f2_1px,transparent_1px),linear-gradient(90deg,#f2f2f2_1px,transparent_1px)] bg-[size:30px_30px] py-[70px]"
    >
      <not-signed-in></not-signed-in>
    </div>
  </div>
  <div class="h-full w-[100%]" v-else>
    <app-navbar />
    <div
      v-if="showMobileWarning"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <div
        class="w-[90%] max-w-sm bg-white p-4 border-[1px] border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all"
      >
        <div class="flex justify-between items-center mb-3">
          <h2 class="font-mono text-lg font-semibold">
            Mobile Experience Notice
          </h2>
          <button
            @click="dismissWarning"
            class="p-1 border-[1px] border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all"
          >
            <X class="w-5 h-5 text-red-700" />
          </button>
        </div>
        <p class="font-mono text-sm mb-4">
          For the best experience, we recommend using a desktop or laptop
          device. The mobile experience may be limited.
        </p>
        <button
          @click="dismissWarning"
          class="w-full bg-[#FFE600] text-[#000] border-2 border-black px-4 py-2 text-base font-medium uppercase shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:-translate-y-0.3 hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all rounded-none flex items-center justify-center"
        >
          Continue Anyway
        </button>
      </div>
    </div>
    <div
      class="font-mono min-h-[calc(100vh-70px)] bg-[linear-gradient(#f2f2f2_1px,transparent_1px),linear-gradient(90deg,#f2f2f2_1px,transparent_1px)] bg-[size:30px_30px] mt-[70px]"
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
import { useMainStore } from "~/stores/index.js";
import { X } from "lucide-vue-next";
const store = useMainStore();

const { signInWithGoogle } = useAuth();

// Mobile warning state
const showMobileWarning = ref(false);

onMounted(() => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const hasDismissedWarning = localStorage.getItem("mobileWarningDismissed");

  if (isMobile && !hasDismissedWarning) {
    showMobileWarning.value = true;
  }
});

const dismissWarning = () => {
  showMobileWarning.value = false;
  localStorage.setItem("mobileWarningDismissed", "true");
};
</script>

<style></style>
