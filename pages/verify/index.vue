<script setup>
import DataTable from "@/components/data-table.vue";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RangeCalendar } from "@/components/ui/range-calendar";
import { cn } from "@/utils";
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
} from "@internationalized/date";
import {
  CalendarIcon,
  ChevronDown,
  Loader2,
  RefreshCcw,
} from "lucide-vue-next";
import { computed, ref } from "vue";
import Button from "~/components/ui/button/Button.vue";
import { useToast } from "@/components/ui/toast/use-toast";
import { useMainStore } from "~/stores/index.js";
import { columns } from "./column";
const { toast } = useToast();
const { $pinia, $axios } = useNuxtApp();
const store = useMainStore($pinia);
const df = new DateFormatter("en-US", {
  dateStyle: "medium",
});
const value = ref({
  start: new CalendarDate(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    new Date().getDate(),
  ).subtract({ days: 30 }),
  end: new CalendarDate(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    new Date().getDate(),
  ),
});
const data = ref([]);
const search = ref("");
const status = ref("review_needed");
const isDialogOpen = ref(false);
const newEmail = ref("");
const isFetching = ref(false);
const tableColumns = ref(
  columns.map((col) => {
    if (col.accessorKey === "actions") {
      return {
        ...col,
        cell: (props) =>
          col.cell({
            ...props,
            $axios,
            invoices: invoices.value,
          }),
      };
    }
    return col;
  }),
);
const visibleColumns = ref(
  localStorage.getItem("humanVisibleColumns")
    ? JSON.parse(localStorage.getItem("humanVisibleColumns"))
    : columns
        .filter(
          (col) =>
            col.accessorKey !== "checkbox" && col.accessorKey !== "actions",
        )
        .map((col) => col.accessorKey),
);

const isLoading = ref(true);
const sources = computed(() => [
  ...new Set(data.value.map((item) => item.source)),
]);
const names = computed(() => [...new Set(data.value.map((item) => item.from))]);

watch(
  () => store.orgDetails,
  async (orgDetails) => {
    isFetching.value = true;
    if (orgDetails?.uid) {
      await fetchData();
    }
    isFetching.value = false;
  },
  { immediate: true, deep: true },
);

const invoices = ref([]);

async function fetchData() {
  isLoading.value = true;
  try {
    const orgId = store.orgDetails.uid;
    const response = await $axios.get(
      `/jobs/invoice/${orgId}?status=review_needed`,
    );
    invoices.value = response.data.jobs.sort(
      (a, b) => b.created_at - a.created_at,
    );
  } catch (error) {
    toast({
      title: "Error",
      description: `${error}`,
      variant: "destructive",
    });
  } finally {
    isLoading.value = false;
  }
}

function addSpaceBeforeCapital(str) {
  return str.replace(/([A-Z])/g, " $1").trim();
}

async function toggleColumn(columnKey) {
  const index = visibleColumns.value.indexOf(columnKey);
  if (index === -1) {
    visibleColumns.value.push(columnKey);
  } else {
    visibleColumns.value.splice(index, 1);
  }
  tableColumns.value = columns
    .map((col) => {
      if (col.accessorKey === "actions") return col;
      return visibleColumns.value.includes(col.accessorKey) ? col : null;
    })
    .filter(Boolean);
  localStorage.setItem(
    "humanVisibleColumns",
    JSON.stringify(visibleColumns.value),
  );
}
</script>

