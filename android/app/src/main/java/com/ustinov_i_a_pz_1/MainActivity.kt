package com.ustinov_i_a_pz_1

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

import android.os.Bundle
import android.os.PersistableBundle
import android.util.Log

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "ustinov_i_a_pz_1"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(null)
    Log.d("Task", "onCreate() called")
  }

  override fun onStart() {
    super.onStart()
    Log.d("Task", "onStart() called")
  }

  override fun onRestoreInstanceState(savedInstanceState: Bundle) {
    super.onRestoreInstanceState(savedInstanceState)
    Log.d("Task", "onRestoreInstanceState() called")
  }

  override fun onPostCreate(savedInstanceState: Bundle?) {
    super.onPostCreate(savedInstanceState)
    Log.d("Task", "onPostCreate() called")
  }

  override fun onResume() {
    super.onResume()
    Log.d("Task", "onResume() called")
  }

  override fun onPostResume() {
    super.onPostResume()
    Log.d("Task", "onPostResume() called")
  }

  override fun onPause() {
    super.onPause()
    Log.d("Task", "onPause() called")
  }

  override fun onSaveInstanceState(outState: Bundle) {
    super.onSaveInstanceState(outState)
    Log.d("Task", "onSaveInstanceState() called")
  }

  override fun onStop() {
    super.onStop()
    Log.d("Task", "onStop() called")
  }

  override fun onDestroy() {
    super.onDestroy()
    Log.d("Task", "onDestroy() called")
  }
}
