import { useEffect, useState } from 'react';
import { Button, Text, View, Switch, NativeModules, NativeEventEmitter } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { RNWorkManager } = NativeModules;
const emitter = new NativeEventEmitter(RNWorkManager);

const TaskSixFour = () => {
  const [unmeteredOnly, setUnmeteredOnly] = useState(true);
  const [requiresCharging, setRequiresCharging] = useState(true);
  const [workId, setWorkId] = useState(null);
  const [state, setState] = useState('IDLE');

  useEffect(() => {
    const sub = emitter.addListener('workmanager.workinfo', (evt) => {
      if (evt.id === workId) setState(evt.state);
    });
    return () => sub.remove();
  }, [workId]);

  const start = async () => {
    setState('ENQUEUED');
    const id = await RNWorkManager.enqueueUploadWork({ unmeteredOnly, requiresCharging });
    setWorkId(id);
    RNWorkManager.observeWork(id);
  };

  const check = async () => {
    if (!workId) return;
    const info = await RNWorkManager.getWorkInfo(workId);
    setState(info.state);
  };

  const cancel = async () => {
    if (!workId) return;
    await RNWorkManager.cancelWorkById(workId);
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 24 }}>
      <Text style={{ fontSize: 22, fontWeight: '600', marginBottom: 12 }}>
        WorkManager + React Native
      </Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8 }}>
        <Text style={{ flex: 1 }}>Только Wi‑Fi (UNMETERED)</Text>
        <Switch value={unmeteredOnly} onValueChange={setUnmeteredOnly} />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8 }}>
        <Text style={{ flex: 1 }}>Только на зарядке</Text>
        <Switch value={requiresCharging} onValueChange={setRequiresCharging} />
      </View>

      <View style={{ flexDirection: 'row', gap: 12, marginVertical: 8 }}>
        <Button title="Запланировать" onPress={start} />
        <View style={{ width: 12 }} />
        <Button title="Проверить" onPress={check} />
        <View style={{ width: 12 }} />
        <Button title="Отменить" onPress={cancel} />
      </View>

      <Text>ID: {workId ?? '-'}</Text>
      <Text>Статус: {state}</Text>
      <Text style={{ marginTop: 10, opacity: 0.7 }}>
        Задача стартует, когда выполнены условия: интернет (Wi‑Fi) и зарядка — если включены.
      </Text>
    </SafeAreaView>
  );
}

export default TaskSixFour