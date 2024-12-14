import { NativeModules } from 'react-native';

const { ScreenshotBlocker } = NativeModules;

// Expose the methods to TS
export const blockScreenShot = () => {
  ScreenshotBlocker.blockScreenshot();
};

export const unblockScreenShot = () => {
  ScreenshotBlocker.unblockScreenshot();
};
