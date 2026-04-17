import { createContext, useContext } from "react";

interface SlideLabelContextValue {
  label?: string;
  onRenameRequest: (currentLabel: string) => void;
}

const SlideLabelContext = createContext<SlideLabelContextValue>({
  onRenameRequest: () => {},
});

export function useSlideLabelContext() {
  return useContext(SlideLabelContext);
}

export { SlideLabelContext };
