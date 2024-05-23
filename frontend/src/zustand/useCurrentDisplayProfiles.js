import { create } from 'zustand';

const useCurrentDisplayProfiles = create((set, get) => ({
  displayProfiles: {},
  setProfiles: (newProfiles) => set({ displayProfiles: newProfiles }),
  clearProfiles: () => set({ displayProfiles: {} }),
  getProfiles: () => {
    const user = get().displayProfiles;
    console.log('Retrieving user:', user);
    return user;
  },
  // updateNameProfiles: (name) =>
  //   set((state) => ({
  //     Profiles: { ...state.Profiles, name },
  //   })),
}));

export default useCurrentDisplayProfiles;
