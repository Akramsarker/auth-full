<template>
  <div
    class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
  ></div>

  <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
    <div class="flex min-h-full items-center justify-center p-4 text-center">
      <div
        class="relative transform overflow-hidden bg-white/90 backdrop-blur-sm border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] rounded-none text-left transition-all w-[90%] max-w-[420px]"
      >
        <!-- Error content -->
        <div class="p-6">
          <div class="flex items-start justify-between">
            <div>
              <h2 class="text-2xl font-bold font-mono text-red-500 mb-4">
                Error Occured!
              </h2>
              <p class="text-base font-mono text-black">{{ message }}</p>
            </div>
            <button
              class="ml-4 bg-[#FFE600] border-2 border-black px-3 py-1 font-bold shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_rgba(0,0,0,1)] transition-all"
              @click="emitClose"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMainStore } from "~/stores/index.js";
const { logout } = useAuth();

const store = useMainStore();

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(["close-modal"]);

const emitClose = () => {
  emit("close-modal");
};
</script>
<style scoped></style>
