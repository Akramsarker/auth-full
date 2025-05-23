<template>
  <div
    class="min-h-[calc(100vh-68px)] flex flex-col items-center justify-center"
  >
    <div v-if="isFetching">
      <loading-icon />
    </div>
    <div v-else-if="review_data.status == 'completed'">
      <div
        class="py-3 pt-6 border-2 border-black bg-white/90 backdrop-blur-sm shadow-[4px_4px_0_0_rgba(167,139,250,0.3)] hover:shadow-[6px_6px_0_0_rgba(167,139,250,0.4)] transition-all duration-300 h-full"
      >
        <CardContent class="flex flex-col items-center space-y-6">
          <svg
            width="100"
            height="100"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="neonGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color: #3b82f6" />
                <stop offset="100%" style="stop-color: #2563eb" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="url(#neonGlow)"
              filter="url(#glow)"
            />
            <path
              d="M40 60L55 75L85 45"
              stroke="white"
              stroke-width="8"
              stroke-linecap="round"
              stroke-linejoin="round"
              filter="url(#glow)"
            />
            <circle
              cx="60"
              cy="60"
              r="52"
              stroke="#2563EB"
              stroke-width="2"
              stroke-dasharray="4 4"
            />
          </svg>
          <div class="text-center space-y-2 max-w-md">
            <h3
              class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-600"
            >
              Already Verified!
            </h3>
            <p class="text-[#4a4949]">
              You have already reviewed this invoice and accepted the one that
              matches your invoice.
            </p>
          </div>
          <div class="space-x-4">
            <NuxtLink
              to="/"
              class="bg-white border-2 uppercase border-black px-4 py-2 text-lg font-medium shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition-all"
            >
              Go to Dashboard
            </NuxtLink>
            <NuxtLink
              to="/verify"
              class="bg-[#FFE600] border-2 uppercase border-black px-4 py-2 text-lg font-medium shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] transition-all"
            >
              Review another invoice
            </NuxtLink>
          </div>
        </CardContent>
      </div>
    </div>
    <div v-else class="p-6 px-6 lg:px-12 mt-8">
      <!-- Header section -->
      <div class="flex items-center justify-center gap-4 mb-8">
        <div class="flex flex-col items-center gap-3 max-w-2xl text-center">
          <h1 class="text-2xl font-bold text-orange-500">Review AI Results</h1>
          <p class="text-[#1F2937]">
            We have found some difference between different AI models. Please
            review the results and accept the one you think is correct.
          </p>
        </div>
      </div>

      <!-- Main content -->
      <div class="flex flex-col lg:flex-row lg:gap-6 gap-4 mx-auto">
        <!-- Left section - Document Preview -->
        <div class="w-full lg:w-[25%]">
          <CardTitle
            class="text-base font-mono font-semibold mb-3 text-[#1F2937]"
            >Invoice Preview</CardTitle
          >
          <div
            class="relative border-2 border-black bg-white/95 backdrop-blur-sm shadow-[4px_4px_0_0_rgba(167,139,250,0.3)] hover:shadow-[6px_6px_0_0_rgba(167,139,250,0.4)] transition-all duration-300 h-[500px]"
          >
            <VuePdfEmbed
              v-if="isPdf"
              :source="review_data.file_url"
              class="w-full h-full overflow-y-auto"
            />
            <img
              v-else
              :src="review_data.file_url"
              alt="Invoice Preview"
              class="w-full h-full object-cover"
            />
            <button
              @click="showFullImage = true"
              class="absolute bottom-3 right-3 p-1.5 bg-white border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all"
              aria-label="View full image"
            >
              <Maximize2 class="w-4 h-4 text-[#2563EB]" />
            </button>
          </div>
        </div>

        <!-- AI Results section -->
        <div class="flex-1 grid lg:grid-cols-2 gap-4">
          <div
            v-for="(summary, index) in review_data.summaries"
            :key="summary.uid"
          >
            <Card
              class="h-full border-2 border-black bg-white/95 backdrop-blur-sm shadow-[4px_4px_0_0_rgba(167,139,250,0.3)] hover:shadow-[6px_6px_0_0_rgba(167,139,250,0.4)] transition-all duration-300 p-4"
            >
              <CardTitle
                class="text-base font-mono font-semibold mb-3 text-[#1F2937]"
                >AI Model {{ index + 1 }}
              </CardTitle>

              <HumanVerification :invoiceData="summary" class="mb-4" />
              <button
                @click="acceptInvoice(review_data.uid, summary.uid)"
                :class="`w-full flex items-center justify-center border-2 border-black px-4 py-1 text-base font-medium uppercase shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:-translate-y-0.3 hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all ${getButtonColor(index)}`"
                :disabled="isLoading[summary.uid]"
              >
                <Loader2
                  v-if="isLoading[summary.uid]"
                  class="w-4 h-4 animate-spin mr-2"
                  aria-hidden="true"
                />
                <span>{{
                  isLoading[summary.uid] ? "Accepting..." : "Accept this one"
                }}</span>
              </button>
            </Card>
          </div>
        </div>
      </div>

      <!-- Modal -->
      <div
        v-if="showFullImage"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        @click="closeModal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div
          class="w-[95vw] max-w-5xl border-2 border-black bg-white/95 p-4 shadow-[4px_4px_0_0_rgba(167,139,250,0.3)]"
          @click.stop
        >
          <div class="flex justify-between mb-2">
            <h2 id="modal-title" class="font-mono text-black">File preview</h2>
            <Button
              class="p-1 border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all"
              @click="closeModal"
              aria-label="Close preview"
            >
              <X class="w-6 h-6 text-white font-bold" aria-hidden="true" />
            </Button>
          </div>
          <div
            class="bg-white border-2 border-black h-[80vh] relative overflow-y-auto"
          >
            <div
              v-if="isPdf && isLoadingPdf"
              class="absolute inset-0 flex items-center justify-center"
              role="status"
              aria-label="Loading PDF"
            >
              <Loader2
                class="w-8 h-8 animate-spin text-[#2563EB]"
                aria-hidden="true"
              />
            </div>
            <img
              v-if="!isPdf"
              class="w-full h-full object-contain"
              :src="review_data.file_url"
              alt="Full Invoice"
            />
            <VuePdfEmbed
              v-else
              :source="review_data.file_url"
              class="w-full h-full"
              @rendered="isLoadingPdf = false"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from "@/components/ui/toast/use-toast";
