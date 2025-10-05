import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TaskOne() {
  const onClickBtnHandler = text => {
    setShownText(text);
  };

  const [shownText, setShownText] = useState('My name is Ivan!');
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <Text style={{ fontSize: 24, fontWeight: 600, marginBottom: 50 }}>
        {shownText}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '100%',
        }}
      >
        <ButtonTask
          text={'Who am I?'}
          func={() => onClickBtnHandler('Мой номер по списку группы 23')}
        />
        <ButtonTask
          text={"It's not me"}
          func={() => onClickBtnHandler('Это не я сделал')}
        />
      </View>
    </SafeAreaView>
  );
}

const ButtonTask = ({ text, func }) => {
  return (
    <TouchableOpacity
      onPress={func}
      style={{
        padding: 15,
        backgroundColor: 'purple',
      }}
    >
      <Text style={{ textAlign: 'center', color: 'white', fontSize: 18 }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};
