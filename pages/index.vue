<template>
  <div class=" w-full flex items-center justify-center bg-gray-100 p-4">
    <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-6 space-y-4">
      <h1 class="text-2xl font-bold text-center text-gray-800">Welcome to Auth Flow</h1>
      <p class="text-center text-gray-600">Experience a complete authentication system with various login methods and
        security features.</p>

      <div class="space-y-4 mt-6 text-center">
        <div class="flex flex-col space-y-2">
          <h2 class="text-lg font-semibold text-gray-700">Features:</h2>
          <ul class="list-disc list-inside text-gray-600 space-y-1">
            <li>Google Authentication</li>
            <li>Email/Password Login</li>
            <li>Password Reset</li>
            <li>Email Verification</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "simple",
});
const { signInWithGoogle, signInWithEmail } = useAuth();
import { useMainStore } from "~/stores/index.js";
const { $pinia, $axios, $bus } = useNuxtApp();
const store = useMainStore($pinia);

const router = useRouter();
const checkbox = ref(false);
const isSubmitting = ref(false);
const email = ref("");
const password = ref("");
const errorMessage = ref("");
// const showErrorModal = ref(false);
const successMessage = ref("You have signed In Successfully");
// const showSuccessModal = ref(false);
const signinLoading = ref(false);
const passwordRules = ref([
  (v) => !!v || "Password is required",
  (v) => (v && v.length <= 10) || "Password must be less than 10 characters",
]);
const emailRules = ref([
  (v) => !!v || "E-mail is required",
  (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
]);

async function signInWithEmailPass() {
  try {
    isSubmitting.value = true;
    const payload = {
      email: email.value,
      password: password.value,
    };
    await signInWithEmail(payload);
    // showSuccessModal.value = true;
    navigateTo("/");
  } catch (error) {
    errorMessage.value = error.message;
    // showErrorModal.value = true;
  }
  {
    isSubmitting.value = false;
  }
}
async function signInByGoogle() {
  signinLoading.value = true;

  try {
    await signInWithGoogle();
  } catch (error) {
    // showErrorModal.value = true;
    // errorMessage.value = error.message;
  }
  signinLoading.value = false;
  navigateTo("/");
}
// function closeSuccessModal() {
//   showSuccessModal.value = false;
// }
// function closeErrorModal() {
//   showErrorModal.value = false;
// }

onMounted(() => {
  if (store.userDetails) {
    navigateTo("/");
  }
});
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  grid-gap: 1rem;
}

.grid .divide-border {
  border-bottom: 1px solid #ccc;
}
</style>
