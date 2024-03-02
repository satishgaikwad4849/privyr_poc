import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Share,
} from 'react-native';

const ContentDetailsStackScreen = ({ route }) => {
  const [inputHeight, setInputHeight] = useState(40);
  const [inputValue, setInputValue] = useState('');
  const { item } = route.params;
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  

  const shareMessage = () => {
    Share.share({
      message: inputValue.toString(),
    })
      .then((result) => console.log(result))
      .catch((errorMsg) => console.log(errorMsg));
  };

  useEffect(() => {
    setInputValue(item?.description);
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <Icon name="arrow-left" size={24} color="#333" />
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.title}>{item?.title}</Text>
        <TextInput
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
          placeholder={'Enter Text to Share'}
          style={styles.textInput}
          multiline={true}
          numberOfLines={4} // Set a default number of lines
          onContentSizeChange={(event) => {
            // Adjust height dynamically based on content
            setInputHeight(event.nativeEvent.contentSize.height);
          }}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={shareMessage}>
          <Text style={styles.buttonTextStyle}>Share Input Text</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 60, // Adjusted padding to accommodate the back button
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  textInput: {
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginTop: 8,
  },
  buttonStyle: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#8ad24e',
    borderRadius: 5,
  },
  buttonTextStyle: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default ContentDetailsStackScreen;
