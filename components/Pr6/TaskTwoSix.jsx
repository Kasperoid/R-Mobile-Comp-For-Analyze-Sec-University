import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import RNFS from 'react-native-fs';

const TaskTwoSix = () => {
  const [fileName, setFileName] = useState('');
  const [quote, setQuote] = useState('');

  const saveToFile = async () => {
    if (!fileName) {
      Alert.alert('Ошибка', 'Введите название файла');
      return;
    }
    const filePath = `${RNFS.DocumentDirectoryPath}/Directory_Documents/${fileName}.txt`;

    try {
      // Создаем директорию, если не существует
      const dirPath = `${RNFS.DocumentDirectoryPath}/Directory_Documents`;
      const dirExists = await RNFS.exists(dirPath);
      if (!dirExists) {
        await RNFS.mkdir(dirPath);
      }

      // Записываем цитату в файл
      await RNFS.writeFile(filePath, quote, 'utf8');
      Alert.alert('Успех', `Данные сохранены в ${filePath}`);
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось сохранить файл: ' + error.message);
    }
  };

  const loadFromFile = async () => {
    if (!fileName) {
      Alert.alert('Ошибка', 'Введите название файла');
      return;
    }
    const filePath = `${RNFS.DocumentDirectoryPath}/Directory_Documents/${fileName}.txt`;

    try {
      const exists = await RNFS.exists(filePath);
      if (!exists) {
        Alert.alert('Ошибка', 'Файл не найден');
        return;
      }
      const data = await RNFS.readFile(filePath, 'utf8');
      setQuote(data);
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось загрузить файл: ' + error.message);
    }
  };

  // Создаем два файла с цитатами известных людей
  const createQuotesFiles = async () => {
    const dirPath = `${RNFS.DocumentDirectoryPath}/Directory_Documents`;
    const rawDirPath = `${RNFS.DocumentDirectoryPath}/raw`;

    // Создаем директорию raw
    const rawExists = await RNFS.exists(rawDirPath);
    if (!rawExists) {
      await RNFS.mkdir(rawDirPath);
    }

    // Создаем директорию Directory_Documents, если не существует
    const dirExists = await RNFS.exists(dirPath);
    if (!dirExists) {
      await RNFS.mkdir(dirPath);
    }

    const quote1 = "Люди забывают, что они — часть природы. — Аристотель";
    const quote2 = "Будь изменением, которое хочешь видеть в мире. — Махатма Ганди";

    const file1Path = `${dirPath}/famous1.txt`;
    const file2Path = `${dirPath}/famous2.txt`;

    await RNFS.writeFile(file1Path, quote1, 'utf8');
    await RNFS.writeFile(file2Path, quote2, 'utf8');

    // Перемещение файлов в raw
    const rawFile1Path = `${rawDirPath}/famous1.txt`;
    const rawFile2Path = `${rawDirPath}/famous2.txt`;

    await RNFS.moveFile(file1Path, rawFile1Path);
    await RNFS.moveFile(file2Path, rawFile2Path);

    Alert.alert('Готово', 'Файлы с цитатами созданы и перемещены в raw');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Название файла"
        value={fileName}
        onChangeText={setFileName}
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Цитата"
        value={quote}
        onChangeText={setQuote}
        multiline
      />
      <View style={styles.buttonContainer}>
        <Button title="Сохранить в файл" onPress={saveToFile} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Загрузить из файла" onPress={loadFromFile} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Создать цитаты" onPress={createQuotesFiles} />
      </View>
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
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  buttonContainer: {
    marginVertical: 10,
  },
});

export default TaskTwoSix;
