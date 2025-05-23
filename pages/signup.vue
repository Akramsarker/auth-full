<template>
  <div class="h-full w-full my-auto font-mono" style="display: grid; grid-template-columns: 1fr 1fr">
    <slider></slider>
    <div class="relative lg:w-[100%] w-[100vw]">
      <div
        class="absolute inset-0 bg-[linear-gradient(#F2F1ED_1px,transparent_1px),linear-gradient(90deg,#F2F1ED_1px,transparent_1px)] bg-[size:30px_30px]">
        <div class="h-full flex flex-col justify-center m-auto sm:w-[450px] p-4 sm:p-0 mt-20 sm:mt-0">
          <div
            class="border-2 border-black bg-white/90 backdrop-blur-sm shadow-[4px_4px_0_0_rgba(167,139,250,0.3)] hover:shadow-[6px_6px_0_0_rgba(167,139,250,0.4)] transition-all duration-300">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 class="mt-8 text-center text-3xl font-bold leading-9 tracking-tight text-[#2680EB]">
                Sign Up
              </h2>
            </div>
            <div class="mt-10 px-10">
              <form class="space-y-6">
                <div>
                  <label class="block text-sm font-medium leading-6 text-gray-900" for="name">
                    Name
                  </label>
                  <div class="mt-2">
                    <input v-model="displayName"
                      class="block w-full border-0 py-3 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-gray-600 sm:text-sm sm:leading-6"
                      id="name" type="name" placeholder="Enter your name here" required />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium leading-6 text-gray-900" for="email">
                    Email
                  </label>
                  <div class="mt-2">
                    <input v-model="email"
                      class="block w-full border-0 py-3 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-gray-600 sm:text-sm sm:leading-6"
                      id="email" type="email" placeholder="Enter your Email here" required />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium leading-6 text-gray-900" for="password">
                    Password
                  </label>

                  <div class="mt-2">
                    <input v-model="password"
                      class="block w-full border-0 py-3 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-gray-600 sm:text-sm sm:leading-6"
                      id="password" type="password" required placeholder="Enter your password here" />
                  </div>
                </div>

                <div>
                  <button
                    class="w-full bg-[#FFE600] border-2 border-black uppercase px-6 py-2 text-base font-bold shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition-all"
                    title="Upgrade" aria-label="Upgrade" type="button" @click="signUpWithEmailPass">
                    {{ isSigningUpWithEmailPass ? "Loading.." : "Sign Up" }}
                  </button>
                </div>

                <div class="grid mb-4">
                  <h1 class="divide-border"></h1>
                  <div class="or">or</div>
                  <h1 class="divide-border"></h1>
                </div>

                <button
                  class="flex w-full justify-center items-center py-3 font-bold text-base bg-white border-2 border-black text-black uppercase hover:bg-[#FFE600] shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition-all duration-300"
                  title="Signin" aria-label="Signin" type="button" @click="signUpWithGoogleWrapper">
                  <template v-if="!signinLoading">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 25 24" fill="none">
                      <g clip-path="url(#clip0_580_1579)">
                        <path
                          d="M24.4886 12.2261C24.4886 11.2429 24.4069 10.5253 24.2302 9.78125H12.7391V14.2192H19.4841C19.3482 15.3221 18.6138 16.9831 16.9819 18.0992L16.959 18.2478L20.5923 20.998L20.844 21.0225C23.1558 18.9363 24.4886 15.8669 24.4886 12.2261Z"
                          fill="#4285F4" />
                        <path
                          d="M12.7391 23.9178C16.0436 23.9178 18.8177 22.8548 20.844 21.0211L16.9819 18.0978C15.9484 18.8021 14.5613 19.2937 12.7391 19.2937C9.50254 19.2937 6.75557 17.2076 5.77636 14.3242L5.63282 14.3361L1.85489 17.193L1.80548 17.3271C3.81811 21.2337 7.9522 23.9178 12.7391 23.9178Z"
                          fill="#34A853" />
                        <path
                          d="M5.77634 14.3228C5.51797 13.5787 5.36844 12.7814 5.36844 11.9576C5.36844 11.1338 5.51797 10.3365 5.76275 9.59244L5.75591 9.43397L1.93062 6.53125L1.80547 6.58942C0.975969 8.21052 0.5 10.0309 0.5 11.9576C0.5 13.8843 0.975969 15.7047 1.80547 17.3258L5.77634 14.3228Z"
                          fill="#FBBC05" />
                        <path
                          d="M12.7391 4.62403C15.0373 4.62403 16.5875 5.59402 17.4715 6.40461L20.9256 3.10928C18.8042 1.1826 16.0436 0 12.7391 0C7.9522 0 3.81811 2.68406 1.80548 6.59056L5.76276 9.59359C6.75557 6.7102 9.50254 4.62403 12.7391 4.62403Z"
                          fill="#EB4335" />
                      </g>
                      <defs>
                        <clipPath id="clip0_580_1579">
                          <rect width="24" height="24" fill="white" transform="translate(0.5)" />
                        </clipPath>
                      </defs>
                    </svg>

                    &nbsp; Sign In With Google
                  </template>
                  <p v-else>Loading...</p>
                </button>
                <div>
                  <p class="flex items-center mb-6">
                    Already have an Account?
                    <a class="text-[#2680Ec] hover:text-[#268fff] pl-2 font-weight-medium" href="/signin">
                      Sign In
                    </a>
                  </p>
                </div>
              </form>
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
import { useMainStore } from "~/stores/index.js";
const store = useMainStore();
const valid = ref(false);
const passwordRules = ref([
  (v) => !!v || "Password is required",
  (v) =>
    (v && v.length >= 10) ||
    "Password must be greater than or equal to 10 characters",
]);
const emailRules = ref([
  (v) => !!v || "E-mail is required",
  (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
]);

const nameRules = ref([
  (v) => !!v || "Name is required",
  (v) => (v && v.length <= 20) || "Name must be less than 10 characters",
]);
const { signInWithGoogle, signUpWithEmail } = useAuth();

const password = ref("");
const email = ref("");
const displayName = ref("");
const isSigningUpWithEmailPass = ref(false);
const isSigningUpWithGoogle = ref(false);
// const showSuccessModal = ref(false);
const errorMessage = ref("");
const successMessage = ref(
  "An Email has been send to your Inbox. Please verify your account.",
);
const showErrorModal = ref(false);
const signinLoading = ref(false);
const animationDirection = ref("");

async function signUpWithEmailPass() {
  try {
    isSigningUpWithEmailPass.value = true;
    await signUpWithEmail(email.value, password.value, displayName.value);
    toast({
      title: "Success",
      description:
        "An Email has been send to your Inbox. Please verify your account.",
      variant: "default",
    });
  } catch (error) {
    // showErrorModal.value = true;
    // errorMessage.value = error.message;
  } finally {
    isSigningUpWithEmailPass.value = false;
  }
}

async function signUpWithGoogleWrapper() {
  try {
    isSigningUpWithGoogle.value = true;
    await signInWithGoogle();
  } catch (error) {
    showErrorModal.value = true;
    errorMessage.value = error.message;
  } finally {
    isSigningUpWithGoogle.value = false;
  }
  navigateTo("/");
}

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

.bg {
  background: rgb(170, 173, 173);
  border-radius: inherit;
  left: 0;
  opacity: 0.32;
  pointer-events: auto;
  position: fixed;
  right: 0;
}
</style>
