import { NuxtLink } from "#components";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/toast/use-toast";
import { Share, Trash2 } from "lucide-vue-next";
import { h, ref } from "vue";
const { toast } = useToast();
const showDeleteConfirm = ref(false);
const itemToDelete = ref(null);
const showShareDialog = ref(false);
const currentItem = ref(null);
const shareConfirmOpen = ref(false);
export const selectedInvoiceForDelete = ref(null);
async function handleDelete(uid, $axios) {
  selectedInvoiceForDelete.value = uid;

  try {
    const res = await $axios.delete(`/jobs/invoice/${uid}`);
    if (res.data.success) {
      toast({
        title: "Item deleted",
        description: "The item has been successfully deleted.",
        variant: "success",
      });
    }
  } catch (error) {
    toast({
      title: "Error",
      description: `Failed to delete item. ${error.message || ""}`,
      variant: "destructive",
    });
  } finally {
  }
}

const handleShare = async () => {
  try {
    await navigator.clipboard.writeText(
      `${window.location.origin}/verify/${currentItem.value.uid}`,
    );
    shareConfirmOpen.value = false;
    showShareDialog.value = false;
    toast({
      title: "Success",
      description: "Item link has been copied to clipboard",
    });
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to copy link",
      variant: "destructive",
    });
  }
};
export const columns = [
  {
    accessorKey: "checkbox",
    header: ({ table }) =>
      h("div", { class: "pr-0 w-[20px]" }, [
        h("input", {
          type: "checkbox",
          checked: table.getIsAllRowsSelected(),
          onChange: (e) => table.toggleAllRowsSelected(!!e.target.checked),
        }),
      ]),
    cell: ({ row }) =>
      h("div", { class: "pr-0 w-[20px]" }, [
        h("input", {
          type: "checkbox",
          checked: row.getIsSelected(),
          onChange: (e) => row.toggleSelected(!!e.target.checked),
        }),
      ]),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "uid",
    header: () => h("div", { class: "w-[100px] truncate" }, "UID"),
    cell: ({ row }) => h("div", {}, row.getValue("uid")),
    enableHiding: true,
  },
  {
    accessorKey: "created_at",
    header: () => h("div", { class: "" }, "Date"),
    cell: ({ row }) => {
      const date = new Date(Number(row.getValue("created_at")));
      const now = new Date();
      const diff = now.getTime() - date.getTime();

      let displayDate;
      if (diff < 1000 * 60) {
        displayDate = "just now";
      } else if (diff < 1000 * 60 * 60) {
        displayDate = `${Math.floor(diff / (1000 * 60))} minutes ago`;
      } else if (diff < 1000 * 60 * 60 * 24) {
        displayDate = `${Math.floor(diff / (1000 * 60 * 60))} hours ago`;
      } else {
        displayDate = date.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });
      }

      return h("div", {}, displayDate);
    },
    enableHiding: true,
  },
  {
    accessorKey: "source",
    header: () => h("div", { class: "" }, "Source"),
    cell: ({ row }) => {
      const source = row.getValue("source");
      const styles =
        {
          Gmail: {
            border: "#FF4D4D",
            bg: "#FFF6F6",
          },
          Outlook: {
            border: "#8FDFFF",
            bg: "#EAF9FF",
          },
          manual: {
            border: "#D269FF",
            bg: "#FDF8FF",
          },
        }[source] || {};

      return h(
        "div",
        {
          class: `inline-flex px-2 py-1  text-xs font-medium capitalize ${
            source === "manual"
              ? "bg-slate-100 text-slate-800"
              : "bg-blue-100 text-blue-800"
          }`,
          style: {
            color: styles.border,
            backgroundColor: styles.bg,
            borderWidth: "1px",
            borderColor: styles.border,
          },
        },
        source,
      );
    },
    enableHiding: true,
  },
  {
    accessorKey: "status",
    header: () => h("div", { class: "" }, "Status"),
    cell: ({ row }) => {
      const status = row
        .getValue("status")
        .replace(/_/g, " ")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      return h(
        "div",
        {
          class:
            "border border-yellow-500 inline-flex px-2 py-1 text-xs font-medium capitalize text-yellow-500",
        },
        status,
      );
    },
    enableHiding: true,
  },
  {
    accessorKey: "actions",
    header: () => h("div", { class: "text-center" }, "Actions"),
    cell: ({ row, $axios, invoices }) => {
      return h("div", { class: "flex gap-2 justify-end" }, [
        h(
          NuxtLink,
          {
            to: `/verify/${row.original.uid}`,
            class:
              "text-blue-600 bg-blue-50 hover:bg-blue-100 flex items-center justify-center px-3 rounded-md text-xs border border-blue-500",
          },
          "Verify",
        ),
        h(
          AlertDialog,
          { modelValue: shareConfirmOpen.value },
          {
            default: () => [
              h(
                AlertDialogTrigger,
                {
                  class:
                    "flex items-center justify-center p-2 text-gray-700 hover:text-gray-900 bg-gray-100 border border-gray-300 rounded",
                  onClick: (e) => {
                    e.stopPropagation();
                    shareConfirmOpen.value = true;
                    currentItem.value = row.original;
                  },
                },
                h(Share, { class: "h-4 w-4" }),
              ),
              h(
                AlertDialogContent,
                {
                  class:
                    "w-full px-4 py-6 rounded-lg border-2 border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)]",
                },
                {
                  default: () => [
                    h(
                      AlertDialogHeader,
                      {},
                      {
                        default: () => [
                          h(
                            AlertDialogTitle,
                            { class: "text-lg font-bold text-[#3D3894]" },
                            "Share Item",
                          ),
                          h(
                            AlertDialogDescription,
                            { class: "text-base text-muted-foreground" },
                            "Are you sure you want to copy this item link to your clipboard?",
                          ),
                        ],
                      },
                    ),
                    h(
                      AlertDialogFooter,
                      { class: "flex justify-end gap-2" },
                      {
                        default: () => [
                          h(
                            AlertDialogCancel,
                            {
                              onClick: () => (shareConfirmOpen.value = false),
                              class:
                                "bg-gray-200 text-gray-700 border-2 border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)] px-4 py-2 rounded hover:bg-gray-300 transition-all",
                            },
                            "Cancel",
                          ),
                          h(
                            AlertDialogAction,
                            {
                              onClick: () => handleShare(),
                              class:
                                "bg-blue-600 text-white border-2 border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)] px-4 py-2 rounded hover:bg-blue-700 transition-all",
                            },
                            "Copy Link",
                          ),
                        ],
                      },
                    ),
                  ],
                },
              ),
            ],
          },
        ),
        h(
          AlertDialog,
          { modelValue: showDeleteConfirm.value },
          {
            default: () => [
              h(
                AlertDialogTrigger,
                {
                  class:
                    "flex items-center justify-center p-2 text-red-700 hover:text-red-800 bg-red-100 border border-red-300 rounded",
                  onClick: (e) => {
                    e.stopPropagation();
                    showDeleteConfirm.value = true;
                    itemToDelete.value = row.original.uid;
                  },
                },
                h(Trash2, { class: "h-4 w-4" }),
              ),
              h(
                AlertDialogContent,
                {
                  class:
                    "w-full px-4 py-6 rounded-lg border-2 border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)]",
                },
                {
                  default: () => [
                    h(
                      AlertDialogHeader,
                      {},
                      {
                        default: () => [
                          h(
                            AlertDialogTitle,
                            { class: "text-lg font-bold text-[#3D3894]" },
                            "Are you sure?",
                          ),
                          h(
                            AlertDialogDescription,
                            { class: "text-base text-muted-foreground" },
                            "This action cannot be undone. This will permanently delete the item.",
                          ),
                        ],
                      },
                    ),
                    h(
                      AlertDialogFooter,
                      { class: "flex justify-end gap-2" },
                      {
                        default: () => [
                          h(
                            AlertDialogCancel,
                            {
                              class:
                                "bg-gray-200 text-gray-700 border-2 border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)] px-4 py-2 rounded hover:bg-gray-300 transition-all",
                            },
                            "Cancel",
                          ),
                          h(
                            AlertDialogAction,
                            {
                              onClick: () => {
                                if ($axios) {
                                  handleDelete(
                                    itemToDelete.value,
                                    $axios,
                                    invoices,
                                  );
                                }
                              },
                              class:
                                "bg-red-600 text-white border-2 border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)] px-4 py-2 rounded hover:bg-red-700 transition-all",
                            },
                            "Delete",
                          ),
                        ],
                      },
                    ),
                  ],
                },
              ),
            ],
          },
        ),
      ]);
    },
  },
];
