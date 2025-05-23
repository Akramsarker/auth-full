import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

import {
  getAnalytics,
  logEvent,
  setUserId,
  isSupported,
} from "firebase/analytics";
import { useMainStore } from "~/stores/index.js";
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUem8hFDM6aNegp2u9DfNdG1HYzvVvGKc",
  authDomain: "invoice-agent-ai.firebaseapp.com",
  projectId: "invoice-agent-ai",
  storageBucket: "invoice-agent-ai.firebasestorage.app",
  messagingSenderId: "836251409401",
  appId: "1:836251409401:web:748a99ff6f4bd2ee42fb28",
  measurementId: "G-SNT6YNGW22",
};

export default function () {
  const { $axios, $pinia } = useNuxtApp();
  const store = useMainStore($pinia);

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const storage = getStorage(app);
  const db = getFirestore(app);

  let analytics;
  let tokenRefreshInterval;

  // Check if Firebase Analytics is supported
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    } else {
      console.log("Firebase Analytics is not supported in this environment");
    }
  });

  const provider = () => new GoogleAuthProvider(app);

  auth.onAuthStateChanged(async (user) => {
    if (user) {
      // Initialize or update the user in the store
      if (!store.user) {
        store.setUser(user);
        const userDetails = await store.getUserDetails();
        console.log(userDetails, "userDetails");
        console.log(userDetails, "userDetails?.org_id");

        if (userDetails?.org_id) {
          const orgDetails = await store.getOrgDetails(userDetails.org_id);
          console.log(orgDetails, "orgDetails");
        } else if (!userDetails?.org_id) {
          console.log("navigate to onboarding");
          navigateTo("/onboarding");
        }

        if (analytics) {
          setUserId(analytics, user.uid);
        }
      }

      // Set the ID token in Axios headers immediately
      refreshAndSetIdToken();

      // Set up or refresh the token refresh interval
      clearInterval(tokenRefreshInterval); // Clear existing interval to avoid duplicates
      tokenRefreshInterval = setInterval(
        () => {
          refreshAndSetIdToken();
        },
        55 * 60 * 1000,
      ); // Refresh token every 55 minutes
    } else {
      // User is signed out, clear the interval and reset the store
      clearInterval(tokenRefreshInterval);
      store.setUser(null);
      store.setUserDetails(null);
      store.setUserLoading(false);
      // Optionally, clear the Authorization header
      $axios.defaults.headers.common["Authorization"] = "";
    }
  });

  async function refreshAndSetIdToken() {
    try {
      const idToken = await auth.currentUser.getIdToken(true); // Force token refresh
      $axios.defaults.headers.common["Authorization"] = `Bearer ${idToken}`;
    } catch (error) {
      console.error("Error refreshing ID token:", error);
      // Handle token refresh errors (e.g., by prompting the user to re-authenticate)
    }
  }

  onMounted(() => {
    const route = useRoute();

    watch(
      route,
      (to) => {
        if (analytics) {
          logEvent(analytics, "page_view", { page_path: to.path });
        }
      },
      { immediate: true },
    );
  });

  // Function to log events
  function eventLog(event_name, payload) {
    logEvent(analytics, event_name, payload);
  }

  return { auth, provider, storage, eventLog, db };
}
