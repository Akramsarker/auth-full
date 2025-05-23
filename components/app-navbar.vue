<template>
  <header class="font-mono fixed top-0 right-0 w-full z-30 bg-white">
    <div
      class="max-w-[100vw] mx-auto w-[95%] sm:w-full sm:px-[1.5rem] px-0 py-3 flex items-center justify-between"
    >
      <!-- Logo -->
      <div class="flex items-center">
        <NuxtLink to="/" class="text-xl font-bold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="120"
            height="45"
            viewBox="0 0 498 170"
            fill="none"
          >
            <path
              d="M341.174 97.5282C329.093 97.5282 319.595 94.2609 312.68 87.7264C305.842 81.1919 302.423 71.96 302.423 60.0307C302.423 51.7486 304.018 44.5682 307.21 38.4896C310.477 32.335 315.036 27.5481 320.886 24.1288C326.813 20.7096 333.69 19 341.516 19C344.783 19 347.936 19.3039 350.976 19.9118C354.015 20.5197 356.94 21.3555 359.752 22.4192L356.674 37.1219C354.167 35.9822 351.659 35.1084 349.152 34.5005C346.645 33.8926 344.137 33.5887 341.63 33.5887C334.639 33.5887 329.131 35.8682 325.103 40.4271C321.152 44.9861 319.177 50.9887 319.177 58.4351C319.177 66.1093 321.304 72.074 325.559 76.329C329.814 80.584 335.703 82.7116 343.225 82.7116C345.505 82.7116 347.86 82.5216 350.292 82.1417C352.799 81.6858 355.231 81.0779 357.586 80.3181L360.094 94.3369C354.547 96.4644 348.24 97.5282 341.174 97.5282Z"
              fill="#2680EB"
            />
            <path
              d="M272.358 96.0464V20.1396H288.885V96.0464H272.358Z"
              fill="#2680EB"
            />
            <path
              d="M221.274 97.5283C213.752 97.5283 207.141 95.8946 201.442 92.6274C195.82 89.3601 191.413 84.8012 188.221 78.9505C185.106 73.0238 183.548 66.1854 183.548 58.4351C183.548 50.5329 185.106 43.6565 188.221 37.8058C191.413 31.9551 195.82 27.3962 201.442 24.1289C207.141 20.8617 213.752 19.228 221.274 19.228C228.796 19.228 235.369 20.8617 240.991 24.1289C246.69 27.3202 251.097 31.8412 254.212 37.6918C257.328 43.4665 258.885 50.229 258.885 57.9792C258.885 65.8815 257.328 72.7959 254.212 78.7225C251.097 84.6492 246.69 89.2841 240.991 92.6274C235.369 95.8946 228.796 97.5283 221.274 97.5283ZM221.274 83.0536C227.58 83.0536 232.595 80.8121 236.318 76.3291C240.042 71.8461 241.903 65.8814 241.903 58.4351C241.903 53.4963 241.029 49.1652 239.282 45.4421C237.61 41.7189 235.217 38.8316 232.101 36.78C228.986 34.7285 225.377 33.7407 221.274 33.8167C217.171 33.7407 213.562 34.7285 210.446 36.78C207.407 38.8316 205.013 41.7189 203.266 45.4421C201.518 49.1652 200.644 53.4963 200.644 58.4351C200.644 63.374 201.48 67.705 203.152 71.4282C204.9 75.0754 207.331 77.9247 210.446 79.9762C213.562 82.0278 217.171 83.0536 221.274 83.0536Z"
              fill="#2680EB"
            />
            <path
              d="M134.094 96.0464L108.45 20.1396H126.686L144.693 78.0385L162.587 20.1396H179.57L154.039 96.0464H134.094Z"
              fill="#2680EB"
            />
            <path
              d="M33.3695 96.0464V20.1396H52.7451L84.202 73.3656V20.1396H99.3605V96.0464H80.2129L48.5281 42.4786V96.0464H33.3695Z"
              fill="#2680EB"
            />
            <path
              d="M-0.00012207 96.0464V20.1396H16.5261V96.0464H-0.00012207Z"
              fill="#2680EB"
            />
            <path
              d="M405 6L369.859 14.2356C387.896 41.4463 393.622 61.3748 402.983 101.821L405 6Z"
              fill="#2D2D2D"
            />
            <path
              d="M428.938 75.0158L478.063 75.0158C481.343 75.0158 484.001 77.6741 484.001 80.9533C484.001 84.2325 481.343 86.8909 478.063 86.8909L428.938 86.8909C425.658 86.8909 423 84.2325 423 80.9533C423 77.6741 425.658 75.0158 428.938 75.0158Z"
              fill="#2680EB"
            />
            <path
              d="M428.939 48.5077L463.359 48.5077C466.639 48.5077 469.298 51.1665 469.298 54.4464C469.298 57.7262 466.639 60.385 463.359 60.385L428.939 60.385C425.659 60.385 423 57.7262 423 54.4464C423 51.1665 425.659 48.5077 428.939 48.5077Z"
              fill="#2680EB"
            />
            <path
              d="M428.939 21.9999L483.718 21.9999C486.998 21.9999 489.656 24.6587 489.656 27.9386C489.656 31.2184 486.998 33.8772 483.718 33.8772L428.939 33.8772C425.66 33.8772 423.001 31.2184 423.001 27.9386C423.001 24.6587 425.66 21.9999 428.939 21.9999Z"
              fill="#2680EB"
            />
            <path
              d="M407.408 2.01025L379.658 6.50681C392.143 34.7815 395.854 57.6587 401 98.9999L407.408 2.01025Z"
              fill="#FBEA00"
            />
            <path
              d="M493.008 3.35987e-06C495.493 1.50427e-06 497.508 2.01472 497.508 4.5C497.508 6.98528 495.493 9 493.008 9L421.468 9C415.945 9 411.468 13.4772 411.468 19L411.468 89C411.468 94.5228 415.945 99 421.468 99L493.476 99C495.685 99 497.508 100.791 497.508 103C497.508 105.209 495.717 107 493.508 107L410.451 107C404.928 107 400.451 102.523 400.451 97L400.451 10.0001C400.451 4.47721 404.928 6.91234e-05 410.451 6.49999e-05L493.008 3.35987e-06Z"
              fill="#2D2D2D"
            />
            <path
              d="M0 168.417L11.4091 137.419H19.5451L31.0945 168.417H24.0807L21.5557 161.343H9.30496L6.92027 168.417H0ZM11.2688 155.571H19.5451L15.3368 143.702L11.2688 155.571Z"
              fill="#2D2D2D"
            />
            <path
              d="M92.1173 169.116C88.626 169.116 85.6335 168.511 83.1397 167.3C80.6459 166.059 78.7288 164.306 77.3884 162.041C76.0479 159.745 75.3777 156.999 75.3777 153.803C75.3777 150.42 76.0791 147.472 77.4819 144.959C78.9158 142.446 80.9108 140.491 83.467 139.094C86.0231 137.698 89.0001 137 92.3979 137C94.3305 137 96.1541 137.217 97.8686 137.652C99.6143 138.086 101.157 138.707 102.498 139.513L100.861 145.099C99.6454 144.354 98.2894 143.78 96.7932 143.377C95.3281 142.942 93.863 142.725 92.3979 142.725C90.3405 142.725 88.5325 143.175 86.9739 144.075C85.4152 144.944 84.1995 146.169 83.3267 147.752C82.4539 149.334 82.0175 151.196 82.0175 153.337C82.0175 156.44 82.9526 158.891 84.823 160.691C86.7245 162.46 89.3118 163.344 92.5849 163.344C93.8941 163.344 95.1099 163.251 96.2321 163.065V156.642H92.3043V151.196H102.451V167.3C99.2402 168.511 95.7957 169.116 92.1173 169.116Z"
              fill="#2D2D2D"
            />
            <path
              d="M151.289 168.417V137.419H170.226V143.283H157.976V149.474H168.122V155.152H157.976V162.553H170.226V168.417H151.289Z"
              fill="#2D2D2D"
            />
            <path
              d="M218.634 168.417V137.419H226.583L239.489 159.155V137.419H245.708V168.417H237.852L224.853 146.542V168.417H218.634Z"
              fill="#2D2D2D"
            />
            <path
              d="M301.432 168.417V143.283H292.922V137.419H316.675V143.283H308.259V168.417H301.432Z"
              fill="#2D2D2D"
            />
            <path
              d="M362.884 170C361.575 170 360.437 169.519 359.471 168.557C358.536 167.626 358.068 166.509 358.068 165.206C358.068 163.872 358.536 162.739 359.471 161.808C360.437 160.846 361.575 160.365 362.884 160.365C364.225 160.365 365.362 160.846 366.297 161.808C367.233 162.739 367.7 163.872 367.7 165.206C367.7 166.509 367.233 167.626 366.297 168.557C365.362 169.519 364.225 170 362.884 170Z"
              fill="#2D2D2D"
            />
            <path
              d="M413.614 168.417L425.023 137.419H433.159L444.709 168.417H437.695L435.17 161.343H422.919L420.535 168.417H413.614ZM424.883 155.571H433.159L428.951 143.702L424.883 155.571Z"
              fill="#2D2D2D"
            />
            <path
              d="M491.22 168.417V137.419H498V168.417H491.22Z"
              fill="#2D2D2D"
            />
          </svg>
        </NuxtLink>
      </div>

      <!-- Navigation -->

      <div class="hidden sm:block">
        <nav v-if="store.userDetails" class="flex items-center gap-8">
          <NuxtLink
            to="/"
            class="group font-medium text-gray-600 hover:text-[#665EF3]"
            :class="$route.path === '/' ? '!text-[#665EF3]' : ''"
            title="Dashboard"
          >
            <span class="flex items-center gap-2">
              <LayoutDashboard
                class="h-5 w-5 transition-colors group-hover:text-[#665EF3]"
                :class="
                  $route.path === '/' ? '!text-[#665EF3]' : 'text-gray-600'
                "
              />
              <span class="hidden xl:inline">Dashboard</span>
            </span>
          </NuxtLink>
          <NuxtLink
            to="/invoice"
            class="group font-medium text-gray-600 hover:text-[#665EF3]"
            :class="$route.path === '/invoice' ? '!text-[#665EF3]' : ''"
            title="Invoice"
          >
            <span class="flex items-center gap-2">
              <Receipt
                class="h-5 w-5 transition-colors group-hover:text-[#665EF3]"
                :class="
                  $route.path === '/invoice'
                    ? '!text-[#665EF3]'
                    : 'text-gray-600'
                "
              />
              <span class="hidden xl:inline">Invoice</span>
            </span>
          </NuxtLink>
           <NuxtLink
            to="/search"
            class="group font-medium text-gray-600 hover:text-[#665EF3]"
            :class="$route.path === '/search' ? '!text-[#665EF3]' : ''"
            title="Search"
          >
            <span class="flex items-center gap-2">
              <Search
                class="h-5 w-5 transition-colors group-hover:text-[#665EF3]"
                :class="
                  $route.path === '/search'
                    ? '!text-[#665EF3]'
                    : 'text-gray-600'
                "
              />
              <span class="hidden xl:inline">Search</span>
            </span>
          </NuxtLink>
          <NuxtLink
            to="/jobs"
            class="group font-medium text-gray-600 hover:text-[#665EF3]"
            :class="$route.path === '/jobs' ? '!text-[#665EF3]' : ''"
            title="Jobs"
          >
            <span class="flex items-center gap-2">
              <ScanLine
                class="h-5 w-5 transition-colors group-hover:text-[#665EF3]"
                :class="
                  $route.path === '/jobs' ? '!text-[#665EF3]' : 'text-gray-600'
                "
              />
              <span class="hidden xl:inline">Jobs</span>
            </span>
          </NuxtLink>

          <NuxtLink
            to="/invoice-review"
            class="group font-medium text-gray-600 hover:text-[#665EF3]"
            :class="$route.path === '/invoice-review' ? '!text-[#665EF3]' : ''"
            title="Verify"
          >
            <span class="flex items-center gap-2 relative">
              <UserCheck
                class="h-5 w-5 transition-colors group-hover:text-[#665EF3]"
                :class="
                  $route.path === '/invoice-review'
                    ? '!text-[#665EF3]'
                    : 'text-gray-600'
                "
              />
              <span
                v-if="store.duplicatesLength + store.humanReviewLength > 0"
                class="absolute -top-2 -right-4 bg-[#FFE600] text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold text-[18px]"
              >
                {{ store.duplicatesLength + store.humanReviewLength }}
              </span>
              <span class="hidden xl:inline">Invoice Review</span>
            </span>
          </NuxtLink>
          <NuxtLink
            to="/settings"
            class="group font-medium text-gray-600 hover:text-[#665EF3]"
            :class="$route.path === '/settings' ? '!text-[#665EF3]' : ''"
            title="Settings"
          >
            <span class="flex items-center gap-2">
              <Settings
                class="h-5 w-5 transition-colors group-hover:text-[#665EF3]"
                :class="
                  $route.path === '/settings'
                    ? '!text-[#665EF3]'
                    : 'text-gray-600'
                "
              />
              <span class="hidden xl:inline">Settings</span>
            </span>
          </NuxtLink>
         
          <NuxtLink
            to="/pricing"
            class="group font-medium text-gray-600 hover:text-[#665EF3]"
            :class="$route.path === '/pricing' ? '!text-[#665EF3]' : ''"
            title="Pricing"
          >
            <span class="flex items-center gap-2">
              <DollarSign
                class="h-5 w-5 transition-colors group-hover:text-[#665EF3]"
                :class="
                  $route.path === '/pricing'
                    ? '!text-[#665EF3]'
                    : 'text-gray-600'
                "
              />
              <span class="hidden xl:inline">Pricing</span>
            </span>
          </NuxtLink>
        </nav>
      </div>
      <!-- Right side -->
      <div class="flex items-center gap-4">
        <template v-if="store.userDetails">
          <NuxtLink
            to="/invoice/new"
            class="bg-[#FFE600] hidden sm:block border-2 border-black px-4 py-1 text-base font-medium uppercase shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:-translate-y-0.3 hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all"
          >
            <span class="flex items-center gap-2">
              <PlusCircle class="h-4 w-4" />
              New Invoice
            </span>
          </NuxtLink>
          <div>
            <img
              v-if="store?.userDetails?.photo_url"
              :src="store?.userDetails?.photo_url"
              :alt="store?.userDetails?.display_name"
              class="h-11 w-11 rounded-full cursor-pointer border-2 border-black shadow-[3px_3px_0_0_rgba(167,139,250,0.3)] hover:shadow-[4px_4px_0_0_rgba(167,139,250,0.4)] hover:-translate-y-0.3 transition-all"
              @click.stop="showPopUpProfileBox = !showPopUpProfileBox"
            />
            <img
              v-else
              :src="`https://api.dicebear.com/7.x/initials/svg?seed=${store?.userDetails?.display_name}&backgroundColor=A91CDA`"
              :alt="store?.userDetails?.display_name"
              class="h-11 w-11 rounded-full cursor-pointer border-2 border-black shadow-[3px_3px_0_0_rgba(167,139,250,0.3)] hover:shadow-[4px_4px_0_0_rgba(167,139,250,0.4)] hover:-translate-y-0.3 transition-all"
              @click.stop="showPopUpProfileBox = !showPopUpProfileBox"
            />
          </div>
        </template>
        <div v-else>
          <NuxtLink
            to="/signin"
            class="bg-[#FFE600] border-2 border-black px-4 py-1 text-base font-medium uppercase shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:-translate-y-0.3 hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all"
          >
            SignIn →
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>

  <div v-show="showPopUpProfileBox" class="fixed top-16 right-6 z-50 w-80">
    <popup-profile-box />
  </div>
</template>

<script setup>
import {
  LayoutDashboard,
  PlusCircle,
  Receipt,
  ScanLine,
  Settings,
  UserCheck,
  Search,
  DollarSign,
} from "lucide-vue-next";
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

<style scoped></style>
