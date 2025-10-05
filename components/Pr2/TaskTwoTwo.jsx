import { useState } from 'react';
import {
  Alert,
  Modal,
  Platform,
  StyleSheet,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../UI/Button';
import notifee, { AndroidImportance } from '@notifee/react-native';

const TaskTwoTwo = () => {
  async function ensurePermissions() {
    await notifee.requestPermission();
  }

  async function getChannelId() {
    if (Platform.OS !== 'android') return undefined;
    return await notifee.createChannel({
      id: 'default',
      name: 'Уведомления',
      importance: AndroidImportance.HIGH,
    });
  }

  async function showLocalNotification() {
    await ensurePermissions();
    const channelId = await getChannelId();

    await notifee.displayNotification({
      title: 'Привет!',
      body: 'Это уведомление',
      android: {
        channelId,
        pressAction: { id: 'default' },
      },
    });
  }

  const showToast = textLen => {
    ToastAndroid.show(
      `СТУДЕНТ № 23 ГРУППА БИСО-01-21 Количество символов - ${textLen}`,
      ToastAndroid.SHORT,
    );
  };

  const showAlert = () => {
    Alert.alert('Внимание!', 'Спасибо за внимание', [
      {
        text: 'Отмена',
      },
    ]);
  };

  const [text, setText] = useState('');
  const [textModal, setTextModal] = useState('');
  const [isModal, setIsModal] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          height: '50%',
          justifyContent: 'space-between',
        }}
      >
        <View>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Введите текст"
            style={[styles.input, { marginBottom: 16 }]}
          />
          <Button
            text="Вывод Toast"
            onPress={() => showToast(text.trim().length)}
          />
        </View>
        <View>
          <Button
            text="Вывод уведомления"
            onPress={() => showLocalNotification()}
          />
        </View>
        <View>
          <Button
            text="Вывод модального окна"
            onPress={() => {
              setIsModal(true);
            }}
          />
          <Modal
            animationType="slide"
            transparent={true}
            visible={isModal}
            onRequestClose={() => {
              setIsModal(!isModal);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TextInput
                  value={textModal}
                  onChangeText={setTextModal}
                  placeholder="Введите текст"
                  style={[styles.input, { marginBottom: 16 }]}
                />
                <Button
                  text="Закрыть"
                  onPress={() => setIsModal(!isModal)}
                  fontSize={16}
                />
              </View>
            </View>
          </Modal>
        </View>
        <View>
          <Button text="Вывод alert" onPress={() => showAlert()} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    fontSize: 20,
    textAlign: 'center',
  },
});

export default TaskTwoTwo;
