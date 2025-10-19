import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TextInput } from 'react-native';

const TaskTwoSeven = () => {
  const [data, setData] = useState('');
  const [commentNum, setCommentNum] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchTime = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${commentNum}`);
      if (response.ok) {
        const data = await response.json();
        setData({
            email: data[0].email,
            name: data[0].name,
            body: data[0].body
        });
      } else {
        setData('Ошибка при получении данных');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setData('Ошибка сети');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Получить комментарий по id</Text>
      <TextInput
        style={styles.input}
        placeholder="Id-номер комментатора"
        value={commentNum}
        onChangeText={setCommentNum}
      />
      <Button title={loading ? 'Загрузка...' : 'Получить комментарий'} onPress={fetchTime} disabled={loading} />
      <View style={styles.resultContainer}>
        <Text>Email: {data.email}</Text>
        <Text>Title: {data.name}</Text>
        <Text>Body: {data.body}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  resultContainer: {
    marginTop: 30,
    width: '100%',
  },
  resultLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  result: {
    fontSize: 16,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 8,
    marginBottom: 10,
    borderRadius: 4,
  },
});

export default TaskTwoSeven;
