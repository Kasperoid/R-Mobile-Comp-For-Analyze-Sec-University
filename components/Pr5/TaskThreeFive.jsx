import React, { useState, useEffect } from 'react';
import { View, Button, Text, PermissionsAndroid, Platform } from 'react-native';
import AudioRecord from 'react-native-audio-record';
import Sound from 'react-native-sound';

const TaskThreeFive = () => {
  const [recording, setRecording] = useState(false);
  const [filePath, setFilePath] = useState('');
  const [sound, setSound] = useState(null);
  const [status, setStatus] = useState('Готово');

  useEffect(() => {
    const requestPermissions = async () => {
      if (Platform.OS === 'android') {
        await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]);
      }
    };
    requestPermissions();

    // Настройка AudioRecord
    AudioRecord.init({
      sampleRate: 16000,
      channels: 1,
      bitsPerSample: 16,
      audioSource: 6,
    });
  }, []);

  const startRecording = () => {
    setStatus('Запись...');
    const path = Platform.select({
      ios: 'test.m4a',
      android: `${Date.now()}.mp4`,
    });
    setFilePath(path);
    AudioRecord.start();
    setRecording(true);
  };

  const stopRecording = async () => {
    if (!recording) return;
    const audioFile = await AudioRecord.stop();
    setStatus('Записано');
    setRecording(false);
    setFilePath(audioFile);
  };

  const playAudio = () => {
    if (!filePath) {
      alert('Нет файла для воспроизведения');
      return;
    }
    const soundInstance = new Sound(filePath, '', (error) => {
      if (error) {
        console.log('Ошибка при загрузке файла', error);
        return;
      }
      soundInstance.play(() => {
        soundInstance.release();
      });
    });
    setSound(soundInstance);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Статус: {status}</Text>
      <Button
        title={recording ? 'Остановить запись' : 'Начать запись'}
        onPress={recording ? stopRecording : startRecording}
      />
      <View style={{ height: 20 }} />
      <Button title="Воспроизвести" onPress={playAudio} disabled={!filePath} />
    </View>
  );
};

export default TaskThreeFive;
