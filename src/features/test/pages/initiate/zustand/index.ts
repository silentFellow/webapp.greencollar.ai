import { Crop, kiosk, User } from "@/types";
import { create } from "zustand";

interface ScanFormState {
  selectedCrop: Crop | undefined;
  selectedKiosk: kiosk | undefined;
  verifiedUser: User | undefined;
  flow: {
    userVerified: boolean;
    kioskSelected: boolean;
  };
  setSelectedCrop: (selectedCrop: Crop) => void;
  setSelectedKiosk: (selectedKiosk: kiosk) => void;
  setVerifiedUser: (verifiedUser: User) => void;
  setFlow: (key: keyof ScanFormState["flow"], value: boolean) => void;

  reset: () => void;
}

export const useScanFormStore = create<ScanFormState>(set => ({
  selectedCrop: undefined,
  selectedKiosk: undefined,
  verifiedUser: undefined,

  flow: {
    userVerified: false,
    kioskSelected: false,
  },

  setSelectedCrop: (selectedCrop: Crop) => set({ selectedCrop }),
  setSelectedKiosk: (selectedKiosk: kiosk) => set({ selectedKiosk }),
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