import { Loader2, Maximize2, X } from "lucide-vue-next";
import VuePdfEmbed from "vue-pdf-embed";
import Button from "~/components/ui/button/Button.vue";
import { useMainStore } from "~/stores/index.js";

const { toast } = useToast();
const { $pinia } = useNuxtApp();

const store = useMainStore($pinia);
const { $axios } = useNuxtApp();
const route = useRoute();
const router = useRouter();

const jobId = route.params.id;
const showFullImage = ref(false);
const imageDeleted = ref(false);
const isFetching = ref(false);
const orgId = store?.orgDetails?.uid;
const isPdf = computed(() =>
  review_data.value.file_url?.toLowerCase().includes(".pdf"),
);
const isLoading = ref({});

const buttonColors = [
  "bg-[#2b71ff] text-white",
  "bg-[#A7F3D0]",
  "bg-[#FECACA]",
  "bg-[#FEF08A]",
  "bg-[#D8B4FE]",
  "bg-[#BAE6FD]",
];

const getButtonColor = (index) => {
  return buttonColors[index % buttonColors.length];
};

onMounted(async () => {
  if (store.userDetails.org_id) {
    await fetchData();
  }
});

const closeModal = () => {
  showFullImage.value = false;
  imageDeleted.value = false;
};

const review_data = ref({});

async function fetchData() {
  isFetching.value = true;
  const response = await $axios.get(`/jobs/invoice/${orgId}/${jobId}`);

  review_data.value = response.data.job;
  isFetching.value = false;
}
async function acceptInvoice(job_id, summary_id) {
  isLoading.value[summary_id] = true;
  try {
    const res = await $axios.get(
      `/jobs/verify/${orgId}/${job_id}/${summary_id}`,
    );

    toast({
      title: "Invoice accepted",
      description: "Invoice accepted successfully",
      variant: "success",
    });
    await store.getInvoicesForReview(orgId);
    router.push(`/invoice/${res.data.invoice.uid}`);
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to accept invoice",
      variant: "error",
    });
  } finally {
    isLoading.value[summary_id] = false;
  }
}
</script>
