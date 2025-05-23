export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      title: "InvoiceAgent.ai | Ai based invoice data extract application",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content:
            "Streamline your invoice processing with InvoiceAgent.ai's AI-powered data extraction. Automatically extract and organize invoice data from emails, Outlook, and uploaded documents. Save time and reduce manual data entry with intelligent invoice processing.",
        },
        {
          property: "og:url",
          content: "https://app.invoiceagent.ai",
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:title",
          content: "InvoiceAgent.ai | AI Invoice Data Extraction Tool",
        },
        {
          property: "og:description",
          content:
            "Streamline your invoice processing with InvoiceAgent.ai's AI-powered data extraction. Automatically extract and organize invoice data from emails, Outlook, and uploaded documents. Save time and reduce manual data entry with intelligent invoice processing.",
        },
        {
          property: "og:image",
          content: "/app-cover.webp",
        },
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          name: "twitter:domain",
          content: "https://invoiceagent.ai/",
        },
        {
          name: "twitter:title",
          content: "InvoiceAgent.ai | AI Invoice Data Extraction Tool",
        },
        {
          name: "twitter:description",
          content:
            "Streamline your invoice processing with InvoiceAgent.ai's AI-powered data extraction. Automatically extract and organize invoice data from emails, Outlook, and uploaded documents. Save time and reduce manual data entry with intelligent invoice processing.",
        },
        {
          name: "twitter:image",
          content: "/app-cover.webp",
        },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [
        {
          rel: "icon",
          type: "image/svg+xml",
          href: "/favicon.svg",
        },
      ],
      __dangerouslyDisableSanitizers: ["script"],
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@nuxtjs/sitemap",
    "@nuxtjs/color-mode",
    "shadcn-nuxt",
  ],
  shadcn: {
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  css: ["~/static/styles/global.css", "~/static/styles/button.css"],
  site: {
    url: "",
  },
  colorMode: {
    // Options here
    preference: "system", // default value
    fallback: "light", // default value
    classSuffix: "", // default value
    classPrefix: "", // default value
  },
  pinia: {
    autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
  },
  plugins: [],
  runtimeConfig: {
    public: {
      baseURL: process.env.VITE_BASE_URL,
    },
  },
  experimental: {
    appManifest: false,
  },
  compatibilityDate: "2024-11-20",
});
