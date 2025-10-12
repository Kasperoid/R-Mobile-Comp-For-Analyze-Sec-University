import { useRef, useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Sound from 'react-native-sound';
import notifee, { AndroidImportance } from '@notifee/react-native';

Sound.setCategory('Playback');

const TaskFiveFour = () => {
    async function ensurePermissions() {
    await notifee.requestPermission();
  }

  async function getChannelId() {
    if (Platform.OS !== 'android') return undefined;
    return await notifee.createChannel({
      id: 'default',
      name: 'Уведомления',
      importance: AndroidImportance.HIGH,
    });
  }

  async function showLocalNotification() {
    await ensurePermissions();
    const channelId = await getChannelId();

    await notifee.displayNotification({
      title: 'Проигрывается запись track',
      body: 'Устинов Иван БИСО-01-21',
      android: {
        channelId,
        pressAction: { id: 'default' },
      },
    });
  }

  const soundRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const loadIfNeeded = () =>
    new Promise((resolve, reject) => {
      if (soundRef.current) return resolve(soundRef.current);

      const s = new Sound('track.mp3', Sound.MAIN_BUNDLE, (error) => {
        if (error) return reject(error);
        soundRef.current = s;
        resolve(s);
      });
    });

  const onPlay = async () => {
    try {
      const s = await loadIfNeeded();
      s.play((success) => {
        setIsPlaying(false);
        s.setCurrentTime(0);
      });
      setIsPlaying(true);
      showLocalNotification()
    } catch (e) {
      console.error('Не получилось воспроизвести файл:', e);
    }
  };

  const onStop = () => {
    const s = soundRef.current;
    if (!s) return;
    s.stop(() => {
      setIsPlaying(false);
      s.release();
      soundRef.current = null;
    });
  };

  useEffect(() => {
    return () => {
      soundRef.current?.release();
      soundRef.current = null;
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Музыкальный плеер</Text>

        <View style={styles.art} />

        <View style={styles.controls}>
          <Pressable
            style={[styles.btn, isPlaying ? styles.btnDisabled : styles.btnPrimary]}
            onPress={onPlay}
            disabled={isPlaying}
          >
            <Text style={styles.btnText}>{isPlaying ? 'Playing…' : 'Play'}</Text>
          </Pressable>

          <Pressable
            style={[styles.btn, styles.btnDanger]}
            onPress={onStop}
            disabled={!isPlaying}
          >
            <Text style={styles.btnText}>Stop</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  card: {
    width: '86%',
    backgroundColor: '#181c25',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    gap: 24,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 14,
    elevation: 8,
  },
  title: { color: '#fff', fontSize: 20, fontWeight: '700' },
  art: { width: 180, height: 180, borderRadius: 90, backgroundColor: '#2b3242', borderWidth: 6, borderColor: '#3c78dc' },
  controls: { flexDirection: 'row', gap: 16 },
  btn: { paddingHorizontal: 24, paddingVertical: 14, borderRadius: 12 },
  btnPrimary: { backgroundColor: '#3c78dc' },
  btnDanger: { backgroundColor: '#d9415e' },
  btnDisabled: { backgroundColor: '#6b7aa1' },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default TaskFiveFour