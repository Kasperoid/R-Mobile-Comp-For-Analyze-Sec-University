import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TaskOneSix = () => {
  const [groupNumber, setGroupNumber] = useState('');
  const [listNumber, setListNumber] = useState('');
  const [favoriteMovie, setFavoriteMovie] = useState('');

  // Ключи для хранения
  const STORAGE_KEYS = {
    groupNumber: 'groupNumber',
    listNumber: 'listNumber',
    favoriteMovie: 'favoriteMovie',
  };

  // Загрузка данных при запуске
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedGroupNumber = await AsyncStorage.getItem(STORAGE_KEYS.groupNumber);
        const savedListNumber = await AsyncStorage.getItem(STORAGE_KEYS.listNumber);
        const savedFavoriteMovie = await AsyncStorage.getItem(STORAGE_KEYS.favoriteMovie);

        if (savedGroupNumber !== null) setGroupNumber(savedGroupNumber);
        if (savedListNumber !== null) setListNumber(savedListNumber);
        if (savedFavoriteMovie !== null) setFavoriteMovie(savedFavoriteMovie);
      } catch (e) {
        console.log('Ошибка при загрузке данных', e);
      }
    };

    loadData();
  }, []);

  const saveData = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.groupNumber, groupNumber);
      await AsyncStorage.setItem(STORAGE_KEYS.listNumber, listNumber);
      await AsyncStorage.setItem(STORAGE_KEYS.favoriteMovie, favoriteMovie);
      Alert.alert('Данные сохранены');
    } catch (e) {
      console.log('Ошибка при сохранении данных', e);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Номер группы"
        value={groupNumber}
        onChangeText={setGroupNumber}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Номер по списку"
        value={listNumber}
        onChangeText={setListNumber}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Любимый фильм или сериал"
        value={favoriteMovie}
        onChangeText={setFavoriteMovie}
      />
      <Button title="Сохранить" onPress={saveData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 4,
    padding: 10,
    marginBottom: 15,
  },
});

export default TaskOneSix;
