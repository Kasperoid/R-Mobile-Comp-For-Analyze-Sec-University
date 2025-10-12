import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  NativeModules,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { CryptoLoader } = NativeModules

const TaskFourFour = () => {
  const [phrase, setPhrase] = useState('');
  const [result, setResult] = useState(null);

  const onPress = async () => {
    try {
      if (!phrase.trim()) {
        Alert.alert('Ошибка', 'Введите фразу');
        return;
      }
      const decrypted = await CryptoLoader.encryptAndLoad(phrase);
      setResult(decrypted);
    } catch (e) {
      Alert.alert('Ошибка', e?.message ?? String(e));
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>AES: шифрование → Loader → расшифровка</Text>

      <TextInput
        value={phrase}
        onChangeText={setPhrase}
        placeholder="Введите фразу"
        style={styles.input}
      />

      <Button title="Зашифровать и отправить в Loader" onPress={onPress} />

      {result ? (
        <View style={{marginTop: 16}}>
          <Text style={styles.resultTitle}>Расшифрованный текст (из native):</Text>
          <Text style={styles.resultText}>{result}</Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { fontSize: 18, marginBottom: 12, fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#bbb', borderRadius: 8, padding: 12, marginBottom: 12 },
  resultTitle: { fontSize: 16, fontWeight: '600' },
  resultText: { fontSize: 16, marginTop: 4 },
});

export default TaskFourFour