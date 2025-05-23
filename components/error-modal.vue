<template>
  <div
    class="fixed inset-0 z-50 overflow-auto bg-[#00000080] bg-opacity-50 flex items-center justify-center sm:px-4"
  >
    <div
      class="relative py-5 overflow-hidden rounded-xl max-w-[460px] px-4 sm:px-2 bg-[#F3ECFF] text-left shadow-xl transition-all"
    >
      <div class="flex items-start">
        <div class="text-left">
          <div
            class="flex items-center justify-center p-4 text-xl rounded-lg text-red-700"
            role="alert"
          >
            <h3
              class="text-2xl mb-4 font-bold leading-8 text-[#FF6B00] sm:text-[1.3rem] text-center"
            >
              {{ title }}
            </h3>
          </div>
          <p
            class="text-base text-center text-[#5D6185] leading-7 sm:px-2"
            id="modal-title"
          >
            {{ message }}
          </p>
        </div>
      </div>
      <div class="py-3 mt-4 gap-8 flex items-center justify-center px-6">
        <button
          @click="$emit('submit')"
          type="button"
          style="background: linear-gradient(180deg, #edb74d 0%, #ff6b00 100%)"
          class="inline-block rounded-lg px-6 py-2 text-white text-base font-medium"
          :aria-label="buttonText"
          :title="buttonText"
        >
          {{ buttonText }}
        </button>
      </div>
      <button
        v-if="isClosable"
        @click="$emit('close')"
        class="text-black absolute top-3 right-3 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
        aria-label="Close"
        title="Close"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="h-6 w-6"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: "Something Went Wrong!",
  },
  message: {
    type: String,
    default:
      "An error occurred while processing your request. Please try again.",
  },
  buttonText: {
    type: String,
    default: "Try Again",
  },
  isClosable: {
    type: Boolean,
    default: true,
  },
});
</script>

<style lang="scss" scoped></style>
