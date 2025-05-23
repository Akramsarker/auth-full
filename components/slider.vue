<template>
  <div class="hidden lg:block py-24 relative overflow-hidden bg-[#FEFCEB]">
    <!-- Retro Circuit Pattern -->
    <!-- <div
      class="absolute inset-0 bg-[linear-gradient(45deg,transparent_40%,#2680EB_41%,#2680EB_42%,transparent_43%)] bg-[length:40px_40px] opacity-5">
    </div> -->
    <!-- Circuit Board Pattern Background -->
    <div
      class="absolute inset-0 bg-[linear-gradient(#8B94FF_1px,transparent_1px),linear-gradient(90deg,#8B94FF_1px,transparent_1px)] bg-[size:30px_30px] opacity-10"
    ></div>
    <div class="h-full flex justify-center items-center px-12">
      <div class="relative max-w-[536px]">
        <button @click="previousReview">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-black rounded-full hover:text-[#474747] absolute left-[-40px] top-[50%] transform -translate-y-1/2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button @click="nextReview">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-black hover:text-[#474747] absolute right-[-40px] top-[50%] transform -translate-y-1/2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
        <div class="group">
          <div
            class="border-2 border-black bg-white/90 backdrop-blur-sm p-8 shadow-[4px_4px_0_0_rgba(167,139,250,0.3)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_rgba(167,139,250,0.4)] transition-all duration-300"
            :class="{ 'slide-next': next, 'slide-previous': previous }"
          >
            <div class="flex gap-4 mb-6">
              <div
                class="w-16 h-16 rounded-full bg-[rgb(167,139,250)] border-2 border-black flex items-center justify-center text-2xl font-bold"
              >
                {{ currentReview.userFirstAndLastWord }}
              </div>
              <div>
                <h3 class="text-xl font-bold text-[#2680EB]">
                  {{ currentReview.userName }}
                </h3>
                <p class="text-gray-600">{{ currentReview.type }}</p>
              </div>
            </div>
            <p class="text-gray-600">"{{ currentReview.content }}"</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const reviews = ref([
  {
    id: "hyehfkkf",
    userName: "Maria P.",
    userFirstAndLastWord: "MP",
    type: "Accountant, Global Retail",
    content:
      "The analytics dashboard gives me insights I never had before. I can spot trends and make better financial decisions for our company.",
  },
  {
    id: "hyehfkk8f",
    userName: "Robert B.",
    userFirstAndLastWord: "RB",
    type: "CEO, Future Foods",
    content:
      "Setup was a breeze and the customer support is outstanding. This tool has paid for itself many times over in time saved and errors prevented.",
  },
  {
    id: "hyehfvfrf",
    userName: "John D.",
    userFirstAndLastWord: "JD",
    type: "Owner, Digital Solutions",
    content:
      "The natural language search is a game-changer. I can find any invoice just by typing what I remember about it. No more digging through folders!",
  },
  {
    id: "hydgdfhfe",
    userName: "Sarah K.",
    userFirstAndLastWord: "SK",
    type: "CFO, TechStart Inc",
    content:
      "InvoiceAgent.ai has revolutionized our accounts payable process. What used to take hours now takes minutes. The AI is accurate and the interface is a joy to use!",
  },
]);
const currentIndex = ref(0);
const currentReview = ref(reviews.value[currentIndex.value]);
const next = ref(false);
const previous = ref(false);
const nextReview = () => {
  next.value = true;
  setTimeout(() => {
    next.value = false;
    currentIndex.value = (currentIndex.value + 1) % reviews.value.length;
    currentReview.value = reviews.value[currentIndex.value];
  }, 300);
};
const previousReview = () => {
  previous.value = true;
  setTimeout(() => {
    previous.value = false;
    currentIndex.value =
      (currentIndex.value - 1 + reviews.value.length) % reviews.value.length;
    currentReview.value = reviews.value[currentIndex.value];
  }, 300);
};
let intervalId;
onMounted(() => {
  intervalId = setInterval(nextReview, 3000); // Change review every 3 seconds
});
onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style scoped>
.font-family {
  font-family: "Share Tech Mono", monospace;
}

.grid {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  grid-gap: 1rem;
}

.grid .divide-border {
  border-bottom: 1px solid #ccc;
}

.border-gradient {
  position: relative;
  border-radius: 8px;
}

.border-gradient::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 8px;
  padding: 2px;
  background: linear-gradient(112.49deg, #ff6d6d 37.67%, #eb00ff 76.59%);
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}

@keyframes slide-next {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }

  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slide-previous {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }

  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

.slide-next {
  animation: slide-next 0.3s ease-in-out;
}

.slide-previous {
  animation: slide-previous 0.3s ease-in-out;
}
</style>
