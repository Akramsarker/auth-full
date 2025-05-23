<template>
  <div
    class="h-full w-full my-auto font-mono"
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
          <div
            class="border-2 border-black bg-white/90 backdrop-blur-sm shadow-[4px_4px_0_0_rgba(167,139,250,0.3)] hover:shadow-[6px_6px_0_0_rgba(167,139,250,0.4)] transition-all duration-300"
          >
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2
                class="mt-8 text-center text-3xl font-bold leading-9 tracking-tight text-[#2680EB]"
              >
                Reset Password
              </h2>
              <div v-if="error" class="error-message">{{ error }}</div>
            </div>
            <div class="mt-10 px-10 pb-6">
              <form class="space-y-6" @submit.prevent="resetPassword">
                <div>
                  <div class="mt-2">
                    <input
                      v-model="email"
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      required
                      class="block w-full border-0 py-3 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-gray-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <button
                    class="w-full bg-[#FFE600] border-2 uppercase border-black px-6 py-2 text-base font-bold shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition-all"
                    title="Reset Password"
                    aria-label="Reset Password"
                    @click="resetPassword()"
                  >
                    {{ sendingEmail ? "Loading.." : "Send Reset Email" }}
                  </button>
                </div>
              </form>
              <div
                v-show="showSuccessModal"
                class="relative z-10 dialogue"
                aria-labelledby="modal-title"
                role="dialog"
                aria-modal="true"
              >
                <success-modal
                  :message="successMessage"
                  @close-modal="closeSuccessModal"
                ></success-modal>
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
const { forgetPassword } = useAuth();
const sendingEmail = ref(false);
const email = ref("");

const emailRules = ref([
  (v) => !!v || "E-mail is required",
  (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
]);
const showSuccessModal = ref(false);
const errorMessage = ref("");
const showErrorModal = ref(false);
const successMessage = ref(
  "An Password Reset email has been sent to your Email.Please check your inbox.",
);

async function resetPassword() {
  try {
    sendingEmail.value = true;
    await forgetPassword(email.value);
    showSuccessModal.value = true;
  } catch (error) {
    showErrorModal.value = true;
    errorMessage.value = error.message;
  } finally {
    sendingEmail.value = false;
  }
}

function closeSuccessModal() {
  showSuccessModal.value = false;
}
</script>

<style scoped></style>
