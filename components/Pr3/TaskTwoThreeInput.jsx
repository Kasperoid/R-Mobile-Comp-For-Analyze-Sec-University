import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Button from '../UI/Button';
import { useNavigation } from "@react-navigation/native";

const TaskTwoThreeInput = ({route}) => {
    const onBtnPressHandler = () => {
        navigation.goBack()
        setUserFavBook(localBook)
        setUserFavQuar(localQuar)
    }

    const {userFavBook,
            setUserFavBook,
            userFavQuar,
            setUserFavQuar} = route.params;

    const [localBook, setLocalBook] = useState(userFavBook)
    const [localQuar, setLocalQuar] = useState(userFavQuar)

    const navigation = useNavigation();
    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
            <View style={{marginHorizontal: 10}}>
                <Text>Любимая книга разработчика: Облачный Атлас. Любимая цитата: Всему свое время</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setLocalBook}
                    value={localBook}
                    placeholder="Введите название Вашей любимой книги"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setLocalQuar}
                    value={localQuar}
                    placeholder="Введите цитату из Вашей любимой книги"
                />
                <Button text="Отправить данные" onPress={() => onBtnPressHandler()}/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 12,
  },
});

export default TaskTwoThreeInput