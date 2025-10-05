import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../UI/Button';
import { useNavigation } from '@react-navigation/native';

const TaskOneTwo_input = ({ route }) => {
  const onPressHandler = () => {
    setTextFunc(text);
    onChangeText('');
    navigation.goBack();
  };

  const navigation = useNavigation();
  const [text, onChangeText] = useState('');
  const { setTextFunc } = route.params;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Введите текст"
      />
      <View style={{ alignItems: 'center' }}>
        <Button text={'Передать'} onPress={() => onPressHandler()} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 18,
  },
});

export default TaskOneTwo_input;
