import * as React from "react";

export type DialogCompositionContextValue = {
  isComposing: () => boolean;
  setComposing: (composing: boolean) => void;
  justEndedComposing: () => boolean;
  markCompositionEnd: () => void;
};

export const DialogCompositionContext =
  React.createContext<DialogCompositionContextValue>({
    isComposing: () => false,
    setComposing: () => {},
    justEndedComposing: () => false,
    markCompositionEnd: () => {},
  });

export function useDialogComposition() {
  return React.useContext(DialogCompositionContext);
}
