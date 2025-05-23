import { defineStore } from "pinia";

export const useMainStore = defineStore("main", () => {
  const { $axios } = useNuxtApp();
  const config = useRuntimeConfig();
  const baseURL = config.public.baseURL;
  const user = ref(null);
  const userDetails = ref(null);
  const orgDetails = ref(null);
  const userLoading = ref(true);
  const updateLoading = ref(false);
  const orgLoading = ref(false);
  const duplicatesLength = ref(0);
  const duplicatesLoading = ref(false);
  const categories = ref([]);
  const categoriesLoading = ref(false);
  const isReviewLoading = ref(false);
  const humanReviewLength = ref(0);

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
        `${baseURL}/person?email=${finalEmail}`,
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
        payload,
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

  function setOrgDetails(details) {
    orgDetails.value = details;
  }

  async function getOrgDetails(org_id) {
    try {
      orgLoading.value = true;
      const { data } = await $axios.get(`${baseURL}/org/${org_id}`);
      setOrgDetails(data.org);
      getInvoicesForReview(org_id);
      getDuplicatesLength(org_id);
      getCategories(org_id);
      return data;
    } catch (e) {
      throw e;
    } finally {
      orgLoading.value = false;
    }
  }

  async function createOrg(payload) {
    try {
      orgLoading.value = true;
      if (userDetails.value.is_verified) {
        const { data } = await $axios.post(`${baseURL}/org`, payload);
        setOrgDetails(data.org);
        return data;
      } else {
        throw new Error(
          "Please verify your email address to create an organization. A verification email has been sent to your inbox.",
        );
      }
    } catch (e) {
      throw e;
    } finally {
      orgLoading.value = false;
    }
  }

  async function getCategories(org_id) {
    try {
      categoriesLoading.value = true;

      const { data } = await $axios.get(`${baseURL}/categories/${org_id}`);
      categories.value = data.data;
      return data.data;
    } catch (error) {
      throw error;
    } finally {
      categoriesLoading.value = false;
    }
  }

  async function getDuplicatesLength(org_id) {
    try {
      duplicatesLoading.value = true;

      const { data } = await $axios.get(
        `${baseURL}/invoices/duplicates/org/${org_id}`,
      );
      duplicatesLength.value = data.invoices.length;

      return data.invoices.length;
    } catch (error) {
      throw error;
    } finally {
      duplicatesLoading.value = false;
    }
  }

  async function getInvoicesForReview(org_id) {
    try {
      isReviewLoading.value = true;
      const response = await $axios.get(
        `/jobs/invoice/${org_id}?status=review_needed`,
      );

      humanReviewLength.value = response.data.jobs.length;
      return response;
    } catch (error) {
      throw error;
    } finally {
      isReviewLoading.value = false;
    }
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
    orgDetails,
    orgLoading,
    createOrg,
    getOrgDetails,
    categories,
    categoriesLoading,
    getCategories,
    getDuplicatesLength,
    getInvoicesForReview,
    duplicatesLength,
    humanReviewLength,
  };
});
