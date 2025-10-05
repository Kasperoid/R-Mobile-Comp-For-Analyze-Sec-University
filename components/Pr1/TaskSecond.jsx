import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TaskSecond = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TableRowTask />
      <TableRowTask />
    </SafeAreaView>
  );
};

const TableRowTask = () => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <ButtonTask />
      <ButtonTask />
      <ButtonTask />
    </View>
  );
};

const ButtonTask = () => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        paddingVertical: 10,
        backgroundColor: 'purple',
        margin: 2,
      }}
    >
      <Text style={{ textAlign: 'center', color: 'white', fontSize: 18 }}>
        BUTTON
      </Text>
    </TouchableOpacity>
  );
};

export default TaskSecond;
