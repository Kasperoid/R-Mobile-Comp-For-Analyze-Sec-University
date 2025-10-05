import { useState } from 'react';
import { Share, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../UI/Button';
import { useNavigation } from '@react-navigation/native';

const TaskOneTwo = () => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: fio,
      });
    } catch (e) {
      console.warn('Share error:', e);
    }
  };

  const navigation = useNavigation();

  const [bundleText, setBundleText] = useState(
    'Тут будет отображаться текст, который ввели на другом экране',
  );
  const [fio, setFio] = useState('Устинов Иван Александрович');

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ textAlign: 'center', fontSize: 18, marginBottom: 16 }}>
          {bundleText}
        </Text>
        <Button
          text={'Ввести'}
          onPress={() =>
            navigation.navigate('Pr2_Ex1_Input', {
              setTextFunc: text => setBundleText(text),
            })
          }
        />

        <View style={{ marginTop: 25, alignItems: 'center' }}>
          <TextInput
            value={fio}
            onChangeText={setFio}
            placeholder="ФИО"
            style={[styles.input, { marginBottom: 16 }]}
          />
          <Button text="Поделиться ФИО" onPress={onShare} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
});

export default TaskOneTwo;
