<template>
  <div class="auth-page"></div>
</template>

<script setup>
definePageMeta({
  layout: "simple",
});
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";

onBeforeMount(() => {
  const router = useRouter();

  const action = router.currentRoute.value.query.mode;
  const queryString = router.currentRoute.value.fullPath.replace("/auth?", "");
  const queryObject = Object.fromEntries(new URLSearchParams(queryString));
  if (action === "signIn") {
    router.push({
      path: "/signin",
      query: queryObject,
    });
  } else if (action === "resetPassword") {
    router.push({
      path: "/new-password",
      query: queryObject,
    });
  } else if (action === "verifyEmail") {
    router.push({
      path: "/confirm-email",
      query: queryObject,
    });
  }
});
</script>

<style scoped>
.auth-page {
  min-height: calc(100vh - 64px);
  background-color: #f8f8f8;
}
</style>
