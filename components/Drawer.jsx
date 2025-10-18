import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from './HomeScreen';
import PracticeOne from './Pr1/PracticeOne';
import PracticeTwo from './Pr2/PracticeTwo';
import PracticeThree from './Pr3/PracticeThree';
import PracticeFour from './Pr4/PracticeFour';
import PracticeFive from './Pr5/PracticeFive';

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Practice1" component={PracticeOne} />
      <Drawer.Screen name="Practice2" component={PracticeTwo} />
      <Drawer.Screen name="Practice3" component={PracticeThree} />
      <Drawer.Screen name="Practice4" component={PracticeFour} />
      <Drawer.Screen name="Practice5" component={PracticeFive} />
    </Drawer.Navigator>
  );
}

export default MyDrawer