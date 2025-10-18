import React, { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet, Alert, Platform } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import RNFS from 'react-native-fs';

const TaskTwoFive = () => {
  const [photoUri, setPhotoUri] = useState(null);

  const takePhoto = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      saveToPhotos: false,
      quality: 1,
    };

    const res = await launchCamera(options);
    if (res.didCancel || !res.assets?.length) return;

    const asset = res.assets[0];
    if (!asset.base64) {
      Alert.alert('Ошибка', 'Не удалось получить данные снимка');
      return;
    }

    // Папка приложения
    const dir =
      Platform.OS === 'ios'
        ? RNFS.LibraryDirectoryPath + '/photos'
        : RNFS.DocumentDirectoryPath + '/photos';

    await RNFS.mkdir(dir);
    const dest = `${dir}/photo_${Date.now()}.jpg`;

    // Записываем base64 -> файл
    await RNFS.writeFile(dest, asset.base64, 'base64');

    setPhotoUri('file://' + dest);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Камера → Сохранение → Показ</Text>

      <Pressable onPress={takePhoto} style={styles.button}>
        <Text style={styles.buttonText}>Сделать снимок</Text>
      </Pressable>

      {photoUri ? (
        <Image source={{ uri: photoUri }} style={styles.image} />
      ) : (
        <Text style={styles.hint}>Снимок появится здесь</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 18, marginBottom: 16, fontWeight: '600' },
  button: { paddingHorizontal: 16, paddingVertical: 12, borderRadius: 8, borderWidth: 1 },
  buttonText: { fontSize: 16 },
  image: { width: 280, height: 420, borderRadius: 12, marginTop: 16 },
  hint: { marginTop: 12, color: '#666' },
});

export default TaskTwoFive
