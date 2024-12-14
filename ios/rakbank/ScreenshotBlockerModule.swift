import Foundation
import UIKit

@objc(ScreenshotBlocker)
class ScreenshotBlocker: NSObject {
  
  @objc func blockScreenshot() {
    DispatchQueue.main.async {
      UIApplication.shared.isIdleTimerDisabled = true
    }
  }
  
  @objc func unblockScreenshot() {
    DispatchQueue.main.async {
      UIApplication.shared.isIdleTimerDisabled = false
    }
  }
}
