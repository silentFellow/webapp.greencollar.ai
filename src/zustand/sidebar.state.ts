import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SidebarState<T> {
  state: T;

  setState: (state: keyof T, value: boolean) => void;
  toggleState: (state: keyof T) => void;
}

export type SidebarStateKeys = {
  general: boolean;
  settings: boolean;
  tools: boolean;
};

export const useSidebarStore = create<SidebarState<SidebarStateKeys>>()(
  persist(
    set => ({
      state: {
        general: true,
        settings: false,
        tools: false,
      },

      setState: (key, value) =>
        set(state => ({
          state: {
            ...state.state,
            [key]: value,
          },
        })),

      toggleState: key =>
        set(state => ({
          state: {
            ...state.state,
            [key]: !state.state[key],
          },
        })),
    }),
    {
      name: "sidebar-state",
    },
  ),
);
