import { useState } from "react"
import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Button from '../UI/Button';
import { useNavigation } from "@react-navigation/native";

const TaskTwoThreeShow = () => {
    const navigation = useNavigation();

    const [userFavBook, setUserFavBook] = useState('')
    const [userFavQuar, setUserFavQuar] = useState('')

    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center', marginHorizontal: 10}}>
            <View style={{alignItems: 'center'}}>
                <Text>{!!userFavBook && !!userFavQuar ? `Название Вашей любимой книги: ${userFavBook}. Цитата: ${userFavQuar}` : 'Тут появится название вашей любимой книги и любимая цитата из нее!'}</Text>
                <Text>Любимая книга разработчика: Облачный Атлас. Любимая цитата: Всему свое время</Text>
                <View style={{marginTop: 15}}>
                    <Button text="Открыть экран ввода данных" fontSize={15} onPress={() => navigation.navigate('Pr3_Ex2_Input', {
                        userFavBook,
                        setUserFavBook: text => setUserFavBook(text),
                        userFavQuar,
                        setUserFavQuar: text => setUserFavQuar(text)
                    })}/>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default TaskTwoThreeShow