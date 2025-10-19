import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

const TaskOneSeven = () => {
  const [timeData, setTimeData] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchTime = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://smartapp-code.sberdevices.ru/tools/api/now?tz=Europe/Moscow&format=dd/MM/yyyy');
      if (response.ok) {
        const data = await response.json();
        setTimeData(Date(Number(data.timestamp)));
      } else {
        setTimeData('Ошибка при получении данных');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setTimeData('Ошибка сети');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Получить время с сервера</Text>
      <Button title={loading ? 'Загрузка...' : 'Получить время'} onPress={fetchTime} disabled={loading} />
      <View style={styles.resultContainer}>
        <Text style={styles.resultLabel}>Время:</Text>
        <Text style={styles.result}>{timeData}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  resultContainer: {
    marginTop: 30,
    width: '100%',
  },
  resultLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  result: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default TaskOneSeven;
