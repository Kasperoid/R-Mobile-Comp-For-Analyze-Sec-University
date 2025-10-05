import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TaskFourth = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image
        source={require('../../assets/img_snow.jpg')}
        style={{ width: '100%' }}
      />
      <View style={{ margin: 10, flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            <Text style={[{ width: '50%' }, styles.text]}>Имя:</Text>
            <Text style={[{ flex: 1 }, styles.text]}>Иван Устинов</Text>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            <Text style={[{ width: '50%' }, styles.text]}>Университет:</Text>
            <Text style={[{ flex: 1 }, styles.text]}>МИРЭА</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: '50%', height: 30 }}>
              <Image
                source={require('../../assets/tel.jpg')}
                style={{ height: 30, width: 30, objectFit: 'contain', flex: 1 }}
              />
            </View>
            <Text style={[{ flex: 1 }, styles.text]}>+79999999999</Text>
          </View>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <TouchableOpacity style={{ backgroundColor: 'grey', padding: 10 }}>
            <Text style={[{ color: 'white' }, styles.text]}>Сохранить</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});

export default TaskFourth;
