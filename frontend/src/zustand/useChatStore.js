import { create } from 'zustand';

const useChatStore = create((set, get) => ({
  chosenChatDetails: null,
  chatType: null,
  messages: [],
  setChosenChatDetails: (data) =>
    set({
      chosenChatDetails: data.chosenChatDetails,
      chatType: data.chatType,
      messages: data.messages,
    }),
}));
