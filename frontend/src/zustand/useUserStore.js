import { create } from 'zustand';

/**
 * @typedef {Object} CurrentUser
 * @property {number} id
 * @property {string} name
 * @property {string} [email]
 */

/**
 * Provides a Zustand store for managing the current user's state.
 * Allows for setting, updating, and clearing the current user information.
 */
const useUserStore = create((set, get) => ({
  currentUser: {},
  setCurrentUser: (userDetails) => set({ currentUser: userDetails }),
  clearCurrentUser: () => set({ currentUser: { name: '', email: '' } }),
  getCurrentUser: () => {
    const user = get().currentUser;
    console.log('Retrieving user:', user);
    return user;
  },
  // updateNameCurrentUser: (name) =>
  //   set((state) => ({
  //     currentUser: { ...state.currentUser, name },
  //   })),
}));

export default useUserStore;
