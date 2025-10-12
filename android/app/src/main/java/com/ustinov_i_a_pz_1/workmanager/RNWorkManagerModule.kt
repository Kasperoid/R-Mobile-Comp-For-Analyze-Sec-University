package com.ustinov_i_a_pz_1.workmanager

import android.util.Log
import androidx.lifecycle.Observer
import androidx.work.*
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import java.util.UUID
import java.util.concurrent.ConcurrentHashMap
import java.util.concurrent.Executors

class RNWorkManagerModule(private val reactContext: ReactApplicationContext)
    : ReactContextBaseJavaModule(reactContext), LifecycleEventListener {

    private val observers = ConcurrentHashMap<UUID, Observer<WorkInfo?>>()

    init { reactContext.addLifecycleEventListener(this) }

    override fun getName() = "RNWorkManager"

    private fun sendEvent(event: String, params: WritableMap) {
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(event, params)
    }

    // options: { unmeteredOnly?: boolean, requiresCharging?: boolean }
    @ReactMethod
    fun enqueueUploadWork(options: ReadableMap?, promise: Promise) {
        val unmetered = options?.getBoolean("unmeteredOnly") ?: false
        val requiresCharging = options?.getBoolean("requiresCharging") ?: false

        val constraints = Constraints.Builder()
            .setRequiredNetworkType(if (unmetered) NetworkType.UNMETERED else NetworkType.CONNECTED)
            .setRequiresCharging(requiresCharging)
            .build()

        val request = OneTimeWorkRequestBuilder<UploadWorker>()
            .setConstraints(constraints)
            .addTag("upload")
            .build()

        WorkManager.getInstance(reactContext).enqueue(request)
        promise.resolve(request.id.toString())
    }

    @ReactMethod
    fun observeWork(id: String) {
        val uuid = UUID.fromString(id)
        val liveData = WorkManager.getInstance(reactContext).getWorkInfoByIdLiveData(uuid)
        val observer = Observer<WorkInfo?> { info ->
            if (info != null) {
                val map = Arguments.createMap().apply {
                    putString("id", id)
                    putString("state", info.state.name)
                }
                sendEvent("workmanager.workinfo", map)
                if (info.state.isFinished) {
                    liveData.removeObserver(observers[uuid]!!)
                    observers.remove(uuid)
                }
            }
        }
        observers[uuid] = observer
        liveData.observeForever(observer)
    }

    @ReactMethod
fun getWorkInfo(id: String, promise: Promise) {
    val uuid = UUID.fromString(id)
    val liveData = WorkManager.getInstance(reactContext).getWorkInfoByIdLiveData(uuid)
    val observer = object : Observer<WorkInfo?> {
        override fun onChanged(info: WorkInfo?) {
            if (info != null) {
                val map = Arguments.createMap().apply {
                    putString("id", id)
                    putString("state", info.state.name) // ENQUEUED/RUNNING/...
                }
                promise.resolve(map)
                liveData.removeObserver(this)
            }
        }
    }
    liveData.observeForever(observer)
}

    @ReactMethod
    fun cancelWorkById(id: String, promise: Promise) {
        WorkManager.getInstance(reactContext).cancelWorkById(UUID.fromString(id))
        promise.resolve(null)
    }

    override fun onHostResume() {}
    override fun onHostPause() {}
    override fun onHostDestroy() {
        for ((uuid, observer) in observers) {
            try {
                WorkManager.getInstance(reactContext)
                    .getWorkInfoByIdLiveData(uuid)
                    .removeObserver(observer)
            } catch (t: Throwable) {
                Log.w("RNWorkManager", "removeObserver failed", t)
            }
        }
        observers.clear()
    }
}
