import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../UI/Button';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PracticeTwo = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          alignSelf: 'center',
          justifyContent: 'space-between',
          height: '35%',
        }}
      >
        <Button
          text={'Задание 1'}
          onPress={() => navigation.navigate('Pr2_Ex1')}
        />

        <Button
          text={'Задание 2'}
          onPress={() => navigation.navigate('Pr2_Ex2')}
        />

        <Button
          text={'Задание 3'}
          onPress={() => navigation.navigate('Pr2_Ex3')}
        />
      </View>
    </SafeAreaView>
  );
};

export default PracticeTwo;
