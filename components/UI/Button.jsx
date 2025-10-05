import { Text, TouchableOpacity, View } from 'react-native';

const Button = ({ text, fontSize = 20, onPress = null }) => {
  return (
    <View>
      <TouchableOpacity
        style={{
          alignSelf: 'flex-start',
          paddingHorizontal: 10,
          paddingVertical: 5,
          backgroundColor: '#ccc',
          borderRadius: 5,
        }}
        onPress={onPress}
      >
        <Text style={{ fontSize: fontSize }}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;
