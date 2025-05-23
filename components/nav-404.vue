<template>
  <header
    class="py-4 fixed overflow-hidden z-30 bg-white w-[100vw] top-0 right-0"
    style="box-shadow: 0px 3px 15px 0px #bcbcbc40"
  >
    <div class="w-[90%] mx-auto flex justify-between items-center flex-row">
      <NuxtLink to="/">
        <img
          class="sm:w-[164px]"
          src="https://storage.aistorygen.org/static/ai-story-logo.png"
          alt="Logo"
        />
      </NuxtLink>
      <div class="flex items-center ml-auto">
        <template v-if="store.userDetails">
          <div class="mr-8">
            <NuxtLink
              class="bg-[#391685] h-[40px] w-[40px] rounded-[50%] text-center flex justify-center items-center text-[#fff]"
              to="/story/create"
              >╋
            </NuxtLink>
          </div>
          <div>
            <img
              v-if="store?.userDetails?.photoURL"
              :src="store.userDetails.photoURL"
              :alt="store?.userDetails?.displayName"
              class="h-10 w-10 bg-gray-200 border rounded-full"
              @click.stop="showPopUpProfileBox = !showPopUpProfileBox"
            />
            <img
              v-else
              :src="`https://api.dicebear.com/7.x/initials/svg?seed=${store?.userDetails?.displayName}&backgroundColor=A91CDA`"
              :alt="store?.userDetails?.displayName"
              class="h-10 w-10 bg-gray-200 border rounded-full"
              @click.stop="showPopUpProfileBox = !showPopUpProfileBox"
            />
          </div>
        </template>
        <div v-else>
          <NuxtLink class="mr-8 text-[#3C1593] font-medium" to="/Signin"
            >Signin</NuxtLink
          >
          <NuxtLink class="mr-8 text-[#3C1593] font-medium" to="/Signup"
            >Signup</NuxtLink
          >
        </div>
      </div>
    </div>
  </header>
  <div
    v-show="showPopUpProfileBox"
    class="top-16 right-6 z-50 popup"
    style="position: fixed; width: 320px"
  >
    <popup-profile-box />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
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

<style scoped>
@media screen and (min-width: 1023px) {
  .display {
    display: block;
  }
}
</style>
