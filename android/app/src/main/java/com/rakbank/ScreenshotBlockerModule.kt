package com.rakbank

import android.app.Activity
import android.os.Handler
import android.os.Looper
import android.view.WindowManager
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class ScreenshotBlockerModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "ScreenshotBlocker"
    }

    // Block screenshot
    @ReactMethod
    fun blockScreenshot() {
        val currentActivity: Activity? = currentActivity
        Handler(Looper.getMainLooper()).post {
            currentActivity?.window?.setFlags(
                WindowManager.LayoutParams.FLAG_SECURE,
                WindowManager.LayoutParams.FLAG_SECURE
            )
        }
    }

    // Unblock screenshot
    @ReactMethod
    fun unblockScreenshot() {
        val currentActivity: Activity? = currentActivity
        Handler(Looper.getMainLooper()).post {
            currentActivity?.window?.clearFlags(WindowManager.LayoutParams.FLAG_SECURE)
        }
    }
}