<template>
  <div class="">
    <div
      class="min-h-[calc(100vh-68px)] flex flex-col items-center justify-center"
      v-if="isFetching"
    >
      <loading-icon />
    </div>
    <div class="w-[95%] mx-auto py-8" v-else>
      <div
        class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2"
      >
        <div class="text-center sm:text-start">
          <h2 class="text-2xl font-bold text-[#3D3894]">Human Verification</h2>
          <CardDescription>
            List of invoices that require manual verification
          </CardDescription>
        </div>
      </div>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full"
        :class="{ 'sm:grid-cols-custom': true }"
      >
        <div class="flex flex-col sm:flex-row gap-2 w-full">
          <Input
            v-model="search"
            placeholder="Search emails..."
            class="w-full sm:max-w-sm border-0 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-gray-600"
          />
          <Select v-model="source" class="w-full sm:w-auto">
            <SelectTrigger
              class="w-full sm:w-[180px] border-0 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-gray-600"
            >
              <SelectValue placeholder="Source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="manual">Manual</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="outlook">Outlook</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            @click="fetchData"
            :disabled="isLoading"
            class="border-2 bg-[#FFE600] hover:bg-[#FFE600]/80 border-black px-4 py-2 shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:-translate-y-0.3 transition-all"
          >
            <Loader2
              v-if="isLoading"
              class="w-8 h-8 animate-spin text-[#000]"
            />
            <RefreshCcw v-else class="w-8 h-8 text-[#000]" />
          </Button>
        </div>
        <div class="flex flex-col sm:flex-row items-center gap-2 w-full">
          <Popover class="w-full sm:w-auto">
            <PopoverTrigger as-child>
              <Button
                variant="outline"
                :class="
                  cn(
                    'w-full sm:w-[280px] justify-start text-left font-normal h-10 pl-2 border border-gray-300',
                    !value && 'text-muted-foreground',
                  )
                "
              >
                <CalendarIcon class="mr-2 h-4 w-4 text-[#5558DD]" />
                <template v-if="value.start">
                  <template v-if="value.end">
                    {{ df.format(value.start.toDate(getLocalTimeZone())) }} -
                    {{ df.format(value.end.toDate(getLocalTimeZone())) }}
                  </template>
                  <template v-else>
                    {{ df.format(value.start.toDate(getLocalTimeZone())) }}
                  </template>
                </template>
                <template v-else> Pick a date </template>
              </Button>
            </PopoverTrigger>
            <PopoverContent class="w-auto p-0">
              <RangeCalendar
                v-model="value"
                initial-focus
                :number-of-months="2"
                @update:start-value="(startDate) => (value.start = startDate)"
              />
            </PopoverContent>
          </Popover>

          <DropdownMenu class="w-full sm:w-auto">
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                class="w-full sm:w-auto sm:ml-auto h-10 border-2 border-black px-4 py-1 text-base font-medium uppercase shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:-translate-y-0.3 hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all"
              >
                Columns
                <ChevronDown class="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              class="w-full rounded-none mt-1 border-2 border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)]"
            >
              <DropdownMenuItem
                v-for="column in columns"
                :key="column.accessorKey"
              >
                <div
                  v-if="
                    column.accessorKey !== 'checkbox' &&
                    column.accessorKey !== 'actions'
                  "
                  class="flex items-center space-x-2 capitalize"
                >
                  <Checkbox
                    :id="column.accessorKey"
                    :checked="visibleColumns.includes(column.accessorKey)"
                    @update:checked="toggleColumn(column.accessorKey)"
                    class="checkbox"
                  />
                  <label :for="column.accessorKey">
                    {{ addSpaceBeforeCapital(column.accessorKey) }}</label
                  >
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div class="mt-4">
        <DataTable
          :columns="tableColumns"
          :data="invoices"
          :search="search"
          :status="status"
          :source="source"
          :start="value.start"
          :end="value.end"
        />
      </div>
      <Dialog v-model:open="isDialogOpen">
        <DialogContent
          class="top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
        >
          <DialogHeader>
            <DialogTitle>Add new email</DialogTitle>
          </DialogHeader>
          <div class="py-4">
            <Input
              v-model="newEmail"
              placeholder="email1234@mail.com"
              class="w-full"
            />
          </div>
          <DialogFooter class="flex justify-end gap-2">
            <Button variant="outline" @click="isDialogOpen = false">
              Cancel
            </Button>
            <Button
              class="bg-[#665EF3]"
              @click="
                () => {
                  // Add your email handling logic here
                  isDialogOpen = false;
                }
              "
            >
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    <Toaster />
  </div>
</template>

<style scoped>
:deep(.fixed) {
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.dialog-content) {
  margin: 0;
  max-height: 90vh;
}

.checkbox[data-state="checked"] {
  background-color: #665ef3 !important;
  border-color: #665ef3 !important;
}

.checkbox[data-state="unchecked"] {
  background-color: white !important;
}

.checkbox:hover {
  border-color: #665ef3 !important;
}

@media (min-width: 640px) {
  .sm\:grid-cols-custom {
    grid-template-columns: 2fr 1fr;
  }
}
</style>
