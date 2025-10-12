package com.ustinov_i_a_pz_1.workmanager

import android.content.Context
import android.util.Log
import androidx.work.Worker
import androidx.work.WorkerParameters

class UploadWorker(appContext: Context, params: WorkerParameters) : Worker(appContext, params) {
    companion object { const val TAG = "UploadWorker" }

    override fun doWork(): Result {
        Log.d(TAG, "doWork: start")
        try {
            Thread.sleep(10_000)
        } catch (e: InterruptedException) {
            Log.e(TAG, "Interrupted", e)
            return Result.retry()
        }
        Log.d(TAG, "doWork: end")
        return Result.success()
    }
}
