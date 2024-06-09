import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'FishFinder',
  webDir: 'www',
  "plugins": {
    "LocalNotifications": {},
    "Http": {}
  }
};

export default config;
