import { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"
import Button from '../UI/Button';
import { useNavigation } from "@react-navigation/native";

const TaskOneThreeGet = () => {
    const navigation = useNavigation();
    const [currentTime, setCurrentTime] = useState(new Date());

    return (
        <SafeAreaView style = {{flex: 1, justifyContent: 'center'}}>
            <View style = {{alignItems: 'center'}}>
                <View>
                    <Button text="Получить время" onPress={() => setCurrentTime(new Date())}/>
                </View>
                <View style = {{marginVertical: 20}}>
                    <Text>{!!currentTime ? 'Время получено' : 'Время не получено'}</Text>
                </View>
                <View>
                    <Button text="Посмотреть время" onPress={() => navigation.navigate('Pr3_Ex1_Show', {
                        nowDate: currentTime
                    })}/>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default TaskOneThreeGet