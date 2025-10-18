import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { accelerometer, setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';

const TaskOneFive = () => {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    setUpdateIntervalForType(SensorTypes.accelerometer, 100);
    const subscription = accelerometer.subscribe(
      ({ x, y, z }) => setData({ x, y, z }),
      (error) => console.warn('Accelerometer not available', error)
    );
    return () => subscription.unsubscribe();
  }, []);

  const round = (n) => Math.round(n * 1000) / 1000;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>Акселерометр</Text>
      <View style={styles.row}><Text style={styles.label}>x:</Text><Text style={styles.value}>{round(data.x)}</Text></View>
      <View style={styles.row}><Text style={styles.label}>y:</Text><Text style={styles.value}>{round(data.y)}</Text></View>
      <View style={styles.row}><Text style={styles.label}>z:</Text><Text style={styles.value}>{round(data.z)}</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, marginBottom: 16 },
  row: { flexDirection: 'row', marginVertical: 6 },
  label: { ontSize: 20, width: 28 },
  value: { ontSize: 22, fontVariant: ['tabular-nums'] },
});

export default TaskOneFive