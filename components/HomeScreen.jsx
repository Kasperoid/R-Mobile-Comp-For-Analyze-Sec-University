import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from './UI/Button';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <View
        style={{
          alignSelf: 'center',
          justifyContent: 'space-between',
          height: '35%',
        }}
      >
        <Button
          text={'Практика 1'}
          onPress={() => {
            navigation.navigate('Pr1');
          }}
        />
        <Button
          text={'Практика 2'}
          onPress={() => {
            navigation.navigate('Pr2');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
