import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  NativeModules,
  NativeEventEmitter,
  Platform,
} from 'react-native';

const { AgeJob } = NativeModules;

const TaskThreeFour = () => {
  const [age, setAge] = useState('');
  const [job, setJob] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (Platform.OS !== 'android' || !AgeJob) return;
    const emitter = new NativeEventEmitter(AgeJob);
    const sub = emitter.addListener('AgeJob/result', (e) => {
      setStatus(e.result);
    });
    return () => sub.remove();
  }, []);

  const onRun = () => {
    const n = parseInt(age, 10);
    if (isNaN(n) || n < 0 || !job.trim()) {
      setStatus('Введите корректные данные');
      return;
    }
    setStatus(`Запущено на ${n} сек...`);

    if (Platform.OS === 'android' && AgeJob?.runAgeJob) {
      AgeJob.runAgeJob(n, job.trim());
    } else {
      setTimeout(() => {
        const result = `Возраст=${n}, Профессия=${job.trim()}, Месяцев=${n * 12}`;
        console.log(result);
        setStatus(result);
      }, n * 1000);
    }
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Возраст и профессия</Text>

      <TextInput
        keyboardType="number-pad"
        placeholder="Возраст (лет)"
        value={age}
        onChangeText={setAge}
        style={styles.input}
        placeholderTextColor="#999"
      />
      <TextInput
        placeholder="Кем вы работаете"
        value={job}
        onChangeText={setJob}
        style={styles.input}
        placeholderTextColor="#999"
      />

      <Pressable style={styles.button} onPress={onRun}>
        <Text style={styles.buttonText}>Запустить</Text>
      </Pressable>

      <Text style={styles.status}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, padding: 20, gap: 12, justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8, textAlign: 'center' },
  input: { borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, fontSize: 16 },
  button: { backgroundColor: '#1F8EF1', paddingVertical: 12, borderRadius: 10, alignItems: 'center', marginTop: 8 },
  buttonText: { color: 'white', fontSize: 16, fontWeight: '600' },
  status: { marginTop: 8, textAlign: 'center' },
  hint: { fontSize: 12, textAlign: 'center', marginTop: 8 },
});

export default TaskThreeFour
