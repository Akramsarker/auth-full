<template>
  <div
    class="font-mono bg-white/90 backdrop-blur-sm text-left z-50 border-2 border-black shadow-[4px_4px_0_0_rgba(167,139,250,0.3)] hover:shadow-[6px_6px_0_0_rgba(167,139,250,0.4)] transition-all duration-300"
  >
    <div class="p-4">
      <div>
        <div class="space-y-1">
          <h2 class="text-[#2D2D3C] text-base font-bold tracking-wide">
            {{ store?.userDetails?.display_name }}
          </h2>
          <p
            class="text-gray-700 text-base font-medium w-60 overflow-hidden whitespace-nowrap overflow-ellipsis"
            :title="store?.userDetails?.email"
          >
            {{ store?.userDetails?.email }}
          </p>
          <p class="text-[#2D2D3C]/80 text-base font-medium">
            <span class="text-[#0066FF] font-bold">{{
              store?.orgDetails?.name
            }}</span>
          </p>
        </div>
      </div>
    </div>

    <div class="sm:hidden block">
      <div class="flex p-4">
        <NuxtLink
          to="/invoice/new"
          class="bg-[#FFE600] border-2 uppercase border-black px-4 py-1 font-bold shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition-all"
        >
          <span class="flex items-center gap-2">
            <PlusCircle class="h-4 w-4" />
            New Invoice
          </span>
        </NuxtLink>
      </div>
    </div>
    <div class="divide-y-2 divide-[#E4E4E7]">
      <NuxtLink
        to="/"
        class="flex items-center gap-2 px-4 py-3 hover:bg-[#F1F1FF] transition-all duration-300"
      >
        <LayoutDashboard class="h-5 w-5" />
        <span class="text-[#2D2D3C] font-bold tracking-wide">Dashboard</span>
      </NuxtLink>
      <NuxtLink
        to="/invoice"
        class="flex items-center gap-2 px-4 py-3 hover:bg-[#F1F1FF] transition-all duration-300"
      >
        <Receipt class="h-5 w-5" />
        <span class="text-[#2D2D3C] font-bold tracking-wide">Invoice</span>
      </NuxtLink>
      <NuxtLink
        to="/jobs"
        class="flex items-center gap-2 px-4 py-3 hover:bg-[#F1F1FF] transition-all duration-300"
      >
        <ScanLine class="h-5 w-5" />
        <span class="text-[#2D2D3C] font-bold tracking-wide">Jobs </span>
      </NuxtLink>
      <NuxtLink
        to="/invoice-review"
        class="flex items-center gap-2 px-4 py-3 hover:bg-[#F1F1FF] transition-all duration-300"
      >
        <UserCheck class="h-5 w-5" />
        <span class="text-[#2D2D3C] font-bold tracking-wide"
          >Invoice Review
        </span>
      </NuxtLink>
      <NuxtLink
        to="/settings"
        class="flex items-center gap-2 px-4 py-3 hover:bg-[#F1F1FF] transition-all duration-300"
      >
        <Settings class="h-5 w-5" />
        <span class="text-[#2D2D3C] font-bold tracking-wide">Settings</span>
      </NuxtLink>
      <NuxtLink
        to="/search"
        class="flex items-center gap-2 px-4 py-3 hover:bg-[#F1F1FF] transition-all duration-300"
      >
        <Search class="h-5 w-5" />
        <span class="text-[#2D2D3C] font-bold tracking-wide">Search</span>
      </NuxtLink>
      <NuxtLink
        to="/pricing"
        class="flex items-center gap-2 px-4 py-3 hover:bg-[#F1F1FF] transition-all duration-300"
      >
        <DollarSign class="h-5 w-5" />
        <span class="text-[#2D2D3C] font-bold tracking-wide">Pricing</span>
      </NuxtLink>
      <div class="flex justify-center p-4">
        <button
          v-if="store?.user"
          @click="logout"
          class="w-full bg-[#FFE600] border-2 uppercase border-black px-4 py-1 font-bold shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition-all"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  Briefcase,
  LayoutDashboard,
  PlusCircle,
  Receipt,
  Settings,
  UserCheck,
  Search,
  ScanLine,
  DollarSign,
} from "lucide-vue-next";
import { useMainStore } from "~/stores/index.js";
const { logout } = useAuth();

const store = useMainStore();
</script>

<style scoped></style>
