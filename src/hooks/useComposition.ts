import * as React from "react";

type CompositionHandlers<T extends HTMLElement> = {
  onCompositionStart?: (event: React.CompositionEvent<T>) => void;
  onCompositionEnd?: (event: React.CompositionEvent<T>) => void;
  onKeyDown?: (event: React.KeyboardEvent<T>) => void;
};

/**
 * Wraps composition event handlers so consumers can react to IME composition
 * (used for CJK input methods) without writing the same boilerplate each time.
 */
export function useComposition<T extends HTMLElement>(
  handlers: CompositionHandlers<T> = {},
) {
  const onCompositionStart = React.useCallback(
    (event: React.CompositionEvent<T>) => {
      handlers.onCompositionStart?.(event);
    },
    [handlers.onCompositionStart],
  );

  const onCompositionEnd = React.useCallback(
    (event: React.CompositionEvent<T>) => {
      handlers.onCompositionEnd?.(event);
    },
    [handlers.onCompositionEnd],
  );

  const onKeyDown = React.useCallback(
    (event: React.KeyboardEvent<T>) => {
      handlers.onKeyDown?.(event);
    },
    [handlers.onKeyDown],
  );

  return { onCompositionStart, onCompositionEnd, onKeyDown };
}
