import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const TaskTwoFour = () => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1, justifyContent: 'center', marginHorizontal: 15}}>
                <View style={{marginBottom: 10}}>
                    <Text style={{fontWeight: 700, fontSize: 18}}>runOnUiThread(runn1)</Text>
                    <Text>Runnable помещается в очередь UI-потока и практически сразу выполняется. TextView покажет: "runn1".</Text>
                </View>

                <View style={{marginBottom: 10}}>
                    <Text style={{fontWeight: 700, fontSize: 18}}>tvInfo.postDelayed(runn3, 2000)</Text>
                    <Text>Планируем runn3 через 2 сек</Text>
                </View>

                <View style={{marginBottom: 10}}>
                    <Text style={{fontWeight: 700, fontSize: 18}}>сразу после этого tvInfo.post(runn2)</Text>
                    <Text>Runnable добавляется в очередь без задержки и выполнится раньше runn3</Text>
                    <Text>TextView станет: "runn2".</Text>
                </View>

                <View style={{marginBottom: 10}}>
                    <Text style={{fontWeight: 700, fontSize: 18}}>срабатывает отложенный runn3</Text>
                    <Text>TextView станет: "runn3".</Text>
                </View>

                <Text>Итоговый порядок запуска Runnable на UI-потоке: runn1 → runn2 → runn3.</Text>
            </View>
        </SafeAreaView>
    )
}

export default TaskTwoFour