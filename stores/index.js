import { defineStore } from "pinia";

export const useMainStore = defineStore("main", () => {
  const { $axios } = useNuxtApp();
  const config = useRuntimeConfig();
  const baseURL = config.public.baseURL;
  const user = ref(null);
  const userDetails = ref(null);
  const userLoading = ref(true);
  const updateLoading = ref(false);

  function setUser(payload) {
    user.value = payload;
  }
  function setIsActive(payload) {
    isActive.value = payload;
  }
  function setUserLoading(payload) {
    userLoading.value = payload;
  }
  function setUserDetails(payload) {
    userDetails.value = payload;
  }

  function setUpdateUserDetails(payload) {
    userDetails.value = payload;
  }

  async function postUserDetails(payload) {
    try {
      const { data } = await $axios.post(`${baseURL}/person`, payload);
      userDetails.value = data.person;
      return data.person;
    } catch (e) {
      throw e;
    }
  }

  async function getUserDetails(email) {
    try {
      userLoading.value = true;
      const finalEmail = email || user.value.email;
      const { data } = await $axios.get(
        `${baseURL}/person?email=${finalEmail}`
      );
      setUserDetails(data.person);
      return data.person;
    } catch (e) {
      throw e;
    } finally {
      userLoading.value = false;
    }
  }

  async function updateUserDetails(payload) {
    try {
      updateLoading.value = true;

      if (!userDetails.value) {
        await getUserDetails();
      }

      const { data } = await $axios.put(
        `${baseURL}/person/${userDetails.value.uid}`,
        payload
      );

      setUserDetails(data.person);
      return data.person;
    } catch (e) {
      throw e;
    } finally {
      updateLoading.value = false;
    }
  }
  function decreaseCredit(payload) {
    userDetails.value.credit -= payload;
  }

  return {
    user,
    userDetails,
    userLoading,
    updateLoading,
    setUser,
    setUserLoading,
    setUserDetails,
    getUserDetails,
    postUserDetails,
    updateUserDetails,
    decreaseCredit,
  };
});
