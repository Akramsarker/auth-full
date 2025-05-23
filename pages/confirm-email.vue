<template>
  <div
    class="w-full h-full my-auto font-mono"
    style="display: grid; grid-template-columns: 50vw 50vw"
  >
    <slider></slider>
    <div class="relative lg:w-[100%] w-[100vw]">
      <div
        class="absolute inset-0 bg-[linear-gradient(#F2F1ED_1px,transparent_1px),linear-gradient(90deg,#F2F1ED_1px,transparent_1px)] bg-[size:30px_30px]"
      >
        <div
          class="h-full flex flex-col justify-center m-auto sm:w-[450px] px-4 sm:px-0"
        >
          <!-- Loading State -->
          <p class="text-center text-2xl" v-if="isVerifying">Verifying...</p>

          <!-- Error State -->
          <div
            v-else-if="errorMessage"
            class="border-2 border-black bg-white/90 backdrop-blur-sm p-8 shadow-[4px_4px_0_0_rgba(167,139,250,0.3)]"
          >
            <h3 class="text-center text-2xl text-[#2680EB] font-bold">
              Email Verification Failed
            </h3>
            <p class="text-center text-red-500 mt-4">
              {{ errorMessage }}
            </p>
          </div>

          <!-- Success State -->
          <div
            v-else
            class="border-2 border-black bg-white/90 backdrop-blur-sm p-8 shadow-[4px_4px_0_0_rgba(167,139,250,0.3)] hover:shadow-[6px_6px_0_0_rgba(167,139,250,0.4)] transition-all duration-300"
          >
            <div v-if="isVerificationSuccess">
              <h2 class="text-center text-3xl font-bold text-[#2680EB] mb-4">
                Email Verified!
              </h2>
              <div class="text-center">
                <div class="text-[4rem] mb-4">🎉</div>
                <p class="text-gray-600 mb-6">
                  Email has been verified successfully. You will be
                  automatically redirected to the Dashboard.
                </p>

                <button
                  class="w-full bg-[#FFE600] border-2 border-black px-6 py-2 text-base font-bold shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition-all"
                  @click="navigateTo('/')"
                >
                  Go to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "simple",
});
import { useRoute } from "vue-router";
// import useConfetti from '~/composables/useConfetti';
import { useMainStore } from "~/stores/index.js";

const { $pinia, $axios, $bus } = useNuxtApp();
const store = useMainStore($pinia);
const route = useRoute();
const { verifyEmail, auth } = useAuth();
const uid = ref("");

// const { verifyEmail } = useAuth();

const errorMessage = ref("");
const isVerificationSuccess = ref(true);
const isVerifying = ref(true);

onMounted(() => {
  confirmEmailVerification();
});
async function confirmEmailVerification() {
  isVerifying.value = true;
  try {
    const actionCode = route.query.oobCode;
    await verifyEmail(actionCode);
    store.updateUserDetails({ is_verified: true });

    isVerificationSuccess.value = true;
    setTimeout(function () {
      navigateTo("/onboarding");
    }, 5000); // 5000 milliseconds = 5 seconds

    isVerifying.value = false;
  } catch (error) {
    errorMessage.value = error.message;
    isVerifying.value = false;
  }
}

// useConfetti();
</script>

<style scoped>
/* Remove existing styles as they're now handled by inline classes */
</style>
