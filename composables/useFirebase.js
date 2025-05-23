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
  apiKey: "AIzaSyAN538rB8oQW1FmT5eji9syvg-nsFoPchM",
  authDomain: "auth-test-2070d.firebaseapp.com",
  projectId: "auth-test-2070d",
  storageBucket: "auth-test-2070d.firebasestorage.app",
  messagingSenderId: "469847261926",
  appId: "1:469847261926:web:b8458e6a52139668127127",
  measurementId: "G-HRT677KV3W",
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
        55 * 60 * 1000
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
      { immediate: true }
    );
  });

  // Function to log events
  function eventLog(event_name, payload) {
    logEvent(analytics, event_name, payload);
  }

  return { auth, provider, storage, eventLog, db };
}
