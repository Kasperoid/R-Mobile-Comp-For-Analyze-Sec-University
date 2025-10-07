import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from './HomeScreen';
import PracticeOne from './Pr1/PracticeOne';
import PracticeTwo from './Pr2/PracticeTwo';
import PracticeThree from './Pr3/PracticeThree';

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Practice1" component={PracticeOne} />
      <Drawer.Screen name="Practice2" component={PracticeTwo} />
      <Drawer.Screen name="Practice3" component={PracticeThree} />
    </Drawer.Navigator>
  );
}

export default MyDrawer