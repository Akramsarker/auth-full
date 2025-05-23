<template>
  <div class="glassmorphism bg-white shadow-lg text-left rounded z-50">
    <ul>
      <li>
        <a
          href="#pricing"
          class="text-lg font-medium text-[#171E59] border-t border-b-1 p-3 bg-ebony-clay w-full block hover:bg-[#dcc9ff]"
          >Pricing</a
        >
      </li>
      <li>
        <a
          href="#testimonials"
          class="text-lg font-medium text-[#171E59] border-t border-b-1 p-3 bg-ebony-clay w-full block hover:bg-[#dcc9ff]"
          >Testimonials</a
        >
      </li>

      <li>
        <button
          class="text-lg font-medium text-[#171E59] border-t border-b-1 p-3 w-full text-left bg-ebony-clay cursor-pointer hover:bg-[#dcc9ff]"
          @click="signInWithGoogle"
          aria-label="Sign in"
          title="Sign in"
        >
          Sign in
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
const { signInWithGoogle } = useAuth();
</script>
