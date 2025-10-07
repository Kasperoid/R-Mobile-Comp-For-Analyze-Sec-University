import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../UI/Button';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PracticeThree = () => {
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
          onPress={() => navigation.navigate('Pr3_Ex1_Get')}
        />
        <Button
          text={'Задание 2'}
          onPress={() => navigation.navigate('Pr3_Ex2_Show')}
        />
        <Button
          text={'Задание 3'}
          onPress={() => navigation.navigate('Pr3_Ex3')}
        />
      </View>
    </SafeAreaView>
  );
};

export default PracticeThree;
