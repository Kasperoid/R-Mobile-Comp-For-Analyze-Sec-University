package com.ustinov_i_a_pz_1.crypto;

import com.facebook.react.bridge.UiThreadUtil;

import android.util.Log;

import android.app.Activity;
import android.content.Context;
import android.os.Bundle;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.lifecycle.Lifecycle;
import androidx.lifecycle.LifecycleOwner;
import androidx.lifecycle.LifecycleRegistry;
import androidx.lifecycle.ViewModelStore;
import androidx.lifecycle.ViewModelStoreOwner;
import androidx.loader.app.LoaderManager;
import androidx.loader.content.AsyncTaskLoader;
import androidx.loader.content.Loader;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.nio.charset.StandardCharsets;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.KeyGenerator;        
import javax.crypto.spec.SecretKeySpec;

public class CryptoLoaderModule extends ReactContextBaseJavaModule {

  private static final String NAME = "CryptoLoader";
  private static final String ARG_WORD = "ARG_WORD";
  private static final String ARG_KEY = "key";
  private static final int LOADER_ID = 1001;
  private static final String TAG = "Crypto";

  public CryptoLoaderModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @NonNull
  @Override
  public String getName() {
    return NAME;
  }

  @ReactMethod
public void encryptAndLoad(String message, Promise promise) {
  Activity activity = getCurrentActivity();
  if (activity == null) {
    promise.reject("NO_ACTIVITY", "Текущая Activity недоступна");
    return;
  }

  try {
    SecretKey key = generateKey();
    byte[] cipherBytes = encryptMsg(message, key);

    final Bundle bundle = new Bundle();
    bundle.putByteArray(ARG_WORD, cipherBytes);
    bundle.putByteArray(ARG_KEY, key.getEncoded());

    UiThreadUtil.runOnUiThread(() -> {
      try {
        final SimpleOwner owner = new SimpleOwner();
        final LoaderManager lm = LoaderManager.getInstance(owner);

        lm.restartLoader(
          LOADER_ID,
          bundle,
          new LoaderManager.LoaderCallbacks<String>() {
            @NonNull
            @Override
            public Loader<String> onCreateLoader(int id, Bundle args) {
              return new DecryptLoader(activity.getApplicationContext(), args);
            }

            @Override
            public void onLoadFinished(@NonNull Loader<String> loader, String data) {
              Toast.makeText(activity.getApplicationContext(), "Расшифровка: " + data, Toast.LENGTH_LONG).show();
              promise.resolve(data);
              lm.destroyLoader(LOADER_ID);
              owner.destroy(); // тоже на UI
            }

            @Override
            public void onLoaderReset(@NonNull Loader<String> loader) { }
          }
        );
      } catch (Exception e) {
        promise.reject("LOADER_ERROR", e);
      }
    });

  } catch (Exception e) {
    promise.reject("ENCRYPT_ERROR", e);
  }
}

  static class DecryptLoader extends AsyncTaskLoader<String> {
    private final Bundle args;
    private String cached;

    DecryptLoader(@NonNull Context context, Bundle args) {
      super(context);
      this.args = args;
    }

    @Override
    protected void onStartLoading() {
      if (cached != null) {
        deliverResult(cached);
      } else {
        forceLoad();
      }
    }

    @Override
    public String loadInBackground() {
      try {
        byte[] cipherText = args.getByteArray(ARG_WORD);
        byte[] keyBytes   = args.getByteArray(ARG_KEY);
        if (cipherText == null || keyBytes == null) return "Нет данных";

        SecretKey originalKey = new SecretKeySpec(keyBytes, 0, keyBytes.length, "AES");
        Log.d(TAG, new String(cipherText));
        return decryptMsg(cipherText, originalKey);
      } catch (Exception e) {
        return "Ошибка расшифровки: " + e.getMessage();
      }
    }

    @Override
    public void deliverResult(String data) {
      cached = data;
      super.deliverResult(data);
    }
  }

  static class SimpleOwner implements LifecycleOwner, ViewModelStoreOwner {
    private final LifecycleRegistry registry = new LifecycleRegistry(this);
    private final ViewModelStore store = new ViewModelStore();

    SimpleOwner() {
      registry.handleLifecycleEvent(Lifecycle.Event.ON_CREATE);
      registry.handleLifecycleEvent(Lifecycle.Event.ON_START);
      registry.handleLifecycleEvent(Lifecycle.Event.ON_RESUME);
    }

    void destroy() {
      registry.handleLifecycleEvent(Lifecycle.Event.ON_PAUSE);
      registry.handleLifecycleEvent(Lifecycle.Event.ON_STOP);
      registry.handleLifecycleEvent(Lifecycle.Event.ON_DESTROY);
      store.clear();
    }

    @NonNull @Override public Lifecycle getLifecycle() { return registry; }
    @NonNull @Override public ViewModelStore getViewModelStore() { return store; }
  }

  private static SecretKey generateKey() {
    try {
      SecureRandom sr = SecureRandom.getInstance("SHA1PRNG");
      sr.setSeed("any data used as random seed".getBytes(StandardCharsets.UTF_8));
      KeyGenerator kg = KeyGenerator.getInstance("AES");
      kg.init(256, sr); // при необходимости заменить на 128
      return new SecretKeySpec(kg.generateKey().getEncoded(), "AES");
    } catch (NoSuchAlgorithmException e) {
      throw new RuntimeException(e);
    }
  }

  private static byte[] encryptMsg(String message, SecretKey secret) {
    try {
      Cipher cipher = Cipher.getInstance("AES");
      cipher.init(Cipher.ENCRYPT_MODE, secret);
      return cipher.doFinal(message.getBytes(StandardCharsets.UTF_8));
    } catch (NoSuchAlgorithmException | NoSuchPaddingException |
             IllegalBlockSizeException | BadPaddingException |
             java.security.InvalidKeyException e) {
      throw new RuntimeException(e);
    }
  }

  private static String decryptMsg(byte[] cipherText, SecretKey secret) {
    try {
      Cipher cipher = Cipher.getInstance("AES");
      cipher.init(Cipher.DECRYPT_MODE, secret);
      return new String(cipher.doFinal(cipherText), StandardCharsets.UTF_8);
    } catch (NoSuchAlgorithmException | NoSuchPaddingException |
             IllegalBlockSizeException | BadPaddingException |
             java.security.InvalidKeyException e) {
      throw new RuntimeException(e);
    }
  }
}
