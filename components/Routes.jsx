import HomeScreen from './HomeScreen';
import MyDrawer from './Drawer';

import TaskOne from './Pr1/TaskOne';
import TaskSecond from './Pr1/TaskSecond';
import TaskThird from './Pr1/TaskThird';
import TaskFourth from './Pr1/TaskFourth';

import TaskOneTwo from './Pr2/TaskOneTwo';
import TaskOneTwo_input from './Pr2/TaskOneTwo_input';
import TaskTwoTwo from './Pr2/TaskTwoTwo';
import TaskThreeTwo from './Pr2/TaskThreeTwo';

import TaskOneThreeGet from './Pr3/TaskOneThreeGet'
import TaskOneThreeShow from './Pr3/TaskOneThreeShow'
import TaskTwoThreeShow from './Pr3/TaskTwoThreeShow'
import TaskTwoThreeInput from './Pr3/TaskTwoThreeInput'
import TaskThreeThree from './Pr3/TaskThreeThree'

import TaskOneFour from './Pr4/TaskOneFour'
import TaskTwoFour from './Pr4/TaskTwoFour'
import TaskThreeFour from './Pr4/TaskThreeFour'
import TaskFourFour from './Pr4/TaskFourFour'
import TaskFiveFour from './Pr4/TaskFiveFour'
import TaskSixFour from './Pr4/TaskSixFour'

import TaskOneFive from './Pr5/TaskOneFive'
import TaskTwoFive from './Pr5/TaskTwoFive'
import TaskThreeFive from './Pr5/TaskThreeFive'

import TaskOneSix from './Pr6/TaskOneSix'
import TaskTwoSix from './Pr6/TaskTwoSix'
import TaskThreeSix from './Pr6/TaskThreeSix'

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
      <Stack.Screen name="Pr1_Ex1" component={TaskOne} />
      <Stack.Screen name="Pr1_Ex2" component={TaskSecond} />
      <Stack.Screen name="Pr1_Ex3" component={TaskThird} />
      <Stack.Screen name="Pr1_Ex4" component={TaskFourth} />

      <Stack.Screen name="Pr2_Ex1" component={TaskOneTwo} />
      <Stack.Screen name="Pr2_Ex1_Input" component={TaskOneTwo_input} />
      <Stack.Screen name="Pr2_Ex2" component={TaskTwoTwo} />
      <Stack.Screen name="Pr2_Ex3" component={TaskThreeTwo} />

      <Stack.Screen name="Pr3_Ex1_Get" component={TaskOneThreeGet} />
      <Stack.Screen name="Pr3_Ex1_Show" component={TaskOneThreeShow} />
      <Stack.Screen name="Pr3_Ex2_Show" component={TaskTwoThreeShow} />
      <Stack.Screen name="Pr3_Ex2_Input" component={TaskTwoThreeInput} />
      <Stack.Screen name="Pr3_Ex3" component={TaskThreeThree} />

      <Stack.Screen name="Pr4_Ex1" component={TaskOneFour} />
      <Stack.Screen name="Pr4_Ex2" component={TaskTwoFour} />
      <Stack.Screen name="Pr4_Ex3" component={TaskThreeFour} />
      <Stack.Screen name="Pr4_Ex4" component={TaskFourFour} />
      <Stack.Screen name="Pr4_Ex5" component={TaskFiveFour} />
      <Stack.Screen name="Pr4_Ex6" component={TaskSixFour} />

      <Stack.Screen name="Pr5_Ex1" component={TaskOneFive} />
      <Stack.Screen name="Pr5_Ex2" component={TaskTwoFive} />
      <Stack.Screen name="Pr5_Ex3" component={TaskThreeFive} />

      <Stack.Screen name="Pr6_Ex1" component={TaskOneSix} />
      <Stack.Screen name="Pr6_Ex2" component={TaskTwoSix} />
      <Stack.Screen name="Pr6_Ex3" component={TaskThreeSix} />
    </Stack.Navigator>
  );
}

export default RootStack;
