import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../UI/Button';
import * as Progress from 'react-native-progress';

const TaskThreeTwo = () => {
  const [date, setDate] = useState(new Date(1598051730000));

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = currentMode => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <SafeAreaView>
      <Button onPress={showDatepicker} text="Show date picker!" />
      <Button onPress={showTimepicker} text="Show time picker!" />

      <Progress.Circle size={60} indeterminate={true} />
    </SafeAreaView>
  );
};

export default TaskThreeTwo;
