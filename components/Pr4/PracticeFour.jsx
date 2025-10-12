import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../UI/Button';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PracticeFour = () => {
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
          onPress={() => navigation.navigate('Pr4_Ex1')}
        />
        <Button
          text={'Задание 2'}
          onPress={() => navigation.navigate('Pr4_Ex2')}
        />
        <Button
          text={'Задание 3'}
          onPress={() => navigation.navigate('Pr4_Ex3')}
        />
        <Button
          text={'Задание 4'}
          onPress={() => navigation.navigate('Pr4_Ex4')}
        />
        <Button
          text={'Задание 5'}
          onPress={() => navigation.navigate('Pr4_Ex5')}
        />

        <Button
          text={'Задание 6'}
          onPress={() => navigation.navigate('Pr4_Ex6')}
        />
      </View>
    </SafeAreaView>
  );
};

export default PracticeFour;
