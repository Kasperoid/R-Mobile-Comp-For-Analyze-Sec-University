package com.ustinov_i_a_pz_1.threadinfo

import android.os.Looper
import com.facebook.react.bridge.*

class ThreadInfoModule(private val reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName() = "ThreadInfo"

  @ReactMethod
  fun getMainThreadName(promise: Promise) {
    val main = Looper.getMainLooper().thread
    promise.resolve(main.name ?: "main")
  }

  @ReactMethod
  fun setMainThreadName(name: String, promise: Promise) {
    reactContext.runOnUiQueueThread {
      val main = Looper.getMainLooper().thread
      main.name = name
      promise.resolve(true)
    }
  }

  @ReactMethod
  fun getCurrentThreadName(promise: Promise) {
    promise.resolve(Thread.currentThread().name)
  }

  @ReactMethod
  fun computeAverage(totalPairs: Int, studyDays: Int, promise: Promise) {
    Thread {
      try {
        if (studyDays == 0) {
          promise.reject("DIV_0", "Учебные дни не могут быть 0")
          return@Thread
        }
        val avg = totalPairs.toDouble() / studyDays.toDouble()
        promise.resolve(avg)
      } catch (t: Throwable) {
        promise.reject("ERR", t)
      }
    }.start()
  }
}