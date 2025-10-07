import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <View
        style={{
          alignSelf: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{fontSize: 20, textAlign: 'center'}}>Практики 1-3 выполнил студент БИСО-01-21</Text>
        <Text style={{fontSize: 20, fontWeight: 800, textAlign: 'center'}}>Устинов Иван Александрович</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
