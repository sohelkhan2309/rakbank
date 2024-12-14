#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(ScreenshotBlocker, NSObject)

RCT_EXTERN_METHOD(blockScreenshot)
RCT_EXTERN_METHOD(unblockScreenshot)

@end
