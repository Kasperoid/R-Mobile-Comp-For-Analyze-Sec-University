import HomeScreen from './HomeScreen';
import MyDrawer from './Drawer';
import PracticeOne from './Pr1/PracticeOne';
import TaskOne from './Pr1/TaskOne';
import TaskSecond from './Pr1/TaskSecond';
import TaskThird from './Pr1/TaskThird';
import TaskFourth from './Pr1/TaskFourth';

import PracticeTwo from './Pr2/PracticeTwo';
import TaskOneTwo from './Pr2/TaskOneTwo';
import TaskOneTwo_input from './Pr2/TaskOneTwo_input';
import TaskTwoTwo from './Pr2/TaskTwoTwo';
import TaskThreeTwo from './Pr2/TaskThreeTwo';

import PracticeThree from './Pr3/PracticeThree';
import TaskOneThreeGet from './Pr3/TaskOneThreeGet'
import TaskOneThreeShow from './Pr3/TaskOneThreeShow'
import TaskTwoThreeShow from './Pr3/TaskTwoThreeShow'
import TaskTwoThreeInput from './Pr3/TaskTwoThreeInput'
import TaskThreeThree from './Pr3/TaskThreeThree'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen 
        name="Main" 
        component={MyDrawer}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Pr1" component={PracticeOne} />
      <Stack.Screen name="Pr1_Ex1" component={TaskOne} />
      <Stack.Screen name="Pr1_Ex2" component={TaskSecond} />
      <Stack.Screen name="Pr1_Ex3" component={TaskThird} />
      <Stack.Screen name="Pr1_Ex4" component={TaskFourth} />

      <Stack.Screen name="Pr2" component={PracticeTwo} />
      <Stack.Screen name="Pr2_Ex1" component={TaskOneTwo} />
      <Stack.Screen name="Pr2_Ex1_Input" component={TaskOneTwo_input} />
      <Stack.Screen name="Pr2_Ex2" component={TaskTwoTwo} />
      <Stack.Screen name="Pr2_Ex3" component={TaskThreeTwo} />

      <Stack.Screen name="Pr3" component={PracticeThree} />
      <Stack.Screen name="Pr3_Ex1_Get" component={TaskOneThreeGet} />
      <Stack.Screen name="Pr3_Ex1_Show" component={TaskOneThreeShow} />
      <Stack.Screen name="Pr3_Ex2_Show" component={TaskTwoThreeShow} />
      <Stack.Screen name="Pr3_Ex2_Input" component={TaskTwoThreeInput} />
      <Stack.Screen name="Pr3_Ex3" component={TaskThreeThree} />
    </Stack.Navigator>
  );
}

export default RootStack;
