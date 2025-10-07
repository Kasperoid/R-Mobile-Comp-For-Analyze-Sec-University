import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const TaskOneThreeShow = ({route}) => {
    const { nowDate } = route.params;
    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
            <View>
                <Text style={{textAlign: 'center', fontSize: 20}}>{nowDate.toLocaleTimeString()}</Text>
            </View>
        </SafeAreaView>
    )
}

export default TaskOneThreeShow