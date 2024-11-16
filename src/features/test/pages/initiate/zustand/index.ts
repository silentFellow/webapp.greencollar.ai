import { Crop, kiosk, Taram, User } from "@/types";
import { create } from "zustand";

interface ScanFormState {
  selectedCrop: Crop | undefined;
  selectedKiosk: kiosk | undefined;
  selectedTaram: Taram | undefined;
  verifiedUser: User | undefined;
  flow: {
    userVerified: boolean;
    kioskSelected: boolean;
  };
  setSelectedCrop: (selectedCrop: Crop) => void;
  setSelectedKiosk: (selectedKiosk: kiosk) => void;
  setSelectedTaram: (selectedKiosk: Taram) => void;
  setVerifiedUser: (verifiedUser: User) => void;
  setFlow: (key: keyof ScanFormState["flow"], value: boolean) => void;

  reset: () => void;
}

export const useScanFormStore = create<ScanFormState>(set => ({
  selectedCrop: undefined,
  selectedKiosk: undefined,
  selectedTaram: undefined,
  verifiedUser: undefined,

  flow: {
    userVerified: false,
    kioskSelected: false,
  },

  setSelectedCrop: (selectedCrop: Crop) => set({ selectedCrop }),
  setSelectedKiosk: (selectedKiosk: kiosk) => set({ selectedKiosk }),
  setSelectedTaram: (selectedTaram: Taram) => set({ selectedTaram }),
  setVerifiedUser: (verifiedUser: User) => set({ verifiedUser }),
  setFlow: (key: keyof ScanFormState["flow"], value: boolean) =>
    set(state => ({ flow: { ...state.flow, [key]: value } })),

  reset: () =>
    set({
      selectedCrop: undefined,
      selectedKiosk: undefined,
      verifiedUser: undefined,

      flow: {
        userVerified: false,
        kioskSelected: false,
      },
    }),
}));
