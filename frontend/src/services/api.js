import apiClient from './client';

// Performs login operation using the provided credentials.
export const login = async (data) => {
  return await apiClient.post('/auth/login', data);
};

// Performs login operation using the provided credentials.
export const sendOtp = async (data) => {
  return await apiClient.post('/otp/send-otp', data);
};

export const verifyOtp = async (data) => {
  return await apiClient.post('/otp/verify-otp', data);
};

// Registers a new user with the given data.
export const register = async (data) => {
  try {
    return await apiClient.post('/auth/register', data);
  } catch (e) {
    return { error: true, e };
  }
};

export const findProfiles = async (data) => {
  try {
    return await apiClient.get(`/find/profiles?id=${data.id}`);
  } catch (e) {
    return { error: true, e };
  }
};

export const sendInvitationRequestAPI = async (data) => {
  try {
    return await apiClient.post(`/friend-invitation/invite`, data);
  } catch (e) {
    return { error: true, e };
  }
};

export const getPendingFriendInvitesAPI = async (data) => {
  try {
    return await apiClient.get(`/friend-invitation/invite?id=${data.id}`);
  } catch (e) {
    return { error: true, e };
  }
};

export const rejectFriendInvitationAPI = async (data) => {
  try {
    return await apiClient.post(`/friend-invitation/reject`, data);
  } catch (e) {
    return { error: true, e };
  }
};

export const acceptFriendInvitationAPI = async (data) => {
  try {
    return await apiClient.post(`/friend-invitation/accept`, data);
  } catch (e) {
    return { error: true, e };
  }
};
