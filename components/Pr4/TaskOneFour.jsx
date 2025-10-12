import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, NativeModules, Alert } from 'react-native';

const { ThreadInfo } = NativeModules;

const TaskOneFour = () => {
  const [totalPairs, setTotalPairs] = useState('');
  const [studyDays, setStudyDays] = useState('');
  const [avg, setAvg] = useState(null);
  const [beforeName, setBeforeName] = useState('');
  const [afterName, setAfterName] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const before = await ThreadInfo.getMainThreadName();
        setBeforeName(before);
        const newName = 'ui-main-custom';
        await ThreadInfo.setMainThreadName(newName);
        const after = await ThreadInfo.getMainThreadName();
        setAfterName(after);
      } catch (e) {
        setBeforeName('main');
        setAfterName('не удалось изменить имя');
      }
    };
    init();
  }, []);

  const calculate = async () => {
    const total = Number(totalPairs);
    const days = Number(studyDays);

    if (!Number.isFinite(total) || !Number.isFinite(days)) {
      Alert.alert('Ошибка', 'Введите корректные числа');
      return;
    }
    if (days === 0) {
      Alert.alert('Ошибка', 'Учебные дни не могут быть 0');
      return;
    }

    setBusy(true);
    try {
      // Фоновый расчёт на нативной стороне
      const result = await ThreadInfo.computeAverage(Math.trunc(total), Math.trunc(days));
      setAvg(Number(result).toFixed(2));
    } catch (e) {
      Alert.alert('Ошибка', e?.message ?? 'Не удалось выполнить вычисление');
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Поток (до): {beforeName || '—'}</Text>
      <Text style={styles.title}>Поток (после): {afterName || '—'}</Text>

      <Text style={styles.label}>Общее количество пар за месяц</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={totalPairs}
        onChangeText={setTotalPairs}
        placeholder="Напр., 48"
      />

      <Text style={styles.label}>Количество учебных дней</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={studyDays}
        onChangeText={setStudyDays}
        placeholder="Напр., 20"
      />

      <Button title={busy ? 'Считаю...' : 'Рассчитать'} onPress={calculate} disabled={busy} />

      <Text style={styles.result}>
        Среднее количество пар в день: {avg ?? '—'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, gap: 12, justifyContent: 'center' },
  title: { fontSize: 16, fontWeight: '600' },
  label: { marginTop: 8 },
  input: {
    height: 44,
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  result: { marginTop: 16, fontSize: 18, fontWeight: '700' },
});

export default TaskOneFour