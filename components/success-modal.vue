<template>
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

  <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
    <div
      class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
    >
      <div
        class="absolute transform overflow-hidden rounded-lg top-[40%] bg-white text-left shadow-xl transition-all max-w-[520px] sm:my-8 sm:w-full sm:max-w-lg"
      >
        <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <p class="text-sm text-gray-500">{{ message }}</p>
              <button
                class="text-[#f84a4a] absolute top-2 right-4 text-[18px] font-semibold"
                @click="emitClose"
              >
                X
              </button>
            </div>
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
