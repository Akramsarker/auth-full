import { useMainStore } from "~/stores/index.js";

import {
  applyActionCode,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updatePassword,
  verifyPasswordResetCode,
} from "firebase/auth";

export default function useAuth() {
  const { $pinia } = useNuxtApp();
  const store = useMainStore($pinia);
  const { auth, provider, eventLog } = useFirebase();

  async function signInWithGoogle() {
    const userCredential = await signInWithPopup(auth, provider());
    const user = userCredential.user;
    console.log(user, "user sign in with google");
    const response = await store.getUserDetails(user.email);
    console.log(response, "response");
    if (!response) {
      const payload = {
        uid: user.uid,
        email: user.email,
        display_name: user.displayName,
        is_verified: true,
        photo_url: user.photoURL,
      };
      store.setUser(user);
      console.log(payload, "payload post user details");
      await store.postUserDetails(payload);
      console.log("navigate to onboarding after post user details");
      location.href = "/onboarding";
    } else if (!response.org_id) {
      console.log("navigate to onboarding");
      location.href = "/onboarding";
    }
  }
  async function signUpWithEmail(email, password, display_name) {
    const response = await store.getUserDetails(email);

    if (response) {
      throw new Error(
        "An user with this email already exists. Please Sign In or use a different email.",
      );
    } else {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
        display_name,
      ).catch((e) => {
        if (e.message === "Firebase: Error (auth/email-already-in-use).") {
          throw new Error(
            "An user with this email already exists. Please Sign In or use a different email.",
          );
        } else {
          throw new Error(e.message);
        }
      });
      const user = userCredential.user;
      console.log(user, "user");
      await sendEmailVerification(auth.currentUser);

      const payload = {
        uid: user.uid,
        email: user.email,
        display_name: display_name,
        is_verified: false,
        photo_url: user.providerData[0].photoURL,
      };
      store.setUser(user);
      store.postUserDetails(payload);
    }
  }
  async function signInWithEmail(payload) {
    await signInWithEmailAndPassword(auth, payload.email, payload.password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        store.setUser(user);

        const userDetails = await store.getUserDetails(user.email);

        if (userDetails.is_verified) {
          navigateTo("/");
        } else {
          await sendEmailVerification(auth.currentUser);
          throw new Error(
            "You need to verify your email first. We have sent you a verification email to your email address.",
          );
        }
      })
      .catch((e) => {
        console.error(e.message);
        if (e.message === "Firebase: Error (auth/invalid-credential).") {
          throw new Error(
            "Invalid credentials. Please use correct email and password and try again.",
          );
        } else {
          throw new Error(e.message);
        }
      });
  }
  async function forgetPassword(email) {
    await sendPasswordResetEmail(auth, email);
  }
  async function verifyEmail(actionCode) {
    await applyActionCode(auth, actionCode);
  }
  async function setNewPassword(payload) {
    const password = payload.password;
    const actionCode = payload.oobCode;
    await verifyPasswordResetCode(auth, actionCode).then((email) => {
      const accountEmail = email;
      confirmPasswordReset(auth, actionCode, password);
    });
  }
  async function changePassword(newPassword) {
    const user = auth.currentUser;
    await updatePassword(user, newPassword);
  }

  function logout() {
    auth
      .signOut()
      .then(() => {
        store.setUser(null);
        store.setUserDetails(null);
        return navigateTo("/");
      })
      .catch((e) => {
        console.error(e);
      });
  }

  return {
    signInWithGoogle,
    logout,
    signUpWithEmail,
    signInWithEmail,
    forgetPassword,
    setNewPassword,
    changePassword,
    verifyEmail,
  };
}
