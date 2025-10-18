import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { initDB, addHero, getHeroes, updateHero, deleteHero } from './EmployeeDB';

const HeroManager = () => {
  const [name, setName] = useState('');
  const [alias, setAlias] = useState('');
  const [superpower, setSuperpower] = useState('');
  const [origin, setOrigin] = useState('');
  const [heroes, setHeroes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  // Инициализация базы данных при запуске
  useEffect(() => {
    initDB();
  }, []);

  // Получение списка героев
  const loadHeroes = async () => {
    const data = await getHeroes();
    setHeroes(data);
  };

  // Добавление нового героя
  const handleAddHero = async () => {
    if (!name.trim()) {
      Alert.alert('Ошибка', 'Введите имя героя');
      return;
    }
    await addHero(name, alias, superpower, origin);
    setName('');
    setAlias('');
    setSuperpower('');
    setOrigin('');
    loadHeroes();
  };

  // Обновление героя
  const handleUpdateHero = async () => {
    if (selectedId === null) {
      Alert.alert('Ошибка', 'Выберите героя для обновления');
      return;
    }
    await updateHero(selectedId, name, alias, superpower, origin);
    setSelectedId(null);
    setName('');
    setAlias('');
    setSuperpower('');
    setOrigin('');
    loadHeroes();
  };

  // Удаление героя
  const handleDeleteHero = async (id) => {
    await deleteHero(id);
    if (id === selectedId) {
      setSelectedId(null);
      setName('');
      setAlias('');
      setSuperpower('');
      setOrigin('');
    }
    loadHeroes();
  };

  // Выбор героя из списка для редактирования
  const handleSelectHero = (hero) => {
    setSelectedId(hero.id);
    setName(hero.name);
    setAlias(hero.alias);
    setSuperpower(hero.superpower);
    setOrigin(hero.origin);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Менеджер героев</Text>

      <TextInput
        style={styles.input}
        placeholder="Имя"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Альтер-эго"
        value={alias}
        onChangeText={setAlias}
      />
      <TextInput
        style={styles.input}
        placeholder="Суперспособность"
        value={superpower}
        onChangeText={setSuperpower}
      />
      <TextInput
        style={styles.input}
        placeholder="Происхождение"
        value={origin}
        onChangeText={setOrigin}
      />

      <View style={styles.buttonsContainer}>
        <Button title="Добавить" onPress={handleAddHero} />
        <Button title="Обновить" onPress={handleUpdateHero} />
        <Button title="Обновить список" onPress={loadHeroes} />
      </View>

      <Text style={styles.subHeader}>Список героев:</Text>
      <FlatList
        data={heroes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.heroItem}>
            <Text style={styles.heroText}>
              {item.name} ({item.alias}) - {item.superpower} | {item.origin}
            </Text>
            <View style={styles.heroButtons}>
              <Button title="Редактировать" onPress={() => handleSelectHero(item)} />
              <Button
                title="Удалить"
                color="red"
                onPress={() => handleDeleteHero(item.id)}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 8,
    marginBottom: 10,
    borderRadius: 4,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  heroItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  heroText: {
    fontSize: 16,
  },
  heroButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
  },
});

export default HeroManager;
