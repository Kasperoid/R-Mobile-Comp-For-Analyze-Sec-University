import { Linking, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Button from '../UI/Button';

const TaskThreeThree = () => {
    const latitude = 55.7558;
    const longitude = 37.6173;
    const label = 'Красная площадь';
    return (
        <SafeAreaView style={{flex: 1}}>
            <View>
                <Button text="Открыть браузер" onPress={() => Linking.openURL('https://www.mirea.ru/')}/>
                <Button text="Позвонить" onPress={async () => await Linking.openURL('tel:+79773062959')}/>
                <Button text="Открыть карту" onPress={async () => await Linking.openURL(`https://yandex.ru/maps/?pt=${longitude},${latitude}&z=15&text=${encodeURIComponent(label)}`)}/>
            </View>
        </SafeAreaView>
    )
}

export default TaskThreeThree