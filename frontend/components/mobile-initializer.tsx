"use client";

import { useEffect } from "react";
import { StatusBar, Style } from "@capacitor/status-bar";
import { Capacitor } from "@capacitor/core";

export function MobileInitializer() {
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      const initializeStatusBar = async () => {
        try {
          await StatusBar.setStyle({ style: Style.Light });
          await StatusBar.setOverlaysWebView({ overlay: true });
        } catch (e) {
          console.warn("StatusBar plugin not available", e);
        }
      };

      initializeStatusBar();
    }
  }, []);

  return null;
}
