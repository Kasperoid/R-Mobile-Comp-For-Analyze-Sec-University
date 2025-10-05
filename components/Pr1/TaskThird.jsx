import CheckBox from '@react-native-community/checkbox';
import { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TaskThird = () => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', width: '100%' }}>
        <TaskButton />
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{ textAlign: 'center' }}>This is Table View!</Text>
        </View>
        <TaskButton />
      </View>

      <View style={{ flexDirection: 'row', width: '100%' }}>
        <TaskButton />
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <CheckBox
            value={toggleCheckBox}
            onValueChange={newValue => setToggleCheckBox(newValue)}
          />
          <Text style={{ fontSize: 16 }}>CheckBox</Text>
        </View>
      </View>

      <View
        style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}
      >
        <TouchableOpacity
          style={{ flex: 1, paddingVertical: 10, margin: 5, borderRadius: 10 }}
        >
          <Image
            source={require('../../assets/img_snow.jpg')}
            style={{ height: 40, width: '100%' }}
          />
        </TouchableOpacity>
        <TaskButton />
        <TaskButton />
      </View>
    </SafeAreaView>
  );
};

const TaskButton = () => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        backgroundColor: 'purple',
        paddingVertical: 10,
        margin: 5,
        borderRadius: 10,
      }}
    >
      <Text
        style={{
          textAlign: 'center',
          fontSize: 16,
          fontWeight: 600,
          color: 'white',
        }}
      >
        BUTTON
      </Text>
    </TouchableOpacity>
  );
};

export default TaskThird;
