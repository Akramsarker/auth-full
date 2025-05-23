<template>
  <div
    class="max-w-[450px] w-[95%] flex justify-center items-center flex-col px-8 lg:px-8 py-8 border-2 border-black bg-white/90 backdrop-blur-sm shadow-[4px_4px_0_0_rgba(167,139,250,0.3)] hover:shadow-[6px_6px_0_0_rgba(167,139,250,0.4)] transition-all duration-300"
  >
    <h2 class="text-2xl text-black font-bold text-center">Not Signed In</h2>
    <p class="max-w-[320px] text-center text-base font-normal leading-7 mt-4">
      Please signin or signup to access your account and start using Invoice
      Agent.
    </p>
    <div>
      <div class="space-x-5 mt-8">
        <NuxtLink
          to="/"
          class="bg-white px-4 py-1.5 text-base font-normal text-[#0975f5] hover:text-[#0870ec] rounded-md"
        >
          GO BACK
        </NuxtLink>
        <NuxtLink
          class="bg-[#FFE600] border-2 uppercase border-black px-6 py-2 text-lg font-bold shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition-all"
          aria-label="Sign in"
          title="Sign in"
          to="/signin"
        >
          SIGN IN
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const { signInWithGoogle } = useAuth();
</script>

<style></style>
