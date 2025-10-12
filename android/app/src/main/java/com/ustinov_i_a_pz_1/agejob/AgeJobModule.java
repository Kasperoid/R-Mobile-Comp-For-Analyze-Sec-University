package com.ustinov_i_a_pz_1.agejob;

import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.os.Message;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class AgeJobModule extends ReactContextBaseJavaModule {
    private static final String TAG = "AgeJob";

    private final ReactApplicationContext reactContext;
    private final Handler mainHandler = new Handler(Looper.getMainLooper());
    private volatile Handler workerHandler;
    private Thread workerThread;

    public AgeJobModule(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;
        startWorker();
    }

    @NonNull @Override
    public String getName() {
        return "AgeJob";
    }

    private void startWorker() {
        workerThread = new Thread(() -> {
            Looper.prepare();

            workerHandler = new Handler(Looper.myLooper()) {
                @Override
                public void handleMessage(@NonNull Message msg) {
                    Bundle data = msg.getData();
                    int age = data.getInt("AGE", 0);
                    String job = data.getString("JOB", "");

                    try {
                        Thread.sleep(Math.max(0, age) * 1000L);
                    } catch (InterruptedException e) {
                        Thread.currentThread().interrupt();
                    }

                    int months = Math.max(0, age) * 12;
                    String result = "Возраст=" + age + ", Профессия=" + job + ", Месяцев=" + months;

                    Log.d(TAG, result);

                    WritableMap map = Arguments.createMap();
                    map.putString("result", result);
                    try {
                        reactContext
                                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                                .emit("AgeJob/result", map);
                    } catch (RuntimeException ignore) {}
                }
            };

            Looper.loop();
        }, "AgeJobWorker");

        workerThread.start();
    }

    @ReactMethod
    public void runAgeJob(int age, String job) {
        Handler h = workerHandler;
        if (h == null) {
            // Подождём и попробуем ещё раз, пока Handler поднимется
            mainHandler.postDelayed(() -> runAgeJob(age, job), 50);
            return;
        }
        Message m = Message.obtain();
        Bundle b = new Bundle();
        b.putInt("AGE", age);
        b.putString("JOB", job);
        m.setData(b);
        h.sendMessage(m);
    }

    @Override
    public void onCatalystInstanceDestroy() {
        Handler h = workerHandler;
        if (h != null) {
            h.getLooper().quitSafely();
            workerHandler = null;
        }
        super.onCatalystInstanceDestroy();
    }
}