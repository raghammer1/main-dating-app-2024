import { create } from 'zustand';

const useCurrentDisplayProfiles = create((set, get) => ({
  displayProfiles: [],
  setProfiles: (newProfiles) => set({ displayProfiles: newProfiles }), // Correctly set new profiles
  clearProfiles: () => set({ displayProfiles: [] }), // Ensure this clears to an empty array
  popTopProfile: () =>
    set((state) => ({ displayProfiles: state.displayProfiles.slice(1) })),
  // getProfiles: () => {
  //   const profiles = get().displayProfiles;
  //   console.log('Retrieving profiles:', profiles);
  //   return profiles;
  // },
  // popTopProfile: () => {
  //   const profiles = get().displayProfiles;
  //   console.log('PROFILE NOW: ', profiles);
  //   if (!Array.isArray(profiles) || profiles.length === 0) return null; // Check if profiles is an array and not empty
  //   const topProfile = profiles.shift(); // Remove the first profile
  //   console.log('PROFILE After: ', profiles);
  //   set({ displayProfiles: profiles });
  //   return topProfile;
  // },
}));

export default useCurrentDisplayProfiles;
