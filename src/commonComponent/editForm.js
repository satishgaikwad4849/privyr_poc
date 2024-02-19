import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';

const EditForm = () => {
  const [leadName, setLeadName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const { givenName, familyName, phoneNumber, email, notes } = leadInfo;
    setLeadName(`${givenName} ${familyName}`);
    setMobileNumber(phoneNumber);
    setWhatsappNumber(phoneNumber);
    setEmail(email);
    setNotes(notes);
  }, [leadInfo]);

  const handleSaveChanges = () => {
    onSaveChanges({ leadName, mobileNumber, whatsappNumber, email, notes });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onCancel} style={styles.backButton}>
        <Icon name="arrow-left" size={20} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.text}>Edit Lead Information</Text>

      <TextInput
        style={styles.input}
        placeholder="Lead Name"
        value={leadName}
        onChangeText={(text) => setLeadName(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        value={mobileNumber}
        onChangeText={(text) => setMobileNumber(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Whatsapp Number"
        value={whatsappNumber}
        onChangeText={(text) => setWhatsappNumber(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Notes"
        value={notes}
        onChangeText={(text) => setNotes(text)}
        multiline
      />

      <TouchableOpacity onPress={handleSaveChanges} style={styles.saveButton}>
        <Text style={{ color: '#fff' }}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    width: '80%',
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
});

export default EditForm;
