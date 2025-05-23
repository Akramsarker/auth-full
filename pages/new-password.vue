<template>
  <div class="w-full h-full my-auto font-mono" style="display: grid; grid-template-columns: 50vw 50vw">
    <slider></slider>
    <div class="relative lg:w-[100%] w-[100vw]">
      <div
        class="absolute inset-0 bg-[linear-gradient(#F2F1ED_1px,transparent_1px),linear-gradient(90deg,#F2F1ED_1px,transparent_1px)] bg-[size:30px_30px]">
        <div class="h-full flex flex-col justify-center m-auto sm:w-[450px] px-4 sm:px-0">
          <div
            class="border-2 border-black bg-white/90 backdrop-blur-sm shadow-[4px_4px_0_0_rgba(167,139,250,0.3)] hover:shadow-[6px_6px_0_0_rgba(167,139,250,0.4)] transition-all duration-300">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 class="mt-8 text-center text-3xl font-bold leading-9 tracking-tight text-[#2680EB]">
                Input New Password
              </h2>
            </div>
            <div class="mt-10 px-10 pb-6">
              <form class="space-y-6">
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
                  <label class="block text-sm font-medium leading-6 text-gray-900" for="password">
                    Confirm Password
                  </label>

                  <div class="mt-2">
                    <input v-model="confirmPassword"
                      class="block w-full border-0 py-3 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-gray-600 sm:text-sm sm:leading-6"
                      id="password" type="password" required placeholder="Retype password here" />
                  </div>
                </div>

                <div>
                  <button
                    class="w-full bg-[#FFE600] border-2 uppercase border-black px-6 py-2 text-base font-bold shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition-all"
                    title="New password" aria-label="New password" type="button" @click="updatePass()">
                    {{ upDatingPassword ? "Loading.." : "Set New Password" }}
                  </button>
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
const { setNewPassword, auth } = useAuth();
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";

const password = ref("");
const confirmPassword = ref("");
const errorMessage = ref("");
const showErrorModal = ref(false);
const successMessage = ref("");
const showSuccessModal = ref(false);
const passwordRules = ref([
  (v) => !!v || "Password is required",
  (v) => (v && v.length >= 6) || "Password must be greater than 6 characters",
]);
const confirmPasswordRules = ref([
  (v) => !!v || "Please confirm your password",
  (v) => v === password.value || "Passwords do not match",
]);
const upDatingPassword = ref(false);

const oobCode = ref("");
onBeforeMount(() => {
  const router = useRouter();

  const queryString = router.currentRoute.value.fullPath.replace("/auth?", "");
  const queryObject = Object.fromEntries(new URLSearchParams(queryString));
  oobCode.value = queryObject.oobCode;
});
async function updatePass() {
  upDatingPassword.value = true;
  try {
    if (checkPassword) {
      const payload = {
        password: password.value,
        oobCode: oobCode.value,
      };
      await setNewPassword(payload);
      showSuccessModal.value = true;
      successMessage.value = "Password has been updated successfully";
      await navigateTo("/signin");
    }
  } catch (error) {
    // showErrorModal.value = true;
    // errorMessage.value = error.message;
  }
  upDatingPassword.value = false;
}

function checkPassword() {
  if (password.value === confirmPassword.value) {
    return true;
  } else {
    password.value = "";
    confirmPassword.value = "";
    return false;
  }
}
// function closeSuccessModal() {
//   showSuccessModal.value = false;
// }
// function closeErrorModal() {
//   showErrorModal.value = false;
// }
</script>

<style scoped></style>
