<template>
  <NuxtLayout class="w-[80vw] m-auto" :name="404">
    <div class="flex justify-center items-center m-auto h-[calc(100vh-67px)]">
      <div class="px-8">
        <div class="text-center">
          <h1
            class="sm:text-[12rem] leading-tight text-[9rem] font-bold boujee-text"
          >
            404
          </h1>
          <h3 class="text-4xl mb-4 sm:text-2xl">Page Not Found !</h3>
          <p class="text-base text-[#343434]">
            The page you are looking for doesn't <br />
            exist or has been moved to another location.
          </p>
          <div class="mt-8">
            <nuxt-link href="/" class="flex justify-center text-[#343434]">
              <button
                class="inline-block rounded-lg px-6 py-3 text-white text-base font-medium btn-primary"
                aria-label="Go To Home Page"
                title="Go To Home Page"
              >
                Go To Home Page
              </button>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup></script>

<style scoped></style>
