import type { ReactNode } from "react";

import type { StorefrontThemeTokens } from "@/lib/storefront/theme";
import { themeToCssVars } from "@/lib/storefront/theme";

interface Props {
  theme: StorefrontThemeTokens;
  children: ReactNode;
}

export function StorefrontThemeProvider({ theme, children }: Props) {
  const cssVars = themeToCssVars(theme);

  return (
    <div
      style={cssVars}
      className="storefront-shell min-h-screen bg-(--store-bg) text-(--store-text)"
    >
      {children}
    </div>
  );
}
