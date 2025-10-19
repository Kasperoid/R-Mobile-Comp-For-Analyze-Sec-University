import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const FirebaseAuthScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [emailVerified, setEmailVerified] = useState(false);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((usr) => {
      setUser(usr);
      if (usr) {
        setEmailVerified(usr.emailVerified);
      }
    });
    return subscriber;
  }, []);

  const register = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user.sendEmailVerification()
          .then(() => {
            navigation.navigate('Main')
          });
      })
      .catch((error) => {
        Alert.alert('Ошибка регистрации', error.message);
      });
  };

  const login = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate('Main')
      })
      .catch((error) => {
        Alert.alert('Ошибка входа', error.message);
      });
  };

  const logout = () => {
    auth().signOut();
  };

  const sendVerificationEmail = () => {
    if (user) {
      user.sendEmailVerification()
        .then(() => {
          Alert.alert('Письмо подтверждения отправлено');
        })
        .catch((error) => {
          Alert.alert('Ошибка', error.message);
        });
    }
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text>Пользователь: {user.email}</Text>
          <Text>Подтверждено: {user.emailVerified ? 'Да' : 'Нет'}</Text>
          {!user.emailVerified && (
            <Button title="Подтвердить email" onPress={sendVerificationEmail} />
          )}
          <Button title="Выйти" onPress={logout} />
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Пароль"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button title="Зарегистрироваться" onPress={register} />
          <Button title="Войти" onPress={login} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 8 },
});

export default FirebaseAuthScreen;
