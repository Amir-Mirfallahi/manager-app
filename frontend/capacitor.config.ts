import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.taskflow.ai",
  appName: "Taskflow AI",
  webDir: "out",
  plugins: {
    SystemBars: {
      insetsHandling: "disable",
    },
    SafeArea: {
      detectViewportFitCoverChanges: false,
      initialViewportFitCover: false,
    },
  },
};

export default config;
